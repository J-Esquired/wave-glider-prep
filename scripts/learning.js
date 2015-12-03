var arrayX = [0],
    arrayY = [0],
    arrayZ = [0];

for (var i = 0; i < 1000; i++)
{
    arrayX[i] = Math.random() * 2000 - 1000;
    arrayY[i] = Math.random() * 2000 - 1000;
    arrayZ[i] = arrayX[i] * arrayY[i] - arrayX[i] * arrayX[i] + .25 * arrayY[i] * arrayY[i];
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