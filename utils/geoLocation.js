const axios = require('axios');

const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
const access_token = 'pk.eyJ1IjoibWFpdGhyaTEyMyIsImEiOiJja2EweTFhdmkwNmM0M2tuMmJ0d2t2ZnE4In0.G4QKHF97vxf-10q84VbAPA';

const geoLocation = (location, callback) => {
    if (!location) {
        return callback('Please provide the location for weather information!', null);
    }
    axios({
        method: 'get',
        url: `${url}/${location}.json`,
        params: {
            access_token,
            limit: 1
        },
    })
        .then((response) => {
            if (response.data.features.length) {
                const [long, lat] = response.data.features[0].center;
                return callback(null, { lat, long });
            }
            callback("Unable to find location. Try another search.", null);
        })
        .catch((error) =>
            callback('Unable to connect to mapBox service!', null));
};

module.exports = geoLocation;