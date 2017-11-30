"use strict"

let samples = {kochcurve: kochCurve(), 
                 plant2d: fractalPlant2d(),
             dragoncurve: dragonCurve(),
              sierpinski: sierpinski(), 
                 plant3d: fractalPlant3d(),
          hilbertcurve3d: hilbertCurve3d()};

let iterationsInput = null;
let angleInput = null;
let axiomInput = null;
let isFowardCheckbox = null;
let lsystemEditor = null;    
let baseColorInput = null;          

let turtle = new Turtle();
let cylinder = null;

function loadSample(sampleName)
{
    let s = samples[sampleName];
    axiomInput.value = s.axiom;
    angleInput.value = s.angle;
    baseColorInput.value = s.baseColor;
    iterationsInput.value = parseFloat(s.iterations);
    isFowardCheckbox.checked = s.forceFoward;
    let rules = "";
    for(let k in s.rules)
    {
        if(s.rules.hasOwnProperty(k))
        {
            rules += k + " -> "+ s.rules[k].join("") + "\n";
        }
    }
    lsystemEditor.value = rules;
}

function draw()
{
    let rules = parseLsystem(lsystemEditor.value);

    let iterations = iterationsInput.value;
    let axiom = axiomInput.value;
    let angle = parseFloat(angleInput.value);
    let forceFoward = isFowardCheckbox.checked;
    let color = baseColorInput.value;

    let matrices = turtle.interpret(angle, 1.0, forceFoward, (callback)=>
    {
        deriveLsytem(axiom, iterations, rules, (w) =>
        {
            callback(w);
        });
    });

    color = hexToRgb(color);

    renderer.clearBatches();
    scene.reset();

    let colors = new Array(matrices.length);
    let defaultColor = vec4.fromValues(color.r/255, color.g/255, color.b/255, 1.0);
    
    for(let i = 0; i < matrices.length; i++)
    {
        let m = matrices[i];
        
        let center = {x: m[4*3], y: m[4*3+1], z: m[4*3+2]};
        colors[i] = defaultColor;
        scene.expand(center.x, center.y, center.z);
    }
    renderer.addInstances(cylinder, colors, matrices);
    // renderer.addObjectInstances(cylinder.vertices, cylinder.elements, colors, matrices);
    goToCenter();

}

function initApp()
{
    let sampleSelector = document.getElementById("sample-select");
    sampleSelector.addEventListener("change", (e) =>
    {
        loadSample(sampleSelector.value);
        draw();
    });

    iterationsInput = document.getElementById("iterations-input");
    angleInput = document.getElementById("angle-input");
    axiomInput = document.getElementById("axiom-input");
    isFowardCheckbox = document.getElementById("forward-var-checkbox");
    baseColorInput = document.getElementById("base-color-input");
    lsystemEditor = document.getElementById("lsystem-editor");

    let drawButton =  document.getElementById("draw-button");
    drawButton.addEventListener("click", (e)=>
    {
        draw(); 
    });
    
    sampleSelector.value = "kochcurve";
    let cylinderMesh = createCylinder(16);
    cylinder = renderer.uploadMesh(cylinderMesh.vertices, cylinderMesh.elements);
    
    loadSample("kochcurve");
    draw();
}
window.addEventListener("load", function()
{
	initApp();
});
