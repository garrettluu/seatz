// Seats are enumerated starting with the seat closest to the
// driver's seat, continue numbering downwards, and continue to
// the next column when the last seat in the column has been
// numbered.
// Seats 0-5 are priority seating.
// Seats 6-7, 9-10, 12-13, 15-16, 17-18, 19-20, 21-22, 23-24,
// 25-26 are the paired seats.
// Seats 8, 11, 14 are single seats.

var totalSeats = 37;
var seats = []
for (var i = 0; i < totalSeats; i++) {
  seats.push(false);
}

function getSeatStatus(seatNumber) {
  // TODO: get seat status from arduino
  return false;
}

function updateSeatStatus() {
  for (var i = 0; i < seats.length; i++) {
    seats[i]
  }
}
