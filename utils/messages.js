const moment = require('moment')

function formatMessage(username, text, color){
    return {
        username,
        text,
        time: moment().format('h:mma'),
        color
    }
}


module.exports = formatMessage;