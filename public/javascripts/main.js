document.addEventListener('DOMContentLoaded', function () {

    // Seats are enumerated starting with the seat closest to the
// driver's seat, continue numbering downwards, and continue to
// the next column when the last seat in the column has been
// numbered.
// Seats 0-5 are priority seating.
// Seats 6-7, 9-10, 12-13, 15-16, 17-18, 19-20, 21-22, 23-24,
// 25-26 are the paired seats.
// Seats 8, 11, 14 are single seats.

    function Seat(uiElement, index, occupied) {
        this.ui = uiElement;
        this.index = index;
        this.occupied = occupied;
    }

    var totalSeats = 4;
    var seats = [];
    for (var i = 0; i < totalSeats; i++) {
        seats.push(new Seat(document.getElementById("seat" + i.toString()), i, false));
    }
    var socket = io();

    console.log("Emitting update!");
    socket.emit('update', {seatOccupied: true, seatNumber: 1});

    setTimeout(function(){socket.emit('update', {seatOccupied: true, seatNumber: 2});}, 5000);
    setTimeout(function(){socket.emit('update', {seatOccupied: true, seatNumber: 0});}, 10000);

    socket.on('update seat', function (msg) {
        // update the seat occupancy here
        console.log(msg.seatOccupied);
        seats[msg.seatNumber].occupied = msg.seatOccupied;
        updateSeatStatus();
    });

    function getSeatStatus(seatNumber) {
        // TODO: get seat status from arduino
        return false;

    }

    function updateSeatStatus() {
        for (var i = 0; i < seats.length; i++) {
            if (seats[i].occupied) {
                makeVisible(seats[i].ui);
            } else {
                makeHidden(seats[i].ui);
            }
        }
        document.getElementById("availableSeats").innerText = "Available Seats: " + availableSeats();
    }

    function makeHidden(uiElement) {
        uiElement.classList.add("hidden");
    }

    function makeVisible(uiElement) {
        uiElement.classList.remove("hidden");
    }

    function availableSeats() {
        var numAvailable = 0;
        for (var i = 0; i < seats.length; i++) {
            if (!seats[i].occupied) {
                numAvailable++;
            }
        }
        return numAvailable;
    }
});
