module.exports = function (io) {
    var express = require('express');
    var router = express.Router();

    // var DataStore = require('nedb');
    // var db = new DataStore();

    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('home', {title: 'Bus Count'});
    });

    /* GET live tracker */
    router.get('/tracker', function (req, res) {
        res.render('index', {title: 'Live Tracker'});
    });

    /* GET mobile page */
    router.get('/mobile', function(req, res) {
        res.render('mobile', {title: 'Live Tracker '});
    });

    // router.post('/tracker', function (req, res) {
        // seatNumber = req.body.seatNumber;
        // seatOccupied = req.body.seatOccupied;
        // var seat = {num: 0, occupied: true};
        // var seat = {num: req.body.seatNumber, occupied: req.body.seatOccupied};
        // db.remove({});
        // db.insert(seat);
    // });

    // router.get('/data', function(req, res) {
    //     res.send(db.find({}, function(err, docs){}));
    //     res.send('test');
    // });

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
