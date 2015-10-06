
var renderer	= new THREE.WebGLRenderer({
    antialias	: true
});
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

renderer.shadowMapEnabled	= true;
renderer.shadowMapType 		= THREE.PCFSoftShadowMap;

var onRenderFcts= [];
var scene	= new THREE.Scene();
var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000000);

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
//scene.add( spotLight );	

onRenderFcts.push(function(){
    var angle	= Date.now()/1000 * Math.PI;
// angle	= Math.PI*2
    spotLight.position.x	= Math.cos(angle*-0.1)*200;
    //spotLight.position.y	= 100 + Math.sin(angle*0.5)*200;
    spotLight.position.z	= Math.sin(angle*-0.1)*200;		
})

//////////////////////////////////////////////////////////////////////////////////
//		Camera Controls							//
//////////////////////////////////////////////////////////////////////////////////
var mouse	= {x : 0, y : 0, scroll : 10000}
document.addEventListener('mousemove', function(event){
    mouse.x	= (event.clientX / window.innerWidth ) - 0.5
    mouse.y	= (event.clientY / window.innerHeight) + 0.5
}, false)
document.addEventListener('mousewheel', function(event){
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
            
    camera.position.x = pX;//-mouse.scroll*Math.cos(mouse.x*(2*Math.PI));
    camera.position.y = pZ;//mouse.scroll*Math.cos(mouse.y*(Math.PI));
    
    camera.position.z = pY;//mouse.scroll*Math.cos(mouse.x*(2*Math.PI))*Math.cos(mouse.y*(Math.PI));

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
    
    // Tweet
    if (~~(Math.random()*5000) === 0) {
        var tweet = "Sun, you just got #rekt by a factor of " + ~~(Math.random()*5000) + '.';
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", 'http://localhost:8081/tweet?message=' + escape(tweet), true); // true for asynchronous 
        xmlHttp.send(null);
        
        $.ajax({
            type: "GET",
            url: 'http://localhost:8081/tweet?message=' + escape(tweet),
            jsonp: 'callback',
            data: 0,
            contentType: 0,
            dataType: 'jsonp',
            async: true,
            crossDomain: true,
            success: function (msg) {
//                msg.header("Access-Control-Allow-Origin", "*");
//                callbackResult(msg.d);
            },
            error: function (xhr, ajaxOptions, thrownError) {
//                callbackResult(xhr.status + '\r\n' + thrownError + '\r\n' + xhr.responseText);
                console.log("Tweetin' didn't work!!!");
            }
        });
    }
})


//////////////////////////////////////////////////////////////////////////////////
//		helper functions							//
//////////////////////////////////////////////////////////////////////////////////

function graph(array1, array2)
{
    
    var particleCount = array1.length*array2.length,
        particles = new THREE.Geometry(),
        pMaterial = new THREE.ParticleBasicMaterial({
          size: 5,
          map: THREE.ImageUtils.loadTexture(
            "images/particle.png"
          ),
          blending: THREE.AdditiveBlending,
          transparent: false
        });
    
    // now create the individual particles
    for (var p = 0; p < particleCount; p++) {

        
        var pX = 2*(p%array1.length) - array1.length,
            pY = 2*Math.floor(p/array1.length) - array2.length,
            pZ = (array1[(pX + array1.length)/2])*(array2[(pY + array2.length)/2]),
            particle = new THREE.Vector3(pX, pZ, pY);

        // add it to the geometry
        particles.vertices.push(particle);
    }

    // create the particle system
    var particleSystem = new THREE.ParticleSystem(
        particles,
        pMaterial);

    // add it to the scene
    scene.add(particleSystem);

    onRenderFcts.push(function(){
        var angle	= Date.now()/10000 * Math.PI;
        particleSystem.rotation.y	= angle;		
    })

}

function graphSphere(radius, x, y, z, orbitY)
{
    
    var particleCount = 3000,
        particles = new THREE.Geometry(),
        pMaterial = new THREE.ParticleBasicMaterial({
          size: 5,
          map: THREE.ImageUtils.loadTexture(
            "images/particle.png"
          ),
          blending: THREE.AdditiveBlending,
          transparent: false
        });
    
    // now create the individual particles
    for (var p = 0; p < particleCount; p++) {

        var phi = (Math.PI/2) + Math.asin((2*p/particleCount) - 1),
            theta = (2*Math.PI)*Math.random(),
            pX = x + radius*Math.cos(theta)*Math.sin(phi),
            pY = y + radius*Math.sin(theta)*Math.sin(phi),
            pZ = z + radius*Math.cos(phi),
            particle = new THREE.Vector3(pX, pZ, pY);

        // add it to the geometry
        particles.vertices.push(particle);
    }

    // create the particle system
    var particleSystem = new THREE.ParticleSystem(
        particles,
        pMaterial);

    // add it to the scene
    scene.add(particleSystem);
    
    onRenderFcts.push(function(){
        var angle	= -1*Date.now()/10000 * Math.PI;
        if (orbitY)
        {
            particleSystem.rotation.y	= angle;
        }
    })
}


//////////////////////////////////////////////////////////////////////////////////
//		solar system							//
//////////////////////////////////////////////////////////////////////////////////
 planets = 
    [ 
        {
            spherical: 
            {
                ro: 0,
                theta: 0, 
                phi: 0
            },
            cartesian:
            {
                x: 0,
                y: 0,
                z: 0
            },
            radius: 696300,
            color: 0xFFD633,
            axialTilt: 0,
            orbitalTime: 1,
            rotationTime: 10000,
            inclination: 0,
            orbitalIrregularity: 0,
            SMA: 0
        },
        {
            spherical: 
            {
                ro: 0,
                theta: 0, 
                phi: 0
            },
            cartesian:
            {
                x: 0,
                y: 0,
                z: 0
            },
            radius: 2440,
            color: 0x9E9E9E,
            axialTilt: .034 * (Math.PI/180),
            orbitalTime: 87.969,
            rotationTime: 58 + (15/24),
            inclination: 6.34*(Math.PI/180),
            orbitalIrregularity: .205630,
            SMA: 57909050
        }, 
        {
            spherical: 
            {
                ro: 0,
                theta: 0, 
                phi: 0
            },
            cartesian:
            {
                x: 0,
                y: 0,
                z: 0
            },
            radius: 6051.8,
            color: 0xefdea1,
            axialTilt: 177.36 * (Math.PI/180),
            orbitalTime: 224.701,
            rotationTime: 116.75,
            inclination: 2.19 *(Math.PI/180),
            orbitalIrregularity: .00677,
            SMA: 108208000
        }, 
        {
            spherical: 
            {
                ro: 0,
                theta: 0, 
                phi: 0
            },
            cartesian:
            {
                x: 0,
                y: 0,
                z: 0
            },
            radius: 6371,
            color: 0x4099ff,
            axialTilt: 23.439 * (Math.PI/180),
            orbitalTime: 365.256,
            rotationTime: 1,
            inclination: 1.579 * (Math.PI/180),
            orbitalIrregularity: .0167,
            SMA: 149598261,
            moons:
            [
                {
                    spherical: 
                    {
                        ro: 0,
                        theta: 0, 
                        phi: 0
                    },
                    cartesian:
                    {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    radius: 1737.1,
                    color: 0x808080,
                    orbitalTime: 27.32,
                    inclination: 3.5 * (Math.PI/180),
                    orbitalIrregularity: .0167,
                    SMA: 384399
                }
            ]
        }, 
        {
            spherical: 
            {
                ro: 0,
                theta: 0, 
                phi: 0
            },
            cartesian:
            {
                x: 0,
                y: 0,
                z: 0
            },
            radius: 3389.5,
            color: 0xb23e00,
            axialTilt: 25.19 * (Math.PI/180),
            orbitalTime: 686.971,
            rotationTime: 1 + (2/3)/24,
            inclination: 1.67 * (Math.PI/180),
            orbitalIrregularity: .0935,
            SMA: 227939100,
            moons:
            [
                {
                    spherical: 
                    {
                        ro: 0,
                        theta: 0, 
                        phi: 0
                    },
                    cartesian:
                    {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    radius: 11.2667,
                    color: 0xb7a5a1,
                    orbitalTime: .3189,
                    inclination: 3.5 * (Math.PI/180),
                    orbitalIrregularity: .0167,
                    SMA: 384399
                },
                {
                    spherical: 
                    {
                        ro: 0,
                        theta: 0, 
                        phi: 0
                    },
                    cartesian:
                    {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    radius: 6.2,
                    color: 0xCDC29A,
                    orbitalTime: 1.263,
                    inclination: 26 * (Math.PI/180),
                    orbitalIrregularity: .00033,
                    SMA: 23463
                }
            ]
        }, 
        {
            spherical: 
            {
                ro: 0,
                theta: 0, 
                phi: 0
            },
            cartesian:
            {
                x: 0,
                y: 0,
                z: 0
            },
            radius: 69911,
            color: 0xc1a88a,
            axialTilt: 3.13 * (Math.PI/180),
            orbitalTime: 4332.59,
            rotationTime: (9 + (56/60))/24,
            inclination: .32 * (Math.PI/180),
            orbitalIrregularity: .048775,
            SMA: 778547200,
            rings:
            [
                {
                    innerRadius: 92000,
                    outerRadius: 122500,
                    color: 0
                },
                {
                    innerRadius: 122500,
                    outerRadius: 129000,
                    color: 0
                },
                {
                    innerRadius: 129000,
                    outerRadius: 182000,
                    color: 0
                },
                {
                    innerRadius: 129000,
                    outerRadius: 226000,
                    color: 0
                }
            ],
            moons:
            [
                {
                    spherical: 
                    {
                        ro: 0,
                        theta: 0, 
                        phi: 0
                    },
                    cartesian:
                    {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    radius: 2631,
                    color: 0xb8b8b8,
                    orbitalTime: 7.1546,
                    inclination: .204 * (Math.PI/180),
                    orbitalIrregularity: .0011,
                    SMA: 1070412
                },
                {
                    spherical: 
                    {
                        ro: 0,
                        theta: 0, 
                        phi: 0
                    },
                    cartesian:
                    {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    radius: 2410.3,
                    color: 0x928371,
                    orbitalTime: 16.689,
                    inclination: .205 * (Math.PI/180),
                    orbitalIrregularity: .0074,
                    SMA: 1882709
                },
                {
                    spherical: 
                    {
                        ro: 0,
                        theta: 0, 
                        phi: 0
                    },
                    cartesian:
                    {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    radius: 1825,
                    color: 0xfad354,
                    orbitalTime: 1.769,
                    inclination: .05 * (Math.PI/180),
                    orbitalIrregularity: .0041,
                    SMA: 421700
                },
                {
                    spherical: 
                    {
                        ro: 0,
                        theta: 0, 
                        phi: 0
                    },
                    cartesian:
                    {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    radius: 1560.8,
                    color: 0x9d7e60,
                    orbitalTime: 3.5512,
                    inclination: .471 * (Math.PI/180),
                    orbitalIrregularity: .0094,
                    SMA: 671034
                }
            ]
        }, 
        {
            spherical: 
            {
                ro: 0,
                theta: 0, 
                phi: 0
            },
            cartesian:
            {
                x: 0,
                y: 0,
                z: 0
            },
            radius: 58232,
            color: 0xefdea1,
            axialTilt: 26.73 * (Math.PI/180),
            orbitalTime: 10759.22,
            rotationTime: (10 + (39/60))/24,
            inclination: .93 * (Math.PI/180),
            orbitalIrregularity: .055723,
            SMA: 1433449370,
            rings:
            [
                {
                    innerRadius: 74658,
                    outerRadius: 92000,
                    color: 0
                },
                {
                    innerRadius: 92000,
                    outerRadius: 117580,
                    color: 0
                },
                {
                    innerRadius: 122170,
                    outerRadius: 136775,
                    color: 0
                }
            ],
            moons:
            [
                {
                    spherical: 
                    {
                        ro: 0,
                        theta: 0, 
                        phi: 0
                    },
                    cartesian:
                    {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    radius: 2575,
                    color: 0xfad354,
                    orbitalTime: 15.945,
                    inclination: .3485 * (Math.PI/180),
                    orbitalIrregularity: .0288,
                    SMA: 1221930
                }
            ]
        }, 
        {
            spherical: 
            {
                ro: 0,
                theta: 0, 
                phi: 0
            },
            cartesian:
            {
                x: 0,
                y: 0,
                z: 0
            },
            radius: 25362,
            color: 0x9ACBEC,
            axialTilt: 97.77 * (Math.PI/180),
            orbitalTime: 30687.15,
            rotationTime: (17 + (14/60))/24,
            inclination: 1.02 * (Math.PI/180),
            orbitalIrregularity: .04722,
            SMA: 2870671400,
            rings:
            [
                {
                    innerRadius: 0,
                    outerRadius: 0,
                    color: 0
                }
            ],
            moons:
            [
                {
                    spherical: 
                    {
                        ro: 0,
                        theta: 0, 
                        phi: 0
                    },
                    cartesian:
                    {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    radius: 788.4,
                    color: 0xb2b2b2,
                    orbitalTime: 8.705,
                    inclination: .340 * (Math.PI/180),
                    orbitalIrregularity: .0011,
                    SMA: 435910
                },
                {
                    spherical: 
                    {
                        ro: 0,
                        theta: 0, 
                        phi: 0
                    },
                    cartesian:
                    {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    radius: 761.4,
                    color: 0xb2b2b2,
                    orbitalTime: 13.463,
                    inclination: .058 * (Math.PI/180),
                    orbitalIrregularity: .0014,
                    SMA: 583520
                }
            ]
        }, 
        {
            spherical: 
            {
                ro: 0,
                theta: 0, 
                phi: 0
            },
            cartesian:
            {
                x: 0,
                y: 0,
                z: 0
            },
            radius: 24622,
            color: 0x4c4cff,
            axialTilt: 28.32 * (Math.PI/180),
            orbitalTime: 60190,
            rotationTime: (16 + (6/60))/24,
            inclination: .72 * (Math.PI/180),
            orbitalIrregularity: .00868,
            SMA: 4498542600,
            rings:
            [
                {
                    innerRadius: 0,
                    outerRadius: 0,
                    color: 0
                }
            ],
            moons:
            [
                {
                    spherical: 
                    {
                        ro: 0,
                        theta: 0, 
                        phi: 0
                    },
                    cartesian:
                    {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    radius: 1352.6,
                    color: 0xb2b2b2,
                    orbitalTime: 5.877,
                    inclination: 156.865 * (Math.PI/180),
                    orbitalIrregularity: 0,
                    SMA: 354759
                }
            ]
        }
    ];

solarSystem(planets, .01);

function solarSystem(planets, scale)
{
    for (var i = 0; i < planets.length; i++)
    {
        planet(planets[i], scale);
    }
}

function planet(planet, scale)
{
    planet.radius = planet.radius * scale;
    planet.SMA = planet.SMA * scale / 75;
    
    var particleCount = planet.radius * 10,
        particles = new THREE.Geometry(),
        pMaterial = new THREE.ParticleBasicMaterial({
          size: 5,
          color: planet.color,
          blending: THREE.AdditiveBlending
        });
    
    // now create the individual particles
    for (var p = 0; p < particleCount; p++) {

        var phi = (Math.PI/2) + Math.asin((2*p/particleCount) - 1),
            theta = (2*Math.PI)*Math.random(),
            pX = planet.radius*Math.cos(theta)*Math.sin(phi),
            pY = planet.radius*Math.sin(theta)*Math.sin(phi),
            pZ = planet.radius*Math.cos(phi),
            particle = new THREE.Vector3(pX, pZ, pY);

        // add it to the geometry
        particles.vertices.push(particle);
    }

    // create the particle system
    var particleSystem = new THREE.ParticleSystem(
        particles,
        pMaterial);

    // add it to the scene
    scene.add(particleSystem);
    
    onRenderFcts.push(function(){
        var angle	= Date.now()/10 * Math.PI;
        
        planet.spherical.theta = angle/planet.orbitalTime;
        planet.spherical.phi = Math.PI/2 - Math.sin(planet.spherical.theta) * planet.inclination;
        particleSystem.position.x = planet.SMA*Math.cos(planet.spherical.theta)*Math.sin(planet.spherical.phi);
        particleSystem.position.z = planet.SMA*Math.sin(planet.spherical.theta)*Math.sin(planet.spherical.phi);
        particleSystem.position.y = planet.SMA*Math.cos(planet.spherical.phi);
        
        particleSystem.rotation.x = planet.axialTilt;
        particleSystem.rotation.y = angle/planet.rotationTime;
    })
    
    for (var j = 0; j < planet.moons.length; j++)
    {
        
    }
}