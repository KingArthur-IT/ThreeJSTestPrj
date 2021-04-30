window.onload = function () {
    //camvas params
    let width = window.innerWidth;
    let height = window.innerHeight;
    let canvas = document.getElementById('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    //renderer
    let renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setClearColor(0x000000);

    //scene and camera
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
    camera.position.set(0, 0, 1000);

    //light
    let light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    //let geometry = new THREE.PlaneGeometry(300, 300, 12, 12);
    //let geometry = new THREE.SphereGeometry(300, 12, 12);

    var geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const texture = new THREE.TextureLoader().load( 'texture.jpg' );

    var material = new THREE.MeshBasicMaterial( { map: texture } );
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //let texture = THREE.TextureLoader('textures.jpg');
    //let material = new THREE.MeshBasicMaterial({ map: texture });
    //let material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    /*
    console.log(geometry.vertices.length);
    for (let i = 0; i < geometry.faces.length; i++) {
        geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());        
    }
    */

    //let mesh = new THREE.Mesh(geometry, material);
    //scene.add(mesh);

    function loop() {
        mesh.rotation.y += Math.PI / 100;
        renderer.render(scene, camera);
        requestAnimationFrame(loop)
    }

    loop();
        
}