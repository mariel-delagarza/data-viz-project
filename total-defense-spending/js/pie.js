Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: "1oAjsH6kab5UaiVJpa5TXt9J2voRQwZY6YipMVYdBXhs",
    googleSpreadsheetWorksheet: 2
  },
  // General Chart Options
  chart: {
    type: "pie",
    style: {
      fontFamily: 'Source Sans Pro'
    }
  },
  colors: [
    // DoD (051)
    '#008E9D', 
    
    // Nuclear (O53)
    '#96B586', 
    
    // Defense-related (054)
    ' #DDB460'
  ],

  // Chart Title and Subtitle
  title: {
    text: "FY21 National Defense Spending"
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: ""
  },
  // Chart Legend
  legend: {
    enabled: false
  },
  tooltip: {
    useHTML: true
  },
  // Additional Plot Options
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true
      },
      showInLegend: true
    }
  }
});