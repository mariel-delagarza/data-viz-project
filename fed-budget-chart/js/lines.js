let discretionaryByFunction = {}
let discretionaryByAgency = {}
let totalByFunction = {}
let totalByAgency = {}
let numbers = []

let yearArray = []
for (i = 1; i < 50; i++) {
  yearArray.push(i)
}

/*
  Objects should look like 
  {
    dataset: "Discretionary Budget Authority by Function",
    functionOrAgency: "Function",
    key-value of year-data? or array of data? 
  }

*/


Highcharts.data({
  // Load Data in from Google Sheets
  googleSpreadsheetKey: "1MCR0HCuxns-n3Q4ev10JnT9ugLh83GuuUYzK6X4kFgw",
  googleSpreadsheetWorksheet: 1,
  switchRowsAndColumns: true,
  parsed: function parsed(columns) {
    columns.shift();
    columns.forEach((row) => {
      const dataset = row[0];

      /* rows 3 - 52 contain budget data, from 1976 - 2025 */

      /* Currently, discretionaryByFunction cells are empty */
      /*  if dataset == "Discretionary Budget Authority By Function" (
          discretionaryByFunction['dataset'] = dataset
          discretionaryByFunction['functionOrAgency'] = functionorAgency
          discretionaryByFunction['yearData'] = []

          for (let i = 2, i < 51, i++) { 
            discretionaryByFunction['yearData'].push()
          }

          x: yearArray[0]
          y: value
        )
      */
        if (dataset == "Discretionary Budget Authority by Agency") {
          discretionaryByAgency['dataset'] = dataset
          discretionaryByAgency['functionOrAgency'] = functionorAgency
          discretionaryByAgency['yearData'] = []

          for (let i = 2; i < 51; i++) { 
            discretionaryByAgency['yearData'].push()
          }
        }

        if (dataset == "Total by Function") {
          totalByFunction['dataset'] = dataset
          totalByFunction['functionOrAgency'] = functionorAgency
          totalByFunction['yearData'] = []
          
          
          for (let i = 2; i < 51; i++) { 
            totalByFunction['yearData'].push()
          }
        }

        if (dataset == "Total by Agency") {
          totalByAgency['dataset'] = dataset
          totalByAgency['functionOrAgency'] = functionorAgency
          totalByAgency['yearData'] = []

          for (let i = 2; i < 51; i++) { 
            totalByFunction['yearData'].push()
          }    
        }
    
    console.log(discretionaryByAgency)

    renderChart(yearData);
    },
  )}
})

function renderChart(data) {
Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: "1s9bdw5ob4BpCEUUQl-4lQnTQSsi7S-q927lKT7k6l6k",
    googleSpreadsheetWorksheet: 2,
  },
  // General Chart Options
  chart: {
    type: "line"
  },
  // Chart Title and Subtitle
  title: {
    text: "Federal Spending Data"
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS Defense360 | Source: CBO"
  },
  // Chart Legend
  legend: {
    align: "center",
    verticalAlign: "bottom",
    layout: "horizontal"
  },
  // Y Axis
  yAxis: {
    title: {
      text: "Amount (in Millions of USD)"
    }
  },
  // X Axis
  xAxis: {
    title: {
      text: "Year"
    }
  },
  // Tooltip
  tooltip: {
    valueDecimals: 1,
    shared: true,
    useHTML: true,
    //xDateFormat: '%B %Y'
  },
  // Additional Plot Options
  plotOptions: {
    line: {
      marker: {
        enabled: false,
        symbol: "circle",
        radius: 3
      },
      lineWidth: 1
    }
  }
})
}