var renderer	= new THREE.WebGLRenderer({
    antialias	: true
});
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

renderer.shadowMapEnabled	= true;
renderer.shadowMapType 		= THREE.PCFSoftShadowMap;

var onRenderFcts= [];
var scene	= new THREE.Scene();
var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100000);

//////////////////////////////////////////////////////////////////////////////////
//		Comment								//
//////////////////////////////////////////////////////////////////////////////////
var ambient	= new THREE.AmbientLight( 0x444444 );
scene.add( ambient );

var spotLight	= new THREE.SpotLight( 0xFFAA88 );
spotLight.lookAt( 0, 0, 0 );
spotLight.shadowCameraNear	= 0.01;		
spotLight.castShadow		= true;
spotLight.shadowDarkness	= 0.5;
spotLight.shadowCameraVisible	= true;
// console.dir(spotLight)
// spotLight.shadowMapWidth	= 1024;
// spotLight.shadowMapHeight	= 1024;
scene.add( spotLight );	

onRenderFcts.push(function(){
    var angle	= Date.now()/1000 * Math.PI;
// angle	= Math.PI*2
    spotLight.position.x	= Math.cos(angle*0.1)*200;
    spotLight.position.y	= 100 + Math.sin(angle*0.5)*200;
    spotLight.position.z	= Math.sin(angle*0.1)*200;		
})
//////////////////////////////////////////////////////////////////////////////////
//		stuff								//
//////////////////////////////////////////////////////////////////////////////////
var arrayX = [0],
    arrayY = [0],
    arrayZ = [0];

for (var i = 0; i < 10000; i++)
{
    arrayX[i] = Math.random() * 500;
    arrayY[i] = Math.random() * 500;
    arrayZ[i] = Math.random() * 500;
}

graph2(arrayX, arrayY, arrayZ);

//////////////////////////////////////////////////////////////////////////////////
//		Camera Controls							//
//////////////////////////////////////////////////////////////////////////////////
var mouse	= {x : 0, y : 0, startX : 0, startY : 0, tempX : 0, tempY : 0, scroll : 10000, isDown: false}

document.addEventListener('mousedown', function(event)
{
    mouse.isDown = true;
    mouse.startX = (event.clientX / window.innerWidth );
    mouse.startY = (event.clientY / window.innerHeight);
    mouse.tempX  = mouse.x;
    mouse.tempY  = mouse.y;
}, false)
document.addEventListener('mouseup', function(event){mouse.isDown = false}, false)
                          
document.addEventListener('mousemove', function(event)
{
    if (mouse.isDown)
    {
        mouse.x	= mouse.tempX + (event.clientX / window.innerWidth ) - mouse.startX;
        mouse.y	= mouse.tempY - (event.clientY / window.innerHeight) + mouse.startY;
    }
}, false)
document.addEventListener('mousewheel', function(event)
{
    mouse.scroll += ((typeof event.wheelDelta != "undefined")?(-event.wheelDelta):event.detail)*(mouse.scroll/1000);
    if (mouse.scroll < 0)
    {
        mouse.scroll = 0;
    }
}, false);
onRenderFcts.push(function(delta, now){

   // console.log(mouse.x + " :: " + mouse.y);
    var phi = Math.PI*(mouse.y),
        theta = 2*Math.PI*(mouse.x),
        pX = mouse.scroll*Math.cos(theta)*Math.sin(phi),
        pY= mouse.scroll*Math.sin(theta)*Math.sin(phi),
        pZ = mouse.scroll*Math.cos(phi);
    console.log(pX + " :: " + pY + " :: " + pZ);
    
    camera.position.x = pX;
    camera.position.y = pZ;
    camera.position.z = pY;

    camera.lookAt( scene.position );
})


//////////////////////////////////////////////////////////////////////////////////
//		render the scene						//
//////////////////////////////////////////////////////////////////////////////////
onRenderFcts.push(function(){
    renderer.render( scene, camera );		
})

//////////////////////////////////////////////////////////////////////////////////
//		loop runner							//
//////////////////////////////////////////////////////////////////////////////////
var lastTimeMsec= null
requestAnimationFrame(function animate(nowMsec){
    // keep looping
    requestAnimationFrame( animate );
    // measure time
    lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
    var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
    lastTimeMsec	= nowMsec
    // call each update function
    onRenderFcts.forEach(function(onRenderFct){
        onRenderFct(deltaMsec/1000, nowMsec/1000)
    })
})


//////////////////////////////////////////////////////////////////////////////////
//		helper functions							//
//////////////////////////////////////////////////////////////////////////////////

function graph(array1, array2)
{
    
    var particleCount = array1.length*array2.length,
        particles = new THREE.Geometry(),
        pMaterial = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
            color: 0xff00ff,
            shading: THREE.SmoothShading
        });
    
    // now create the individual particles
    for (var p = 0; p < particleCount; p++) {

        
        var row = (p%array1.length),
            col = Math.floor(p/array1.length),
            pX = 2*row - array1.length,
            pY = 2*col - array2.length,
            pZ = (array1[row])*(array2[col]),
            particle = new THREE.Vector3(pX, pZ, pY);

        // add it to the geometry
        particles.vertices.push(particle);
        if (row != 0 && col != 0)
        {
            particles.faces.push( new THREE.Face3( col * array1.length + row, col * array1.length + row - 1, (col - 1) * array1.length + row) );
            particles.faces.push( new THREE.Face3( (col - 1) * array1.length + row, col * array1.length + row - 1, (col - 1) * array1.length + row - 1) );
        }
    }
    
    particles.computeFaceNormals();

    // create the particle system
    var particleSystem = new THREE.Mesh(
        particles,
        pMaterial);

    // add it to the scene
    scene.add(particleSystem);

    onRenderFcts.push(function(){
        var angle	= Date.now()/10000 * Math.PI;
        particleSystem.rotation.y	= angle;		
    });
}

function graph1(pointArray)
{
    
    var particleCount = pointArray.length,
        particles = new THREE.Geometry(),
        pMaterial = new THREE.PointCloudMaterial({
            side: THREE.DoubleSide,
            color: 0x909090,
            shading: THREE.SmoothShading
        });
    
    // now create the individual particles
    for (var p = 0; p < particleCount; p++) {

        
        var point = pointArray[p],
            particle = new THREE.Vector3(point[0], point[1], point[2]);

        // add it to the geometry
        particles.vertices.push(particle);
    }

    // create the particle system
    var particleSystem = new THREE.PointCloud(
        particles,
        pMaterial);

    // add it to the scene
    scene.add(particleSystem);

    onRenderFcts.push(function(){
        var angle	= Date.now()/10000 * Math.PI;
        particleSystem.rotation.y	= angle;		
    });
}

function graph2(arrayX, arrayY, arrayZ)
{
    
    var particleCount = arrayX.length,
        particles = new THREE.Geometry(),
        pMaterial = new THREE.PointCloudMaterial({
            color: 0x909090,
            shading: THREE.SmoothShading
        });
    
    // now create the individual particles
    for (var p = 0; p < particleCount; p++) {

        
        var particle = new THREE.Vector3(arrayX[p], arrayY[p], arrayZ[p]);

        // add it to the geometry
        particles.vertices.push(particle);
    }

    // create the particle system
    var particleSystem = new THREE.PointCloud(
        particles,
        pMaterial);

    // add it to the scene
    scene.add(particleSystem);

    onRenderFcts.push(function(){
        var angle	= Date.now()/10000 * Math.PI;
        particleSystem.rotation.y	= angle;		
    });
}