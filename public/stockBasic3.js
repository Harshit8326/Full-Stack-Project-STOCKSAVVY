anychart.onDocumentReady(function () {
    anychart.data.loadCsvFile(
      'https://gist.githubusercontent.com/shacheeswadia/cd509e0b0c03964ca86ae7d894137043/raw/5f336c644ad61728dbac93026f3268b86b8d0680/teslaDailyData.csv',
      function (data) {
        // create data table on loaded data
        var dataTable = anychart.data.table();
        dataTable.addData(data);
  
        // map loaded data for the candlestick series
        var mapping = dataTable.mapAs({
          open: 1,
          high: 2,
          low: 3,
          close: 4
        });
      }
    );
  });
  // create stock chart
var chart = anychart.stock();

// create first plot on the chart
var plot = chart.plot(0);

// set grid settings
plot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);

var series = plot.candlestick(mapping)
        .name('Tesla');

series.legendItem().iconType('rising-falling');

// create scroller series with mapped data
chart.scroller().candlestick(mapping);

// set chart selected date/time range
chart.selectRange('2020-11-27', '2021-11-26');

// create range picker
var rangePicker = anychart.ui.rangePicker();

// init range picker
rangePicker.render(chart);

// create range selector
var rangeSelector = anychart.ui.rangeSelector();

// init range selector
rangeSelector.render(chart);


// sets the title of the chart
chart.title('Tesla Inc. Stock Chart');

// set container id for the chart
chart.container('container');

// initiate chart drawing
chart.draw();