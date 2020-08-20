let allData = {
  discretionaryByFunction: {
    title: "Discretionary Budget Authority by Function",
    values: []
  },
  discretionaryByAgency: {
    title: "Discretionary Budget Authority by Agency",
    values: []
  },
  totalByFunction: {
    title: "Total Budget Authority by Function",
    values: []
  },
  totalByAgency: {
    title: "Total Budget Authority by Agency",
    values: []
  }
}

Highcharts.data({
  // Load Data in from Google Sheets
  googleSpreadsheetKey: "1MCR0HCuxns-n3Q4ev10JnT9ugLh83GuuUYzK6X4kFgw",
  googleSpreadsheetWorksheet: 1,
  switchRowsAndColumns: true,
  parsed: function parsed(columns) {
    yearArray = columns[0]
    /* Currently, no data for year 1976 - data starts at 1977 */
    yearArray.splice(0,3)
    columns.shift();
    
    columns.forEach((row) => {
      let dataset = row[0];
      let name = row[1];
      let yValues = [];

      /* rows 3 - 52 contain budget data, from 1976 - 2025 */
      /* Currently, discretionaryByFunction cells are empty */
    
      for (let i=3; i < 51; i++) {
          yValues.push(row[i])
      }

      if (dataset == "Discretionary Budget Authority by Function") { 
        allData.discretionaryByFunction.values.push({
          name,
          y: yValues,
          x: yearArray
        })
      } else if (dataset == "Discretionary Budget Authority by Agency") {
        allData.discretionaryByAgency.values.push({
          name,
          y: yValues,
          x: yearArray
        })
      } else if (dataset == "Total by Function") {
        allData.totalByFunction.values.push({
          name,
          y: yValues,
          x: yearArray
        })
      } else if (dataset == "Total by Agency") {
        allData.totalByAgency.values.push({
          name,
          y: yValues,
          x: yearArray
        })
      }

      renderChart(allData.discretionaryByAgency);
    },

    console.log(allData)
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
    enabled: false,
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