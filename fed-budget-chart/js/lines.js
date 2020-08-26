let allData = {};
let datasets = [];

Highcharts.setOptions({
  lang: {
    numericSymbols: ["k", "M", "B", "T", "P", "E"]
  }
})


Highcharts.data({
  // Load Data in from Google Sheets
  googleSpreadsheetKey: "1MCR0HCuxns-n3Q4ev10JnT9ugLh83GuuUYzK6X4kFgw",
  googleSpreadsheetWorksheet: 1,
  switchRowsAndColumns: true,
  parsed: function parsed(columns) {
    yearArray = columns[0];
    /* Note, currently, no data for year 1976 - data starts at 1977 */
    /* Currently, discretionaryByFunction cells are empty */
    columns.shift();

    /*
      Iterate over each column, starting at the first one.
      Because of .shift() the first column contains values for
      out dataset, not the years.
    */
  
    for (let index = 0; index < columns.length; index++) {
      const row = columns[index];
      let dataset = row[0];
      let name = row[1];
      let values = [];

      /* rows 3 - 52 contain budget data, from 1976 - 2025 */

      /*
        Lines 33 - 35 take the year and the data in that row and
        feeds them in to be used as [x,y] values
      */
      for (let i = 3; i < 51; i++) {
        values.push([yearArray[i], row[i]]);
      }

      /*
        Since we are using the group name ("Discretionary Budget Authority by Function")
        as our "dataset" name, lines 39 - 44 check whether it exists in our "allData"
        and if not, it adds it and its values. This lets the chart stay functional
        even if the researcher changes the names on the backend google sheet or adds
        new ones.
      */
      if (!allData[dataset]) {
        allData[dataset] = {
          name: dataset,
          values: [],
        };
      }

      /*
        Take the group name (dataset) and push in the values that 
        you created in lines 33-34, so now you have the group name,
        each agency/function in that group, and the [x,y] values for
        each of those agencies/functions.
      */ 
      allData[dataset].values.push({
        name,
        data: values,
      });
    }
    
    datasets = Object.values(allData);
    setUpDropdown(datasets);
    renderChart(datasets[1]);
  },
});

function renderChart(data) {
  Highcharts.chart("hcContainer", {
    chart: {
      type: "line",
      zoomType: "xy"
    },
    title: {
      text: "Federal Spending Data",
    },
    credits: {
      enabled: true,
      href: false,
      text: "CSIS Defense360 | Source: OMB",
    },
    yAxis: {
      title: {
        text: "Budget Authority in FY 2021 Dollars"
      },
      labels:{
        formatter:function(){

          if (this.value >= 1000000) {
            return '$' + (this.value / 1000000) + 'T';
          }
          else if (this.value >= 1000) {
            return '$' + (this.value / 1000) + 'B';
          }
          else if (this.value < -1000) {
            return '-$' + Math.abs((this.value/1000)) + 'B'
          }
          else {
            return this.value;
          }
        }
      }
    },
    xAxis: {
      labels: {
        format: 'FY {value}'
      }
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      useHTML: true,
      shared: false,
      valueDecimals: 1,
      valueSuffix: 'B',
      valuePrefix: '$'
    },
    plotOptions: {
      line: {
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 3,
        },
        lineWidth: 1,
      },
    },
    series: data.values,
  });
}

function setUpDropdown(values) {
  const select = document.getElementById("dataset");
  let optionsHTML = "";

  values.forEach((element) => {
    optionsHTML += `<option value="${element.name}">${element.name}</option>`;
  });

  select.innerHTML = optionsHTML;

  select.addEventListener("change", function () {
    let chart = Highcharts.chart("hcContainer", {});
    chart.destroy();
    renderChart(allData[this.value]);
  });
}
