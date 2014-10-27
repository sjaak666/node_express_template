var config = require('_/config');
var log = require('_/log');


if (config.dbConnection) {
    log.info('WITH DB');
    var db = require('_/' + config.dbConnection.modulename);

    db.on('error', function () {
        log.error('Failed to connect to MongoDb.');
    });

    db.on('open', function (err) {
        log.info('DB open');
        var app = require('_/app');
        var server = app.listen(config.port, function () {
            log.info('Listening on http://localhost:' + config.port);
        });
    });
} else {
    var app = require('_/app');
    app.listen(config.port, function () {
        log.info('Listening on http://localhost:' + config.port);
    });
}