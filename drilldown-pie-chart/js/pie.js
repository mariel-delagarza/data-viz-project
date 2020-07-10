// main series array of one object
//      object has 
//D          name of series (contributions)
//D          colorByPoint F
//D          data which is an array of objects
//              name of donor group
//              y - total group contributions
//              drilldown (name of donor group again)




// drilldown is an object with 1 item - series
//      series is an array of objects
//          name (name of donor group from level1)
//          id (name of donor group from level1)
//          data which is an array of arrays
//              donor
//              y - donor contribution amount

// Set default values for series and drilldownseries
var seriesArray = []
var seriesObj = {
    name: "Funding",
    colorByPoint: true,
    // array of objects
    data: []
}
var drilldownData = []

Highcharts.data({
    // Load Data in from Google Sheets
    googleSpreadsheetKey: '1oAjsH6kab5UaiVJpa5TXt9J2voRQwZY6YipMVYdBXhs',
    googleSpreadsheetWorksheet: 3,
    switchRowsAndColumns: true,
    parsed: function parsed(columns) {
        // create default variables
        var group = "Funding"


        // iterate over data
        columns.forEach(function (row, i) {
            // skip first row
            if (i == 0) {
                return
            }
            var groupRow = row[0]
            var donor = row[1]
            var amount = row[2]
            var labelRank = row[3]

            // check if group name exists in root series
            if (group !== groupRow) {
                // update group
                group = groupRow
                // if group doesn't exist, create group (name, y, drilldown name)
                seriesObj.data.push({ "name": group, "y": amount, "drilldown": group, "labelrank": labelRank })
                // if drilldown doesn't exist, push id name and data to drilldownData array
                drilldownData.push({
                    "id": group,
                    "name": "Funding",
                    "data": [[donor, amount]]
                })
            } else {
                // if group exists, add value to y
                objIndex = seriesObj.data.findIndex((obj => obj.name == groupRow))
                seriesObj.data[objIndex].y += amount
                // if drilldown exists, push new array of donor and amount into data array
                drilldownData[objIndex].data.push([donor, amount])
            }
        })
        // sort series by value of y
        seriesObj.data.sort(function (a, b) {
            return b.y - a.y
        })
        // seriesObj.data.push(seriesData)
        seriesArray.push(seriesObj)

        renderChart(seriesArray, drilldownData)
    }
})

function renderChart(seriesArray, drilldownData) {

    // format numbers
    Highcharts.setOptions({
        lang: {
            thousandsSep: ",",
            drillUpText: "◁ Back to Main"
        },
        chart: {
            style: {
                fontFamily: '"Open Sans", Arial, Helvetica, sans-serif',
                fontSize: '16px'
            }
        }
    });
    Highcharts.chart('hcContainer', {
        // General Chart Options
        chart: {
            type: 'pie',
        },
        // Chart Colors
        colors: ['#36605A', '#008E9D', '#9B9B9B', '#557786', '#96B586', '#D05F4C', '#DDB460', '#83373E'],
        // Chart Title and Subtitle
        title: {
            text: '<span style="font-size: 32px; color: #333333; max-width: 1280px; text-align: center">FY21 National Defense Spending</span>'
        },
        subtitle: {
            text: `<span style="font-size: 16px; color: #333333; max-width: 1280px; margin-bottom: 1.5rem; line-height: 1.4">Hover over a slice to see that subfunction's portion of total national defense spending. Click to see a breakdown of funding within that subfunction.<br>Values are in tens of thousands of US dollars.</span>`
        },
        // Credits
        credits: {
            enabled: true,
            href: false,
            text: "CSIS Defense360 | Source: DoD Comptroller"
        },
        tooltip: {
            valueDecimals: 0,
            valuePrefix: '$',
        },
        series: seriesArray,
        drilldown: {
            series: drilldownData,
            drillUpButton: {
                position: { align: "left", y: 450 },
                relativeTo: "spacingBox"
            }
        },
        // Additional Plot Options
        plotOptions: {
            pie: {
                allowPointSelect: true,
                // startAngle: 30,
                // cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br>{point.percentage:.1f}%',
                    padding: 0
                    // filter: {
                    //     property: 'percentage',
                    //     operator: '>',
                    //     value: 2
                    // }
                }
            },
        }
    })

}