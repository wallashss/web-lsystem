"use strict";


function kochCurve()
{
    let koch = {};

    koch.axiom = "-&F";

    koch.rules = {};
    koch.rules["F"] = createRule("F+F-F-F+F");

    koch.angle = 90;
    koch.baseColor = "#FF0000";
    koch.iterations = 3;
    return koch;
}


function sierpinski()
{
    let sierpinski = {};

    sierpinski.axiom = "---&&&A";

    sierpinski.rules = {};
    sierpinski.rules["A"] = createRule("B--A--B");
    sierpinski.rules["B"] = createRule("A++B++A");

    sierpinski.angle = 30;
    sierpinski.forceFoward = true;
    sierpinski.iterations = 4;
    sierpinski.baseColor = "#FF00FF";
    return sierpinski;
}


function dragonCurve()
{
    let dragon = {};

    dragon.axiom = "/X";

    dragon.rules = {};
    dragon.rules["X"] = createRule("X+Y+");
    dragon.rules["Y"] = createRule("-X-Y");

    dragon.angle = 90;
    dragon.forceFoward = true;
    dragon.iterations = 8;
    dragon.baseColor = "#FF0000";
    return dragon;
}

function fractalPlant2d()
{
    let plant = {};

    plant.axiom = "///X";

    plant.rules = {};
    plant.rules["X"] = createRule("F-[[X]+X]+F[+FX]-X");
    plant.rules["F"] = createRule("FF");

    plant.angle = 25;
    plant.forceFoward = false;
    plant.baseColor = "#00FF00";
    plant.iterations = 4;

    return plant;
}

function fractalPlant3d()
{
    let plant = {};

    plant.axiom = "////F";

    plant.rules = {};
    plant.rules["F"] = createRule("F[&+F]F[-/F][-/F][&F]");

    plant.angle = 28;
    plant.forceFoward = false;
    plant.baseColor = "#00FF00";
    plant.iterations = 3;

    return plant;
}

function hilbertCurve3d()
{
    let hilbert = {};

    hilbert.axiom = "B";

    hilbert.rules = {};

    hilbert.rules["A"] = createRule("B-F+CFC+F-D&F^D-F+&&CFC+F+B//");
    hilbert.rules["B"] = createRule("A&F^CFB^F^D^^-F-D^|F^B|FC^F^A//");
    hilbert.rules["C"] = createRule("|D^|F^B-F+C^F^A&&FA&F^C+F+B^F^D//");
    hilbert.rules["D"] = createRule("|CFB-F+B|FA&F^A&&FB-F+B|FC//");

    hilbert.angle = 90;
    hilbert.forceFoward = false;
    hilbert.baseColor = "#0000FF";
    hilbert.iterations = 3;
    return hilbert;
}

