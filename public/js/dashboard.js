const url=window.location.origin;
const root = location.protocol + "//" + location.host

let dataNumber = 0;
let dataTemp = 0;
let dataHumid = 0;
let dataSoil = 0;

//let socket = io()
let socket = io(url)

socket.on('temp',(data)=>{
  dataTemp=Number(data);
})
socket.on('humid',(data)=>{
  dataHumid=Number(data);
})
socket.on('soil',(data)=>{
  dataSoil=Number(data);
})

var chartColors = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(201, 203, 207)"
  };
  
  function onRefresh1(chart) {
    chart.config.data.datasets.forEach(function (dataset) {
      dataset.data.push({
        x: Date.now(),
        y: dataTemp
      });
    });
  }
  function onRefresh2(chart) {
    chart.config.data.datasets.forEach(function (dataset) {
      dataset.data.push({
        x: Date.now(),
        y: dataHumid
      });
    });
  }
  function onRefresh3(chart) {
    chart.config.data.datasets.forEach(function (dataset) {
      dataset.data.push({
        x: Date.now(),
        y: dataSoil
      });
    });
  }
  var color = Chart.helpers.color;
  var config1 = {
    type: "line",
    data: {
      datasets: [
        {
          label: "Dataset tempurature (linear interpolation)",
          backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
          borderColor: chartColors.blue,
          fill: false,
          lineTension: 0,
          borderDash: [8, 4],
          data: []
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Line chart (hotizontal scroll) sample"
      },
      scales: {
        x: 
          {
            type: "realtime",
            realtime: {
              duration: 20000,
              refresh: 1000,
              delay: 100,
              onRefresh: onRefresh1
            }
          },
        y:
          {
            ticks: {
              max: 4500,
              min: 0
            },
            scaleLabel: {
              display: true,
              labelString: "value"
            }
          }
      },
      tooltips: {
        mode: "nearest",
        intersect: false
      },
      hover: {
        mode: "nearest",
        intersect: false
      }
    }
  };
  var config2 = {
    type: "line",
    data: {
      datasets: [
        {
          label: "Dataset humid (linear interpolation)",
          backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
          borderColor: chartColors.blue,
          fill: false,
          lineTension: 0,
          borderDash: [8, 4],
          data: []
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Line chart (hotizontal scroll) sample"
      },
      scales: {
        x: 
          {
            type: "realtime",
            realtime: {
              duration: 20000,
              refresh: 1000,
              delay: 100,
              onRefresh: onRefresh2
            }
          },
        y:
          {
            ticks: {
              max: 4500,
              min: 0
            },
            scaleLabel: {
              display: true,
              labelString: "value"
            }
          }
      },
      tooltips: {
        mode: "nearest",
        intersect: false
      },
      hover: {
        mode: "nearest",
        intersect: false
      }
    }
  };
  var config3 = {
    type: "line",
    data: {
      datasets: [
        {
          label: "Dataset soil (linear interpolation)",
          backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
          borderColor: chartColors.blue,
          fill: false,
          lineTension: 0,
          borderDash: [8, 4],
          data: []
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Line chart (hotizontal scroll) sample"
      },
      scales: {
        x: 
          {
            type: "realtime",
            realtime: {
              duration: 20000,
              refresh: 1000,
              delay: 100,
              onRefresh: onRefresh3
            }
          },
        y:
          {
            ticks: {
              max: 4500,
              min: 0
            },
            scaleLabel: {
              display: true,
              labelString: "value"
            }
          }
      },
      tooltips: {
        mode: "nearest",
        intersect: false
      },
      hover: {
        mode: "nearest",
        intersect: false
      }
    }
  };
  var ctx1 = document.getElementById("myChart1").getContext("2d");
  var ctx2 = document.getElementById("myChart2").getContext("2d");
  var ctx3 = document.getElementById("myChart3").getContext("2d");
  var chart = new Chart(ctx1, config1);
  var chart = new Chart(ctx2, config2);
  var chart = new Chart(ctx3, config3);


//Ajax
$('.refresh').click(function(event){
  event.preventDefault()
  const href = this.href;
  $.ajax({
    url:href,
    type:'GET',
    data:{},
    success: function(){
      $('#tempMax1').load(root+"/dashboard #tempMax2");
      $('#tempMin1').load(root+"/dashboard #tempMin2");
      $('#averTemp1').load(root+"/dashboard #averTemp2");

      $('#humidMax1').load(root+"/dashboard #humidMax2");
      $('#humidMin1').load(root+"/dashboard #humidMin2");
      $('#averHumid1').load(root+"/dashboard #averHumid2");

      $('#soilMax1').load(root+"/dashboard #soilMax2");
      $('#soilMin1').load(root+"/dashboard #soilMin2");
      $('#averSoil1').load(root+"/dashboard #averSoil2");
    }
  })
})
