// require('some-logging-library')
function logError(...data) {
    console.log(...data);
}

function logInformation(...data) {
    console.log(...data);
}

module.exports = { logError, logInformation }