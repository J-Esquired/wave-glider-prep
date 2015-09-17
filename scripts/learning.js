
var renderer	= new THREE.WebGLRenderer({
    antialias	: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.shadowMapEnabled	= true;
renderer.shadowMapType 		= THREE.PCFSoftShadowMap;

var onRenderFcts= [];
var scene	= new THREE.Scene();
var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.z = 50;

//////////////////////////////////////////////////////////////////////////////////
//		Comment								//
//////////////////////////////////////////////////////////////////////////////////
var ambient	= new THREE.AmbientLight( 0x444444 );
scene.add( ambient );

var spotLight	= new THREE.SpotLight( 0xFFAA88 );
spotLight.target.position.set( 0, 2, 0 );
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
    spotLight.position.x	= Math.cos(angle*-0.1)*20;
    spotLight.position.y	= 15 + Math.sin(angle*0.5)*6;
    spotLight.position.z	= Math.sin(angle*-0.1)*20;		
})
//////////////////////////////////////////////////////////////////////////////////
//		Comment								//
//////////////////////////////////////////////////////////////////////////////////

var geometry	= new THREE.DodecahedronGeometry(25, 5);
var material	= new THREE.MeshPhongMaterial({
    ambient		: 0x444444,
    color		: 0x8844AA,
    shininess	: 300, 
    specular	: 0x33AA33,
    shading		: THREE.SmoothShading
});
var torusKnot	= new THREE.Mesh( geometry, material );
torusKnot.scale.multiplyScalar(1/18);
torusKnot.position.y		= 4;
scene.add( torusKnot );

onRenderFcts.push(function(){
    var angle	= Date.now()/1000 * Math.PI;
// angle	= Math.PI*2
    torusKnot.position.x	= Math.cos(angle)*5;
    torusKnot.position.z	= Math.sin(angle*-0.7)*5;			
})


torusKnot.castShadow		= true;
torusKnot.receiveShadow	= false;

//////////////////////////////////////////////////////////////////////////////////
//		Ground
//////////////////////////////////////////////////////////////////////////////////

var geometry	= new THREE.CubeGeometry( 50, 0.2, 50);
var material	= new THREE.MeshPhongMaterial({
    ambient		: 0x444444,
    color		: 0x66aa66,
    shininess	: 150, 
    specular	: 0x888888,
    shading		: THREE.SmoothShading
});
var ground		= new THREE.Mesh( geometry, material );
ground.scale.multiplyScalar(3);
ground.position.y		= -0.5/2;
scene.add( ground );

ground.castShadow	= false;
ground.receiveShadow	= true;


//////////////////////////////////////////////////////////////////////////////////
//		Camera Controls							//
//////////////////////////////////////////////////////////////////////////////////
var mouse	= {x : 0, y : 0}
document.addEventListener('mousemove', function(event){
    mouse.x	= (event.clientX / window.innerWidth ) - 0.5
    mouse.y	= (event.clientY / window.innerHeight) - 0.5
}, false)
onRenderFcts.push(function(delta, now){
    camera.position.x += (mouse.x*40 - camera.position.x) * (delta*3)
    camera.position.y += (mouse.y*10 - camera.position.y + 4) * (delta*3)
    // limit camera position to avoid showing shadow on backface
    camera.position.y	= Math.max(camera.position.y, 3);

    camera.lookAt( scene.position )
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