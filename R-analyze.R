#########################################
#                                       #
#          Tone Graph Analyze           #
#                                       #
#########################################


# helpers

get_mirror <- function () {
	# set your preferred mirror here or you can set it as an environment variable
	default_mirror = "https://cran.r-project.org"
	e <- Sys.getenv("R_MIRROR")

	if (e == "") {
		return(default_mirror)
	} else {
		return(e)
	}
}

concat_paths <- function (...) {
	paths <- c(...)
	return(paste(paths, sep="/", collapse="/"))
}

concat <- function (...) {
	strings <- c(...)
	return(paste(strings, sep="", collapse=""))
}

# load miror and packages

load_mirror <- function() {
	cran_mirror <- get_mirror()

	local({r <- getOption("repos")
			r["CRAN"] <- cran_mirror
			options(repos=r)})

	print(concat(c("miror set to ", cran_mirror)))
}

# install packages

install_packages <- function(...) {
	packages <- c(...)
	install.packages("pacman")

	if (length(packages) == 0) {
		print("no packages to install")
	} else {
		success <- suppressWarnings(sapply(packages, require, character.only = TRUE))
		install.packages(names(success)[!success])
		sapply(names(success)[!success], require, character.only = TRUE)
	}
}

dependencies <- c(
	"ggplot2",
	"tidyr",
	"dplyr",
	"janitor",
	"readr",
	"tibble",
	"stringr",
	"rlist",
	"purrr",
	"broom"
)

# File & CLI
get_args <- function() { commandArgs(trailingOnly = TRUE) }

get_folder <- function() {

	# trying to get CLI arguments
	args <- get_args()

	if (length(args) == 0) {
		# hard coded path to set
		# needed when running in R console as there are no CLI args
	  # type the path from where the file is running
		folder <- "data/OCD LP"
	} else {
		folder <- args[1]
	}

	directory <- getwd()
	path <- concat_paths(directory, folder)
	print(concat("path set to ", path))
	return(path)
}

# read files from folder
read_folder <- function(folder, pattern = "t[0-9]+-g[0-9]+.txt") {
	list.files(folder, pattern)
}

get_file_name <- function (file) {
	unlist(strsplit(file, "/")) %>%
	tail(1) %>%
	str_replace(".txt", "")
}

get_knob_value <- function (file, index = 1, prefix = "t") {
	values <- get_file_name(file) %>%
	strsplit("-") %>%
	unlist()

	values[index] %>%
	str_replace(prefix, "") %>%
	concat("%")
}

# load data
load_data <- function(file, folder) {
	data <- read_tsv(concat_paths(folder, file)) %>% 
	clean_names() %>%
	# if we want to rename columns differently based on file name we can uncomment the next line
	# rename_with(function (col) { return(get_file_name(file)) }, starts_with("level_d_b")) %>%
	# other a simple rename does the job
	rename(dB=level_d_b) %>%
	filter(!frequency_hz>20000)

	if (!grepl("pink noise", file, fixed = TRUE)) {
		tone <- get_knob_value(file, index = 1, prefix = "t")
		gain <- get_knob_value(file, index = 2, prefix = "g")
		data <- add_column(
			data,
			tone = tone,
			gain = gain,
			code=get_file_name(file) # not actually in use, but it can give tone & gain in a single column
		)
	}

	return(data)
}

# relative to pink noise
substract_pink_noise <- function(data, pink_noise) {
	data %>%
	  mutate(dB=dB-pink_noise$dB)
}

sample_points <- function (data) {
  data %>%
    slice_sample(n=100, weight_by=1/frequency_hz)
}

get_loess_values <- function (data) {
	# this is where we get the loess values for each point
	# to get a smoother curve
	# mostly stolen from your code
  g <- ggplot(data)+
    geom_path(aes(frequency_hz, dB))+
    geom_smooth(aes(frequency_hz, dB),
                data %>% slice_sample(n=100, weight_by=1/frequency_hz),
                span=0.3)+
    theme_linedraw()+
    scale_x_continuous(trans="log2", breaks=c(0,50, 200,800,2000,5000,10000,20000))+
    coord_cartesian(xlim=c(50,20000), ylim=c(-60,10), expand=T)
  
  tone <- data$tone[1]
  gain <- data$gain[1]
  
  # ggplot data doesn't have the some number of rows, but it doesn't matter
  # all we need is to assign tone & gain value for the current batch and add
  # in the new "smooth" table
  g_data <- ggplot_build(g)$data[[2]] %>%
    select(x, y) %>%
    mutate(x = 2^x) %>%
    rename(frequency_hz=x) %>%
    rename(dB=y) %>%
    add_column(tone = tone, gain = gain)
  
  return(g_data)
}

# process a single file all the way through.
# This is mapped in the main sequence for each t<x>-g<y>.txt file in the folder
process_file <- function(file, folder, pink_noise) {
	print("", quote = FALSE)
	print("#############", quote = FALSE)
	print(concat("processing file: ", file), quote = FALSE)
	print("#############", quote = FALSE)
	print("", quote = FALSE)

	data <- file %>%
	load_data(folder) %>%
	substract_pink_noise(pink_noise) %>%
	sample_points() %>%
	normalize_data() %>%
	get_loess_values() %>%
	plot_data()
	
	return (data)
}


# Reducer function to join all the datasets into one
reduce_data <- function (data1, data2) {
	data1 %>%
	full_join(data2)
}

# normalize
normalize_data <- function (data) {
	data %>%
	mutate(dB=dB-max(data$dB))
}

# plot data
plot_data <- function (data) {
  plot(data$frequency_hz, data$dB, log = "x", col = "red")
  return(data)
  
}

# write output data
save_data <- function (data, folder) {
	data %>%
	select(frequency_hz, dB, tone, gain) %>%
	arrange(frequency_hz) %>%
	write.csv(concat_paths(folder, "data.csv"), row.names = FALSE)
}

###########
#         #
#   Run   #
#         #
###########

# bootstrapping stuff
#####################
load_mirror()
install_packages(dependencies)

# collect data
##############
## get folder from CLI arguments
folder <- get_folder()

## get pink noise data 
pink_noise <- load_data("pink noise.txt", folder = folder)

## get pedal data & process it, let's go !
##########################################

### we get the list of data files in the folder, not including pink noise
data <- read_folder(folder) %>% 
### we process each file
map(function (f) process_file(f, folder = folder, pink_noise = pink_noise)) %>%
### we agregate all the data
reduce(function (f1, f2) reduce_data(f1, f2))

# saving to csv
save_data(data, folder = folder)








