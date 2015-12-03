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
//                    
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