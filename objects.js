"use strict"

function generateSphereMesh(resolution)
{
    let sphere = {vertices: [], 
                   elements: []};

    const radius = 0.5;

    let X1,Y1,X2,Y2,Z1,Z2;
    let w1,w2,h1, h2, R1, R2;
    let u1, u2, v1, v2;

    let stacks = resolution;
    let slices = resolution;

    // sphere.vertices.reserve(stacks*slices*12);
    // sphere.vertices.reserve(stacks*slices*6);

    let nextId = 0;

    let halfSlices = slices*0.5;

    for(let w = 0; w < stacks; w++)
    {
        for(let h = (-halfSlices); h < halfSlices; h++)
        {

            w1 = (w/ slices) * 2 * Math.PI;
            w2 = ((w+1)/ slices) * 2 * Math.PI;

            u1 = w / stacks;
            u2 = (w+1) / stacks;

            v1 = ((h)/ halfSlices + 1) * 0.5;
            v2 = ((h +1 ) / halfSlices + 1) * 0.5;

            h1 = (h/ stacks) * Math.PI;
            h2 = ((h+1) / stacks)* Math.PI;

            X1 = Math.sin(w1);
            Y1 = Math.cos(w1);
            X2 = Math.sin(w2);
            Y2 = Math.cos(w2);

            R1 = Math.cos(h1);
            R2 = Math.cos(h2);

            Z1 = radius * Math.sin(h1);
            Z2 = radius * Math.sin(h2);

            
            sphere.vertices.push(R1*X1*radius, Z1, R1*Y1*radius); // vertex
            sphere.vertices.push(R1*X1*radius, Z1, R1*Y1*radius); // normal
            sphere.vertices.push(u1, v1); // texcoord
            sphere.elements.push(nextId);
            nextId++; // 0

            sphere.vertices.push(R1*X2*radius, Z1, R1*Y2*radius); // vertex
            sphere.vertices.push(R1*X2*radius, Z1, R1*Y2*radius); // normal
            sphere.vertices.push(u2, v1); // texcoord
            sphere.elements.push(nextId);
            nextId++; // 1

            sphere.vertices.push(R2*X2*radius, Z2, R2*Y2*radius); // vertex
            sphere.vertices.push(R2*X2*radius, Z2, R2*Y2*radius); // normal
            sphere.vertices.push(u2, v2); // texcoord
            sphere.elements.push(nextId);
            nextId++; // 2

            sphere.elements.push(sphere.elements[sphere.elements.length-3]);
            sphere.elements.push(sphere.elements[sphere.elements.length-2]);

            sphere.vertices.push(R2*X1*radius, Z2, R2*Y1*radius); // vertex
            sphere.vertices.push(R2*X1*radius, Z2, R2*Y1*radius); // normal
            sphere.vertices.push(u1, v2); // texcoord
            sphere.elements.push(nextId);
            nextId++; 
        }

    }

    return sphere;
}
function createCylinder(resolution, height, radius)
{
    height = height ? height : 1.0;
    radius = radius ? radius : 0.5;

    let cylinder = {vertices: [], elements: []};
    let angleDelta = 2 * Math.PI / resolution;

    cylinder.vertices.push(0, 0,      0, 0, 0,  -1,  0, 0); // bottom center vertex
    cylinder.vertices.push(0, 0, height, 0,  0,  1,  0, 0); // top center vertex

    for(let i = 0 ; i < resolution+1; i++)
    {
        let baseVertex = {x: Math.cos(angleDelta*i)*0.5, y: Math.sin(angleDelta*i)*0.5};

        cylinder.vertices.push(baseVertex.x*radius, baseVertex.y*radius, 0,       0,  0,  -1, 0, 0);
        cylinder.vertices.push(baseVertex.x*radius, baseVertex.y*radius, height,  0,  0,   1, 0, 0);
        cylinder.vertices.push(baseVertex.x*radius, baseVertex.y*radius, 0,       baseVertex.x, baseVertex.y, 0,  0, 0);
        cylinder.vertices.push(baseVertex.x*radius, baseVertex.y*radius, height,  baseVertex.x, baseVertex.y, 0,  0, 0);
    }

    for(let i=1; i < resolution+1; i++)
    {
        let lastIndex = 2 + (i-1) * 4;
        let currIndex = 2 + i * 4;
        // Bottom cap
        cylinder.elements.push(currIndex);
        cylinder.elements.push(lastIndex);
        cylinder.elements.push(0);

        // Body
        cylinder.elements.push(currIndex+2);
        cylinder.elements.push(currIndex+3);
        cylinder.elements.push(lastIndex+2);

        cylinder.elements.push(lastIndex+2);
        cylinder.elements.push(lastIndex+3);
        cylinder.elements.push(currIndex+3);

        cylinder.elements.push(currIndex+1);
        cylinder.elements.push(lastIndex+1);
        cylinder.elements.push(1);
    }

    return cylinder;
}
