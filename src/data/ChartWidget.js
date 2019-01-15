import Material from 'vuetify/es5/util/colors'
export const lineChartJs = {
  trendingDataSet: {
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          fill: false,
          borderColor: Material.pink.lighten1,
          pointBackgroundColor: '#FFFFFF',
          pointBorderWidth: 1,
          pointHoverBorderWidth: 1,
          pointRadius: 3,
          borderWidth: 0,
          data: [40000, 39000, 30000, 40000, 39000, 25000, 15000, 20000, 30000, 28000, 40000, 42000]
        }
      ]
    },
    option: {
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      }
    }
  },
  pagereviewDataSet: {
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          fill: true,
          borderColor: Material.pink.darken1,
          pointBackgroundColor: '#FFFFFF',
          pointBorderWidth: 1,
          pointHoverBorderWidth: 1,
          pointRadius: 3,
          borderWidth: 0,
          data: [40000, 39000, 30000, 40000, 39000, 25000, 15000, 20000, 30000, 28000, 40000, 42000]
        }
      ]
    },
    option: {
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: false,
          ticks: {
            beginAtZero: true
          }
        }],
        yAxes: [{
          display: false,
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  },
  salesDataSet: {
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          fill: true,
          borderColor: Material.red.darken1,
          pointBackgroundColor: '#FFFFFF',
          pointBorderWidth: 1,
          pointHoverBorderWidth: 1,
          pointRadius: 3,
          borderWidth: 0,
          data: [40000, 39000, 30000, 40000, 39000, 25000, 22000, 20000, 30000, 28000, 40000, 42000]
        }
      ]
    },
    option: {
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      }
    }
  },
  dashboardImpressions: {
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          fill: false,
          data: [40000, 39000, 30000, 40000, 39000, 25000, 15000, 20000, 30000, 28000, 40000, 42000],
          borderColor: '#677484',
          pointBorderColor: '#677484',
          pointBackgroundColor: '#677484',
          shadowOffsetX: 3,
          shadowOffsetY: 3,
          shadowBlur: 10,
          shadowColor: 'rgba(103, 116, 132, 0.5)',
          pointRadius: 4,
          pointBevelWidth: 3,
          pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
          pointBevelShadowColor: 'rgba(103, 116, 132, 0.5)',
          pointHoverRadius: 6,
          pointHoverBevelWidth: 4.5,
          pointHoverInnerGlowWidth: 20,
          pointHoverInnerGlowColor: `rgba(103, 116, 132, 0.5)`,
          pointHoverOuterGlowWidth: 20,
          pointHoverOuterGlowColor: `rgba(103, 116, 132, 0.5)`
        }
      ]
    },
    option: {
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false
      },
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 5
        }
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      }
    }
  },
  dashboardDownloads: {
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          fill: false,
          data: [200, 390, 200, 400, 390, 250, 150, 115, 300, 280, 250, 410],
          borderColor: '#00C486',
          pointBorderColor: '#00C486',
          pointBackgroundColor: '#00C486',
          shadowOffsetX: 3,
          shadowOffsetY: 3,
          shadowBlur: 10,
          shadowColor: 'rgba(0, 196, 134, 0.5)',
          pointRadius: 4,
          pointBevelWidth: 3,
          pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
          pointBevelShadowColor: 'rgba(0, 196, 134, 0.5)',
          pointHoverRadius: 6,
          pointHoverBevelWidth: 4.5,
          pointHoverInnerGlowWidth: 20,
          pointHoverInnerGlowColor: `rgba(0, 196, 134, 0.5)`,
          pointHoverOuterGlowWidth: 20,
          pointHoverOuterGlowColor: `rgba(0, 196, 134, 0.5)`
        }
      ]
    },
    option: {
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false
      },
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 5
        }
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      }
    }
  },
  visitorsPageViews: {
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Visitors',
          fill: true,
          backgroundColor: '#ec008c',
          borderColor: '#FFF',
          pointBorderColor: '#FFF',
          pointBackgroundColor: '#ec008c',
          pointHoverBackgroundColor: '#ec008c',
          pointHoverBorderColor: '#ec008c',
          pointBorderWidth: 3,
          pointHoverBorderWidth: 1,
          pointRadius: 3,
          borderWidth: 2,
          data: [410, 380, 800, 789, 450, 550, 187, 470, 234, 984, 1024, 890]
        },
        {
          label: 'Page Views',
          fill: true,
          backgroundColor: '#fc6767',
          borderColor: '#ec008c',
          pointBorderColor: '#ec008c',
          pointBackgroundColor: '#fc6767',
          pointHoverBackgroundColor: '#fc6767',
          pointHoverBorderColor: '#fc6767',
          pointBorderWidth: 3,
          pointHoverBorderWidth: 1,
          pointRadius: 3,
          borderWidth: 2,
          data: [410, 380, 800, 789, 450, 550, 187, 470, 234, 984, 1024, 890].map((i) => i * 3)
        }
      ]
    },
    option: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      legend: {
        display: false
      },
      spanGaps: true,
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: false,
            labelString: 'Month'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: false,
            labelString: 'Value'
          }
        }]
      }
    }
  }
}

export const barChartJs = {
  dashboardVisits: {
    data: {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [
        {
          backgroundColor: '#fc6767',
          data: [40, 39, 30, 40, 39, 25, 10],
          shadowOffsetX: 3,
          shadowOffsetY: 3,
          shadowBlur: 10,
          shadowColor: 'rgba(252, 103, 103, 0.5)',
          bevelWidth: 2,
          bevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
          bevelShadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      ]
    },
    option: {
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false
      },
      layout: {
        padding: {
          left: 10,
          right: 10,
          bottom: 10
        }
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      }
    }
  },
  dashboardConversation: {
    data: {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [
        {
          backgroundColor: '#42a5f5',
          data: [40, 39, 10, 40, 39, 40, 70],
          shadowOffsetX: 3,
          shadowOffsetY: 3,
          shadowBlur: 10,
          shadowColor: 'rgba(66, 165, 245, 0.5)',
          bevelWidth: 2,
          bevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
          bevelShadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      ]
    },
    option: {
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false
      },
      layout: {
        padding: {
          left: 10,
          right: 10,
          bottom: 10
        }
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      }
    }
  }
}
