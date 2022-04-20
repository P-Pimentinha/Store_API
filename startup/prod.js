const helmet = require('helmet');
const compression = require ('compression');


module.exports = function(app) {
    try {app.use(helmet());
    app.use(compression());
    console.log("HelmetLoaded")}
    catch(e){
        console.log(`Something went wrong!${e}`)
    }
}