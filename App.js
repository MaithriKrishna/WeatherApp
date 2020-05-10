const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');
const { mapBoxKey, weatherStackKey } = require('./access_key');
const location = process.argv[2];

// Mapbox API
// Address -> Lat/Long

const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`

if (location) {
    axios({
        method: 'get',
        url: mapBoxUrl,
        params: {
            access_token: mapBoxKey,
            limit: 1
        },
    })
        .then((response) => {
            if (response.data.features.length) {
                const [long, lat] = response.data.features[0].center;
                weatherApp(lat, long);
            }
            else {
                console.log(chalk.red.inverse("Unable to find location. Try another search."));
            }
        })
        .catch(function (error) {
            console.log(chalk.red.inverse('Unable to connect to mapBox service!'));
        });
}

else {
    console.log(chalk.red.inverse('Please provide the location for weather information!'));
}

// WeatherStack API
// Lat/Long -> Weather

const weatherStackUrl = 'http://api.weatherstack.com/current';

const weatherApp = (lat, long) => axios({
    method: 'get',
    url: weatherStackUrl,
    params: {
        access_key: weatherStackKey,
        query: `${lat},${long}`
    },
})
    .then((response) => {
        if (response.data.error) {
            console.log(chalk.red.inverse(response.data.error.info));
            return;
        }
        const { temperature, feelslike, weather_descriptions } = response.data.current;
        console.log(chalk.yellow(`${location} is ${weather_descriptions}. It is currently ${temperature}°C degrees. And It feels like ${feelslike}°C degrees out.`));
    })
    .catch(function (error) {
        console.log(chalk.red.inverse('Unable to connect to weather service!'));
    });

