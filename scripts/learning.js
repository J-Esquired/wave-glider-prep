var renderer	= new THREE.WebGLRenderer({
    antialias	: true
});
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

renderer.shadowMap.enabled	= true;
renderer.shadowMap.type 	= THREE.PCFSoftShadowMap;

var onRenderFcts= [];
var scene	= new THREE.Scene();
var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100000);

//////////////////////////////////////////////////////////////////////////////////
//		Comment								//
//////////////////////////////////////////////////////////////////////////////////
var ambient	= new THREE.AmbientLight( 0x444444 );
scene.add( ambient );

var spotLight = new THREE.DirectionalLight( 0xffffff );
spotLight.position.set( 0, 1, 1 ).normalize();
scene.add(spotLight);

onRenderFcts.push(function(){
    var angle	= Date.now()/1000 * Math.PI;
 //   spotLight.position.x	= Math.cos(angle)*200;
 //   spotLight.position.y	= 100 + Math.sin(angle*0.5)*200;
 //   spotLight.position.z	= Math.sin(angle)*200;		
})
//////////////////////////////////////////////////////////////////////////////////
//		stuff								//
//////////////////////////////////////////////////////////////////////////////////
var arrayX = [0];
var arrayY = [0];

for (var i = 0; i < 100; i++)
{
    arrayX[i] = i*i/10000;
    arrayY[i] = 25*Math.sin(i*Math.PI/10);
}

graph(arrayX, arrayY);

//////////////////////////////////////////////////////////////////////////////////
//		Camera Controls							//
//////////////////////////////////////////////////////////////////////////////////
var mouse	= {x : 0, y : 0, tempX : 0, tempY : 0, startX : 0, startY : 0, scroll : 10000, isDown: false}

document.addEventListener('mousedown', function(event)
{
    mouse.isDown = true;
    mouse.tempX  = mouse.x;
    mouse.tempY  = mouse.y;
    mouse.startX = (event.clientX / window.innerWidth ) - 0.5;
    mouse.startY = (event.clientY / window.innerHeight) + 0.5;
}, false)
document.addEventListener('mouseup', function(event){mouse.isDown = false}, false)
                          
document.addEventListener('mousemove', function(event)
{
    if (mouse.isDown)
    {
        mouse.x	= ((event.clientX / window.innerWidth ) - 0.5) - mouse.startX + mouse.tempX;
        mouse.y	= ((event.clientY / window.innerHeight) + 0.5) - mouse.startY + mouse.tempY;
        
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

    var phi = Math.PI*(.5 + mouse.y),
        theta = 2*Math.PI*(.5 + mouse.x),
        pX = mouse.scroll*Math.cos(theta)*Math.sin(phi),
        pY= mouse.scroll*Math.sin(theta)*Math.sin(phi),
        pZ = mouse.scroll*Math.cos(phi);
            
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

    // create the particle system
    var particleSystem = new THREE.Mesh(
        particles,
        pMaterial);

    // add it to the scene
    scene.add(particleSystem);

    onRenderFcts.push(function(){
        var angle	= Date.now()/10000 * Math.PI;
        particleSystem.rotation.y	= angle;		
    })
}

function graphFunction(inputFunction)
{
    var particleCount = 1000,
        particles = new THREE.Geometry(),
        pMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shading: THREE.SmoothShading
        });
    
    // now create the individual particles
    for (var p = 0; p < particleCount; p++) {

        
        var pX = 500 - 5*Math.floor(p/200),
            pY = 500 - 5*(p%200),
            pZ = inputFunction(pX,pY),
            particle = new THREE.Vector3(pX, pZ, pY);

        // add it to the geometry
        particles.vertices.push(particle);
    }

    // create the particle system
    var particleSystem = new THREE.mesh(
        particles,
        pMaterial);

    // add it to the scene
    scene.add(particleSystem);
}