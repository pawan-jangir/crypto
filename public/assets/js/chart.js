var labels = [];
var movies = [];
var users = [];
tmp_labels.forEach(function(l){
  labels.push(l.month);
  movies.push(l.movies);
});
tmp_users.forEach(function(l){
  users.push(l.users);
});
  var image = document.getElementById("source");
  var canvas = document.getElementById("myChart");
  console.log(canvas.getAttribute('data'))
  var ctx = canvas.getContext("2d");
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
      xAxisID: "un",
      labels,
      datasets: [
        {
          label: "Total Movies",
          backgroundColor: "#3498db",
          borderColor: "white",
          borderWidth: 1,
          borderDash: [0],
          borderDashOffset: 10,
          borderCapStyle: "square",
          borderJoinStyle: "bevel",
          //cubicInterpolationMode: "monotone",
          fill: "start",
          //lineTension: 0.4,
          pointBackgroundColor: [
            "red",
            "green",
            "blue",
            "yellow",
            "pink",
            "purple",
          ],
          pointBorderColor: "pink",
          pointBorderWidth: 2,
          pointRadius: 0,
          //pointStyle: image,
          pointHitRadius: 20,
          pointHoverBackgroundColor: "purple",
          pointHoverBorderColor: "black",
          pointHoverBorderWidth: 5,
          pointHoverRadius: 10,
          showLine: true,
          spanGaps: true,
          steppedLine: false,
          data: movies,
        },
        {
          label: "Total Users",
          backgroundColor: "#8e44ad",
          borderColor: "white",
          data: users,
        },
      ],
    },

    // Configuration options go here
    options: {
      scales: {
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    },
  });
