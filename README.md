# Lab: Create Web APIs to serve data in CSV files

In this lab, we will create CRUD api endpoints to serve data in real-time! The data will come from a csv file (of your choice) from www.data.gov.sg

### Getting started
- Fork and clone repo
- Install dependencies: `npm install`
- cd into project directory
- Start application: `npx nodemon server.js`

### Tasks:

- Find and download an interesting CSV file from [data.gov.sg](https://data.gov.sg/dataset?groups=society)
  - (if you can't find any interesting data in CSV format, you can serve the kindergarten data, which you can find in `./utils/`)
- Unzip the downloaded file move the csv file to `./utils` and rename it to `utils/data.csv` (you can replace the existing file)
- Convert csv file to JSON: `npx csv2json utils/data.csv utils/data.json` (this will replace the existing file)
- Load JSON data as a javascript object. You can find a code sample for doing this in `./app.js`. Execute demo.js by running: `npx nodemon app.js`
- Serve data via CRUD endpoints!
  - `GET /data`
  - `GET /data/:someParameter`
  - filter data use query params
    - `GET /data?someAttribute=something`
    - `GET /data?someAttribute=something&otherAttribute=anything`
  - Implement remaing CRUD handlers
    - `POST /data`
    - `PUT /data/:someParameter`
    - `DELETE /data/:someParameter`
    - (note: your handlers would only change the data in memory, meaning that once you restart your server, it will revert to the original data loaded from the JSON file. Nonetheless, for practice purposes, we'll implement handlers for these CRUD routes)

#### Bonus tasks:
- Rinse and repeat for another CSV file from data.gov! You can rename your CRUD path from `/data` to something more sensible. For example:
  - `http://localhost:3000/childcare-centres` - for CRUD-ing data related to childcare centres
  - `http://localhost:3000/dengue` - for CRUD-ing data related to dengue
  - `http://localhost:3000/nlb-infopedia` - for CRUD-ing data related to national library board infopedia

