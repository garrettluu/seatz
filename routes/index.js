module.exports = function (io) {
    var express = require('express');
    var router = express.Router();

    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('index', {title: 'Bus Count'});
    });

    /* GET mobile page */
    router.get('/mobile', function(req, res) {
        res.render('mobile', {title: 'Bus Count'});
    });

    io.on('connection', function (socket) {
        console.log("Socket connected");
        // Update seat occupany message from the Arduino
        socket.on('update', function (msg) {

            socket.emit('update seat', msg);
        });

        /*
        socket.on('acknowledge', function(msg)) {

        });
        */
    });

    return router;
}
