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
var seats = [];
if(document.title === "index.html") {
  for (var i = 0; i < totalSeats; i++) {
    seats.push(new Seat(document.getElementById("seat" + i.toString()), i, false, i == 0));
  }
} else if(document.title === "mobile.html") {
  for (var i = 0; i < totalSeats; i++) {
    seats.push(new Seat(document.getElementById("seat" + i.toString() + "Mobile"), i, false));
  }
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
 coll[i].addEventListener("click", function() {
   this.classList.toggle("active");
   var content = this.nextElementSibling;
   if (content.style.display === "block") {
     content.style.display = "none";
   } else {
     content.style.display = "block";
   }
 });
}

function getSeatStatus(seatNumber) {
  // TODO: get seat status from arduino
    return true;

}

function updateSeatStatus() {
  for (var i = 0; i < seats.length; i++) {
      seats[i].occupied = getSeatStatus(i);
      if (seats[i].occupied) {
          makeVisible(seats[i].ui);
      } else {
          makeHidden(seats[i].ui);
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
    var numAvailable = 0;
    for (var i = 0; i < seats.length; i++) {
        if (!seats[i].occupied) {
            numAvailable++;
        }
    }
    return numAvailable;
}

function prioritySeats() {
    var priorityAvailable = 0;
    for (var i = 0; i < seats.length; i++) {
        if (!seats[i].occupied && seats[i].priority) {
            priorityAvailable++;
        }
    }
    return priorityAvailable;
}

updateSeatStatus();
// setTimeout(function(){seats[0].occupied = true}, 5000);
