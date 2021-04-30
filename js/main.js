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
            map: loader.load('https://threejsfundamentals.org/threejs/resources/images/wall.jpg'),
            //map: loader.load('textures.jpg'),
    });
    const material2 = new THREE.MeshBasicMaterial({
            //map: loader.load('https://webglfundamentals.org/webgl/resources/leaves.jpg'),
            map: loader.load('pattern.png'),
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

function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Так как изображение будет загружено из интернета,
  // может потребоваться время для полной загрузки.
  // Поэтому сначала мы помещаем в текстуру единственный пиксель, чтобы
  // её можно было использовать сразу. После завершения загрузки
  // изображения мы обновим текстуру.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);  // непрозрачный синий
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                width, height, border, srcFormat, srcType,
                pixel);

  const image = new Image();
  image.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  srcFormat, srcType, image);

    // У WebGL1 иные требования к изображениям, имеющим размер степени 2,
    // и к не имеющим размер степени 2, поэтому проверяем, что изображение
    // имеет размер степени 2 в обеих измерениях.
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
       // Размер соответствует степени 2. Создаём MIP'ы.
       gl.generateMipmap(gl.TEXTURE_2D);
    } else {
       // Размер не соответствует степени 2.
       // Отключаем MIP'ы и устанавливаем натяжение по краям
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;

  return texture;
}
function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}