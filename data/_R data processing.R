############################
#EHX Green Russian Big Muff#
############################

#Load text files exported from Audacity and change column names
local({r <- getOption("repos")
       r["CRAN"] <- "https://cran.irsn.fr/"
       options(repos=r)})

install.packages("pacman")

pacman::p_load(ggplot2, tidyr, dplyr, janitor, readr, tibble)

folder = "blues driver - C bis"
gain = 100

#Pink Noise
BM_pn<-read_tsv(paste("/Users/francois/dev/playgrounds/tone-graphs/data/",folder,"/pink noise.txt", sep="")) %>%
  clean_names() %>%
  rename("bm_pn"=level_d_b)

#Tone at zero
BM_t0<-read_tsv(paste("/Users/francois/dev/playgrounds/tone-graphs/data/",folder,"/t0-g",gain,".txt", sep="")) %>%
  clean_names() %>%
  rename("bm_t0"=level_d_b)

#...and so on
BM_t25<-read_tsv(paste("/Users/francois/dev/playgrounds/tone-graphs/data/",folder,"/t25-g",gain,".txt", sep="")) %>%
  clean_names() %>%
  rename("bm_t25"=level_d_b)

BM_t50<-read_tsv(paste("/Users/francois/dev/playgrounds/tone-graphs/data/",folder,"/t50-g",gain,".txt", sep="")) %>%
  clean_names() %>%
  rename("bm_t50"=level_d_b)

BM_t75<-read_tsv(paste("/Users/francois/dev/playgrounds/tone-graphs/data/",folder,"/t75-g",gain,".txt", sep="")) %>%
  clean_names() %>%
  rename("bm_t75"=level_d_b)

BM_t100<-read_tsv(paste("/Users/francois/dev/playgrounds/tone-graphs/data/",folder,"/t100-g",gain,".txt", sep="")) %>%
  clean_names() %>%
  rename("bm_t100"=level_d_b)

#Combine the datasets and subtract pink noise levels (i.e. transform the curve to relative to pink noise), then remove above 20KHz
BM_data_wide<-
  left_join(BM_pn,
            left_join(BM_t0,
                      left_join(BM_t25,
                                left_join(BM_t50,
                                          left_join(BM_t75, BM_t100))))) %>%
  mutate(bm_t0=bm_t0-bm_pn,
         bm_t25=bm_t25-bm_pn,
         bm_t50=bm_t50-bm_pn,
         bm_t75=bm_t75-bm_pn,
         bm_t100=bm_t100-bm_pn) %>%
  filter(!frequency_hz>20000)

#Subtract the maximum value of whatever curve I like (in this case, tone at 50%) so it peaks at 0dB
BM_data_wide<-
  BM_data_wide %>%
  mutate(bm_t0=bm_t0-max(BM_data_wide$bm_t50),
         bm_t25=bm_t25-max(BM_data_wide$bm_t50),
         bm_t50=bm_t50-max(BM_data_wide$bm_t50),
         bm_t75=bm_t75-max(BM_data_wide$bm_t50),
         bm_t100=bm_t100-max(BM_data_wide$bm_t50))

#Remove pnik noise column, pivot to longer format (Hz and dB columns), add pedal name column and, in this case, gain column fixed as gain, and tone according to initial column code. Then remove code. Phew!
BM_data <-
  BM_data_wide %>%
  select(-bm_pn) %>%
  pivot_longer(-frequency_hz, names_to="code", values_to="dB") %>%
  add_column(pedal="nobels",
             gain="100%") %>%
  mutate(tone=case_when(code=="bm_t0" ~ "0%",
                        code=="bm_t25" ~ "25%",
                        code=="bm_t50" ~ "50%",
                        code=="bm_t75" ~ "75%",
                        code=="bm_t100" ~ "100%")) %>%
  select(-code) %>%
  arrange(tone, frequency_hz)
  
  
plot_data <- function (data, tone_value) {
	d <- filter(data, tone == tone_value, dB>-25)  
	x = d$frequency_hz
	y = d$dB
	plot(x, y, log="x", panel.first = grid(), type="n", xlab="frequency", xlim=range(40:20000), ylab="dB", ylim=range(-25:5), main=paste("tone:",tone_value))

	lw1 = loess(y ~ x, span=0.9)
	lines(lw1)
}

par(mfrow=c(3,2))

plot_data(BM_data, "0%")
plot_data(BM_data, "25%")
plot_data(BM_data, "50%")
plot_data(BM_data, "75%")
plot_data(BM_data, "100%")
  
write_csv(BM_data, paste("/Users/francois/dev/playgrounds/tone-graphs/data/",folder ,"/data.csv", sep=""))