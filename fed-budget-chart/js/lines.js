let allData = []

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
      const dataset = row[0];
      const name = row[1];
      const yValues = [];

      /* rows 3 - 52 contain budget data, from 1976 - 2025 */
      /* Currently, discretionaryByFunction cells are empty */
    
      for (let i=3; i < 51; i++) {
          yValues.push(row[i])
      }

      allData.push({
          dataset,
          name,
          y: yValues,
          x: yearArray
      })

      //renderChart(yearData);
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