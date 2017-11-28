
window.addEventListener("load", function()
{
	 initRenderer();
});

let renderer = null;
let scene = null;

let camera = null;

let goToCenter = function()	
{
	let size =  scene.getSize();
	let center = scene.getCenter();

	let maxSize = size[0] > size[1] ? size[0] : size[1];
	maxSize = size[2] > maxSize ? size[2] : maxSize;
	maxSize = maxSize > 10 ? maxSize : 10;

	
	let eye = vec3.fromValues(center[0], center[1], center[2] - maxSize);
	let up = vec3.fromValues(0.0, 1.0, 0.0);

	// camera.setVelocity(Math.min(Math.min(size[0], size[1]), size[2]));
	camera.setCamera(eye, center, up);
	camera.setVelocity(Math.min(Math.min(size[0], size[1]), size[2]));
}

function initRenderer()
{
	let viewController = document.getElementById("view_controller");
	
	// Init renderer	
	let canvas = document.getElementById("canvas");

	let vertexScript = document.getElementById("vertex-shader");
	let instanceVertexScript = document.getElementById("instance-vertex-shader");
	let fragmentScript = document.getElementById("fragment-shader");
	
	let vertexSource = vertexScript.childNodes[0].nodeValue;
	let fragmentSource = fragmentScript.childNodes[0].nodeValue;
	let instanceVertexSource = instanceVertexScript.childNodes[0].nodeValue;
	
	renderer = new Renderer();
	renderer.setBackgroundColor(0.5, 0.5, 0.6, 1);
	renderer.load(canvas, vertexSource, fragmentSource);

	renderer.loadShaders(instanceVertexSource, fragmentSource, Renderer.INSTACE_PROGRAM);

	// Initialize cameracontroller
	camera = new CameraController();
	camera.installCamera(canvas, function(viewMatrix, dt)
	{
		renderer.setViewMatrix(viewMatrix);
		renderer.draw(dt);
	});	
	
	scene = new SceneController();
	
	
	// goToCenter();
	window.addEventListener("keypress", function(e)
	{
		if(e.key === "E" || e.key === "e")
		{
			camera.setExamineMode();
		}
		else if(e.key === "F" || e.key === "f")
		{
			camera.setFlyMode();
		}
		else if(e.key === "R" || e.key === "r")
		{
			goToCenter();
			camera.setExamineMode();
		}
	});
}
