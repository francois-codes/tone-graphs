# Pedal Tone Graph

This repo contains the code of the Pedal Tone Graph app, which lets you browse and compare the frequency response of different guitar pedals.

## Prerequisites

#### Node

Use nvm to install node.js. We use LTS version node 16.

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
$ nvm install LTS
```

#### Global npm dependencies

A few global npm dependencies are needed. you can install them after installing node.js

```bash
$ npm install -g typescript next next-cli expo-cli ts-node yarn
```

#### Environment variables

You'll need tokens to make the contentFul API works. if you just want to use the analyze scripts, you don't need it, but if you want to run the app locally, you can ask for one.

After this is done, you can set up the repo and run the commands below to run the app locally.

## Set up

This repo is bootstrapped with Expo and Next.js, using React Native Web, and typescript.
It is set up with Eslint & Jest and requires node LTS 16 and yarn 1.x

- clone this repo
- run `yarn` to install dependencies

## Run the app locally

- run `yarn next dev`
- open `http://localhost:3000` in your browser

## Analyze data

This repo contains scripts to analyze data provided either as CSV files exported from R, or raw text files from Audacity.

#### From R csv

The expectation here is that the columns are [frequency, db, pedal name, gain value, tone value]
You should skip the header row so the csv file only contains the datapoints.

Create a folder in `<rootDir>/data` with the name of the pedal. Place the file there with the name `data.csv`

Then run

```bash
yarn analyze:csv data/<folder name>
```

this will generate a `data.json` file in the folder you created, which will contain the datapoints, formatted so that it can be loaded in the Graph engine of the website. you can then go to `https://tonegraphs.com/preview` and paste the json data in the textarea. Change the tone / curve and see the result !

#### From Audacity text files

Create a folder in `<rootDir>/data` with the name of the pedal. You should have one file with the data for pink noise named `pink noise.txt`, and then separate files for each tone and gain value. The file name should follow the `t<toneValue>_g<gainValue>.txt` format.

Then run

```bash
yarn analyze data/<folder name>
```

This will generate a `data.json` file in the folder, which you can use to preview the graph, as explained in the paragraph above
