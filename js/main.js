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

    const geometry = new THREE.PlaneGeometry(300.0, 300.0, 10.0);
    const geometry2 = new THREE.PlaneGeometry(300.0, 300.0, 10.0);
    const loader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial({
            //map: loader.load('https://threejsfundamentals.org/threejs/resources/images/wall.jpg'),
        map: loader.load('https://webglfundamentals.org/webgl/resources/leaves.jpg'),
            //map: loader.load('textures.jpg'),
    });
    const material2 = new THREE.MeshBasicMaterial({
            //map: loader.load('https://webglfundamentals.org/webgl/resources/leaves.jpg'),
        map: loader.load('pattern.png'),
        transparent: true
     });


    let mesh = new THREE.Mesh(geometry, material);
    let mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.position.z += 150;
    scene.add(mesh);
    scene.add(mesh2);

    function loop() {
        //mesh.rotation.y += Math.PI / 100;
        renderer.render(scene, camera);
        requestAnimationFrame(loop)
    }

    loop();
        
}
