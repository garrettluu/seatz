document.addEventListener('DOMContentLoaded', function() {
  var socket = io();
  
  socket.on('update seat', function(msg) {
    // update the seat occupancy here
  });

  var totalSeats = 37;
  var seats = []
  for (var i = 0; i < totalSeats; i++) {
    seats.push(false);
  }
});
