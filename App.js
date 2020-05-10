const chalk = require('chalk');
const geoLocation = require('./utils/geoLocation');
const weatherForecast = require('./utils/weatherForecast');

const location = process.argv[2];

geoLocation(location, (error, geoData) => {
    if (error) {
        return console.log(chalk.red.inverse(error));
    }
    weatherForecast(geoData.lat, geoData.long, (error, weatherData) => {
        if (error) {
            return console.log(chalk.red.inverse(error));
        }
        const { temperature, feelslike, weather_descriptions } = weatherData.current;
        console.log(chalk.yellow(`${location} is ${weather_descriptions}. It is currently ${temperature}°C degrees. And It feels like ${feelslike}°C degrees out.`));
    });

})
