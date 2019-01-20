document.addEventListener('DOMContentLoaded', function () {

    // Seats are enumerated starting with the seat closest to the
// driver's seat, continue numbering downwards, and continue to
// the next column when the last seat in the column has been
// numbered.
// Seats 0-5 are priority seating.
// Seats 6-7, 9-10, 12-13, 15-16, 17-18, 19-20, 21-22, 23-24,
// 25-26 are the paired seats.
// Seats 8, 11, 14 are single seats.

    function Seat(uiElement, index, occupied, priority) {
        this.ui = uiElement;
        this.index = index;
        this.occupied = occupied;
        this.priority = priority;
    }

    var totalSeats = 4;
    var totalPrioritySeats = 1;
    var seats = [];
    if (document.title === 'Live Tracker') {
        for (var i = 0; i < totalSeats; i++) {
            seats.push(new Seat(document.getElementById("seat" + i.toString()), i, false, i === 0));
        }
    } else if (document.title === 'Live Tracker ') {
        for (var i = 0; i < totalSeats; i++) {
            seats.push(new Seat(document.getElementById("seat" + i.toString() + "Mobile"), i, false));
        }
    }

    var coll = document.getElementsByClassName("collapsible");

    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
    var socket = io();

    // console.log("Emitting update!");
    // socket.emit('update', {seatOccupied: true, seatNumber: 1});
    //
    // setTimeout(function () {
    //     socket.emit('update', {seatOccupied: true, seatNumber: 2});
    // }, 5000);
    // setTimeout(function () {
    //     socket.emit('update', {seatOccupied: true, seatNumber: 0});
    // }, 10000);

    socket.on('update seat', function (msg) {
        // update the seat occupancy here
        seats[msg.id].occupied = msg.occupied;
        updateSeatStatus();
    });


    function getSeatStatus(seatNumber) {
        // TODO: get seat status from arduino
        return false;

    }

    function updateSeatStatus() {
        for (var j = 0; j < seats.length; j++) {
            if (seats[j].occupied) {
                makeVisible(seats[j].ui);
            } else {
                makeHidden(seats[j].ui);
            }
        }
        document.getElementById("availableSeats").innerText = "Available Seats: " + availableSeats();
        document.getElementById("normalSeats").innerText = "Normal Seats: " + (availableSeats() - prioritySeats());
        document.getElementById("prioritySeats").innerText = "Priority Seats: " + prioritySeats();
    }

    function makeHidden(uiElement) {
        uiElement.classList.add("hidden");
    }

    function makeVisible(uiElement) {
        uiElement.classList.remove("hidden");
    }

    function availableSeats() {
        var numOccupied = 0;
        for (var i = 0; i < seats.length; i++) {
            if (seats[i].occupied) {
                numOccupied++;
            }
        }
        return totalSeats - numOccupied;
    }

    function prioritySeats() {
        var priorityOccupied = 0;
        for (var i = 0; i < seats.length; i++) {
            if (seats[i].occupied && seats[i].priority) {
                priorityOccupied++;
            }
        }
        return totalPrioritySeats - priorityOccupied;
    }
    // $(function() {
        // console.log("test");
        // $.post('/tracker', {seatNumber: '0', seatOccupied: 'true'});
        // $.get('/data', function(response) {seats[response.num] = response.occupied});
        // updateSeatStatus();
    // });
    updateSeatStatus();
});
