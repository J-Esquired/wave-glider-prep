var arrayX = [0],
    arrayY = [0],
    arrayZ = [0],

for (var i = 0; i < 1000; i++)
{
    arrayX[i] = Math.random() * 2000 - 1000;
    arrayY[i] = Math.random() * 2000 - 1000;
    arrayZ[i] = Math.random() * 500 - 250;
}

var data = [{
    x: arrayX,
    y: arrayY,
    z: arrayZ,
    type: 'surface'
}];
var layout = {
  title: 'Mt Bruno Elevation',
  autosize: false,
  width: 500,
  height: 500,
  margin: {
    l: 65,
    r: 50,
    b: 65,
    t: 90
  }
};
Plotly.newPlot('myDiv', data, layout);