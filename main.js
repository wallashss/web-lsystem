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

    // function(eulerAngle, stepLength, forceFoward, wordGenerator)
    let matrices = turtle.interpret(angle, 1.0, forceFoward, (callback)=>
    {
        deriveLsytem(axiom, iterations, rules, (w) =>
        {
            callback(w);
        });
    });


    let cylinder = createCylinder(16);
    let vertices = new Array(cylinder.vertices.length);
    let vertCount = cylinder.vertices.length / 8;
    color = hexToRgb(color);

    renderer.clearBatches();
    scene.reset();
    for(let i = 0; i < matrices.length; i++)
    {
        let m = matrices[i];
        for(let v =0; v < vertCount; v++)
        {
            let idx = v * 8;
            let vertex = vec3.create();
            let normal = vec3.create();
            vec3.transformMat4(vertex, vec3.fromValues(cylinder.vertices[idx], cylinder.vertices[idx+1], cylinder.vertices[idx+2]), m);
            let m3x3 =mat3.create(); 
            mat3.fromMat4(m3x3, m);
            vec3.transformMat3(normal, vec3.fromValues(cylinder.vertices[idx+3], cylinder.vertices[idx+4], cylinder.vertices[idx+5]), m3x3);
            
            vertices[idx] = vertex[0];
            vertices[idx+1] = vertex[1];
            vertices[idx+2] = vertex[2];
            vertices[idx+3] = normal[0];
            vertices[idx+4] = normal[1];
            vertices[idx+5] = normal[2];
            vertices[idx+6] = cylinder.vertices[idx+6];
            vertices[idx+7] = cylinder.vertices[idx+7];
        }
        // console.log(vertices);
        scene.addMesh(vertices, 8);
        renderer.addObject(vertices, cylinder.elements, vec4.fromValues(color.r/255, color.g/255, color.b/255, 1.0));
    }
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
    loadSample("kochcurve");
    draw();
}
window.addEventListener("load", function()
{
	initApp();
});
