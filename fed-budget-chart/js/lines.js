/*let allData = {
  discretionaryByFunction: {
    title: "Discretionary Budget Authority by Function",
    values: [],
  },
  discretionaryByAgency: {
    title: "Discretionary Budget Authority by Agency",
    values: [],
  },
  totalByFunction: {
    title: "Total Budget Authority by Function",
    values: [],
  },
  totalByAgency: {
    title: "Total Budget Authority by Agency",
    values: [],
  },
};*/

let allData = {};
let datasets = [];

Highcharts.data({
  // Load Data in from Google Sheets
  googleSpreadsheetKey: "1MCR0HCuxns-n3Q4ev10JnT9ugLh83GuuUYzK6X4kFgw",
  googleSpreadsheetWorksheet: 1,
  switchRowsAndColumns: true,
  parsed: function parsed(columns) {
    yearArray = columns[0];
    /* Currently, no data for year 1976 - data starts at 1977 */
    // yearArray.splice(0, 3);
    columns.shift();

    for (let index = 0; index < columns.length; index++) {
      const row = columns[index];
      let dataset = row[0];
      let name = row[1];
      let values = [];

      /* rows 3 - 52 contain budget data, from 1976 - 2025 */
      /* Currently, discretionaryByFunction cells are empty */

      for (let i = 3; i < 51; i++) {
        values.push([yearArray[i], row[i]]);
      }

      if (!allData[dataset]) {
        allData[dataset] = {
          name: dataset,
          values: [],
        };
      }

      allData[dataset].values.push({
        name,
        data: values,
      });

      /*let entry = {
        name,
        data: values,
      };

      if (dataset == "Discretionary Budget Authority by Function") {
        allData.discretionaryByFunction.values.push(entry);
      } else if (dataset == "Discretionary Budget Authority by Agency") {
        allData.discretionaryByAgency.values.push(entry);
      } else if (dataset == "Total by Function") {
        allData.totalByFunction.values.push(entry);
      } else if (dataset == "Total by Agency") {
        allData.totalByAgency.values.push(entry);
      }*/
    }
    console.log(allData);
    datasets = Object.values(allData);
    setUpDropdown(datasets);
    renderChart(datasets[1]);
  },
});

function renderChart(data) {
  Highcharts.chart("hcContainer", {
    // General Chart Options
    chart: {
      type: "line",
    },
    // Chart Title and Subtitle
    title: {
      text: "Federal Spending Data",
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "CSIS Defense360 | Source: CBO",
    },
    // Chart Legend
    legend: {
      enabled: false,
    },
    tooltip: {
      useHTML: true,
      shared: false,
      valueDecimals: 1,
    },
    // Additional Plot Options
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
