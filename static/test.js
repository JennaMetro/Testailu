var MySportsFeeds = require("mysportsfeeds-node");
var msf = new MySportsFeeds("1.2", true);
var msf2 = new MySportsFeeds("2.0", true);
//msf.authenticate(process.env.API_KEY, process.env.PASSWORD);
msf.authenticate("2685560e-b0e8-4e7a-b549-4ac6f8", "Mummeli6");
msf2.authenticate("2685560e-b0e8-4e7a-b549-4ac6f8", "MYSPORTSFEEDS");
var today = new Date();
var fordate = '20190807' //if no games are played
exports.getData = async function () {
    return msf.getData('mlb', '2019-regular', 'scoreboard', 'json', {
        fordate:fordate,
        force: true
    })
}
exports.getStatsForToday = async function () {
    return msf2.getData('mlb', '2019-regular', 'seasonal_team_stats', 'json', {
        fordate:fordate,
        date:fordate,
        force: true
    });
}

/* fordate: today.getFullYear() +
('0' + parseInt(today.getMonth())).slice(-2) +
('0' + today.getDate()).slice(-2), */