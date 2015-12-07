/*
//                 3D SCATTER PLOT, NICE TEXTURE
var arrayX = [0],
    arrayY = [0],
    arrayZ = [0];

for (var i = 0; i < 10000; i++)
{
    arrayX[i] = Math.random() * 2000 - 1000;
    arrayY[i] = Math.random() * 2000 - 1000;
    arrayZ[i] = Math.cos(arrayX[i]/500) * Math.sin(arrayY[i]/500);
};

var data = [{
    x: arrayX,
    y: arrayY,
    z: arrayZ,
    mode: 'markers',
    marker: {
        size: 12,
        opacity: 0.1
    },
    type: 'scatter3d'
}];

var layout = {
  title: 'Mt Bruno Elevation',
};
Plotly.newPlot('myDiv', data, layout);

*/
/////////////////////////////////////////////////////////////////////////////
/*
//                    CONTOUR PLOT, IS QUITE SLOW
var arrayX = [0],
    arrayY = [0],
    arrayZ = [0];

for (var i = 0; i < 100; i++)
{
    arrayX[i] = Math.random() * 2000 - 1000;
    arrayY[i] = Math.random() * 2000 - 1000;
    arrayZ[i] = Math.cos(arrayX[i]/500) * Math.sin(arrayY[i]/500);
};

var data = [{
    x: arrayX,
    y: arrayY,
    z: arrayZ,
    mode: 'markers',
    marker: {
        size: 12,
        opacity: 0.1
    },
    type: 'contour'
}];

var layout = {
  title: 'Mt Bruno Elevation',
};
Plotly.newPlot('myDiv', data, layout);

*/
/////////////////////////////////////////////////////////////////////////////
/*
//                    BUBBLE MAP
Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2014_us_cities.csv', function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var cityName = unpack(rows, 'name'),
        cityPop = unpack(rows, 'pop'),
        cityLat = unpack(rows, 'lat'),
        cityLon = unpack(rows, 'lon'),
        color = [,"rgb(255,65,54)","rgb(133,20,75)","rgb(255,133,27)","lightgrey"],
        citySize = [],
        hoverText = [],
        scale = 50000;

    for ( var i = 0 ; i < cityPop.length; i++) {
        var currentSize = cityPop[i] / scale;
        var currentText = cityName[i] + " pop: " + cityPop[i];
        citySize.push(currentSize);
        hoverText.push(currentText);
    }
    
    var data = [{
        type: 'scattergeo',
        locationmode: 'usa',
        lat: cityLat,
        lon: cityLon,
        hoverinfo: 'text',
        text: hoverText,
        marker: {
            size: citySize,
            line: {
                color: 'black',
                width: 2
            },
        }
    }];

    var layout = {
        title: '2014 US City Populations',
        showlegend: false,
        geo: {
            scope: 'usa',
            projection: {
                type: 'albers usa'
            },
            showland: true,
            landcolor: 'rgb(217, 217, 217)',
            subunitwidth: 1,
            countrywidth: 1,
            subunitcolor: 'rgb(255,255,255)',
            countrycolor: 'rgb(255,255,255)'
        },
    };

    Plotly.plot(myDiv, data, layout, {showLink: false});
});
*/
/////////////////////////////////////////////////////////////////////////////
/*
//                          SCATTER MAP
Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2011_february_us_airport_traffic.csv', function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var scl = [[0,'rgb(5, 10, 172)'],[0.35,'rgb(40, 60, 190)'],[0.5,'rgb(70, 100, 245)'], [0.6,'rgb(90, 120, 245)'],[0.7,'rgb(106, 137, 247)'],[1,'rgb(220, 220, 220)']];

    var data = [{
        type:'scattergeo',
        locationmode: 'USA-states',
        lon: unpack(rows, 'long'),
        lat: unpack(rows, 'lat'),
        hoverinfor:  unpack(rows, 'airport'),
        text:  unpack(rows, 'airport'),
        mode: 'markers',
        marker: {
            size: 8,
            opacity: 0.8,
            reversescale: true,
            autocolorscale: false,
            symbol: 'square',
            line: {
                width: 1,
                color: 'rgb(102,102,102)'
            },
            colorscale: scl,
            cmin: 0,
            color: unpack(rows, 'cnt'),
            colorbar: {
                title: 'Incoming Flights February 2011'
            }
        }
    }];


    var layout = {
        title: 'Most Trafficked US airports',
        colorbar: true,
        geo: {
            scope: 'usa',
            projection: {
                type: 'albers usa'
            },
            showland: true,
            landcolor: 'rgb(250,250,250)',
            subunitcolor: 'rgb(217,217,217)',
            countrycolor: 'rgb(217,217,217)',
            countrywidth: 0.5,
            subunitwidth: 0.5
        }
    };

    Plotly.plot(myDiv, data, layout, {showLink: false});

});
*/
/////////////////////////////////////////////////////////////////////////////

//                           "HEAT" MAP
Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2015_06_30_precipitation.csv', function(err, rows){
      function unpack(rows, key) {
          return rows.map(function(row) { return row[key]; });
      }

 scl = [[0, 'rgb(150,0,90)'],[0.125, 'rgb(0, 0, 200)'],[0.25,'rgb(0, 25, 255)'],[0.375,'rgb(0, 152, 255)'],[0.5,'rgb(44, 255, 150)'],[0.625,'rgb(151, 255, 0)'],[0.75,'rgb(255, 234, 0)'],[0.875,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

    var data = [{
        type: 'scattergeo',
        mode: 'markers',
        text: unpack(rows, 'Globvalue'),
        lon: unpack(rows, 'Lon'),
        lat: unpack(rows, 'Lat'),
        marker: {
          color: unpack(rows, 'Globvalue'),
          colorscale: scl,
          cmin: 0,
          cmax: 1.4,
          reversescale: true,
          opacity: 0.2,
          size: 2,
          colorbar:{
            thickness: 10,
            titleside: 'right',
            outlinecolor: 'rgba(68,68,68,0)',
            ticks: 'outside',
            ticklen: 3,
            shoticksuffix: 'last',
            ticksuffix: 'inches',
            dtick: 0.1
          }
        },
        name: 'NA Precipitation'
    }];

    var layout = {
      geo:{
        scope: 'world',
        showland: true,
        landcolor: 'rgb(212,212,212)',
        subunitcolor: 'rgb(255,255,255)',
        countrycolor: 'rgb(255,255,255)',
        showlakes: true,
        lakecolor: 'rgb(255,255,255)',
        showsubunits: true,
        showcountries: true,
        resolution: 50
      },
      longaxis: {
        showgrid: true,
        gridwidth: 0.5,
        range: [ -140.0, -55.0 ],
        dtick: 5
      },
      lataxis: {
        showgrid: true,
        gridwidth: 0.5,
        range: [ 20.0, 60.0 ],
        dtick: 5
      },
      title: 'North America Precipitation',
      width: 600,
      height: 600
    };

    Plotly.newPlot('myDiv', data, layout);
  });
