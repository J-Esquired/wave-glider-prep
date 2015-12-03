

var arrayX = [0],
    arrayY = [0],
    arrayZ = [0];

for (var i = 0; i < 100; i++)
{
    arrayX[i] = Math.random() * 2000 - 1000;
    arrayY[i] = Math.random() * 2000 - 1000;
    arrayZ[i] = Math.cos(arrayX[i]/500) * Math.sin(arrayY[i]/500);
};

/*                    3D SURFACE GRAPH
var data = [{
    x: arrayX,
    y: arrayY,
    z: arrayZ,
    mode: 'markers',
    marker: {
        size: 12,
        opacity: 0.1
    },
    type: 'surface'           //change to 'contour' for a heatmap style
}];

var layout = {
  title: 'Mt Bruno Elevation',
};
Plotly.newPlot('myDiv', data, layout);
*/