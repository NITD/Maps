// if ('geolocation' in navigator) {
// 	navigator.geolocation.getCurrentPosition(createMap, function (err) {
// 		window.alert(err.message);
// 	});
// } else {
// 	document.body.innerHTML = 'Location API Not Supported';
// }

// var previousLocation = {
// 	lat: null,
// 	lng: null
// };

function createMap(position) {
	window.alert(position.coords.latitude + " " + position.coords.longitude);
	var url = 'https://maps.googleapis.com/maps/api/staticmap?center='
			+ position.coords.latitude
			+ ','
			+ position.coords.longitude
			+ '&zoom=18&size=512x512&style=feature:all|element:labels|visibility:off&key=AIzaSyBKEZLaOIgsrLRFvlGYnbJJzhaSRHncAu0';
	var image = new Image();
	image.crossOrigin = 'anonymous';
	image.src = url;

	// previousLocation.lat = position.coords.latitude;
	// previousLocation.lng = position.coords.longitude;
	image.onload = function (e) {
		init(e.target);
	};
}

createMap({ coords: { latitude: 28.8429333, longitude: 77.10502 }});
//createMap({ coords: { latitude: 0, longitude: 0 }});

// var coordrange = {
// 	lat: 180 / (Math.pow(2, 17) * 512),
// 	lng: 360 / (Math.pow(2, 17) * 512)
// };

// function coord2px(lat, lng) {
// 	if (previousLocation.lat === null || previousLocation.lng === null) return;
// 	var deltalat = lat - previousLocation.lat;
// 	var deltalng = lng - previousLocation.lng;
// 	var deltax = deltalng / coordrange.lng;
// 	var deltaz = deltalat / coordrange.lat;
// 	return {
// 		xd: deltax,
// 		zd: deltaz
// 	};
// }

var renderer, scene, camera;
function init(map) {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(0, 1000, 0);
	camera.rotation.x = -Math.PI / 2;

	var g = new THREE.PlaneGeometry(500, 500, 50, 50);
	g.rotateX(-Math.PI/2);
	var texture = new THREE.Texture(map);
	var m = new THREE.MeshBasicMaterial({ map: texture });
	var mesh = new THREE.Mesh(g, m);
	scene.add(mesh);
	texture.needsUpdate = true;

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xffffff);
	document.body.appendChild(renderer.domElement);

	animate();

	// navigator.geolocation.watchPosition(function (position) {
	// 	if (previousLocation.lat === null || previousLocation.lng === null) return;
	// 	var newlocation = coord2px(position.coords.latitude, position.coords.longitude);
	// 	camera.position.x += xd;
	// 	camera.position.z += zd;
	// 	previousLocation.lat = position.coords.latitude;
	// 	previousLocation.lng = position.coords.longitude;
	// }, function (err) {
	// 	console.log(err.message);
	// }, {
	// 	enableHighAccuracy: true,
	// 	maximumAge: 0
	// });
}

function animate() {
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}
