const axios = require('axios');

const url = 'http://api.weatherstack.com/current';
const access_key = 'a682a6e849b7f5f45a0ba8865da2abe4';

const weatherForecast = (lat, long, callBack) => axios({
    method: 'get',
    url,
    params: {
        access_key,
        query: `${lat},${long}`
    },
})
    .then((response) => {
        if (response.data.error) {
            return callBack(response.data.error.info, null);
        }
        callBack(null, response.data)
    })
    .catch((error) => callBack('Unable to connect to weather service!', null));

module.exports = weatherForecast;