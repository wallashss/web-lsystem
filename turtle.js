"use strict";

function Turtle()
{
    const MAX_MODULES = 1e5;
    this.interpret = function(eulerAngle, stepLength, forceFoward, wordGenerator)
    {
        let turtleStack = [];

        let outMatrices = [];
        let turtlePosition = vec3.fromValues(0, 0, 0);
        let size = 0;

        let turtleState = mat4.create();
        mat4.lookAt(turtleState, vec3.fromValues(0, 0, 0),  // eye
                                 vec3.fromValues(0, 0, 1), // center 
                                 vec3.fromValues(0, 1, 0)); // up
    
        let angle = eulerAngle * Math.PI / 180.0;


        // Convenient initial direction
        mat4.rotate(turtleState, turtleState,  Math.PI*0.5, vec3.fromValues(1.0, 0.0, 0.0));
        mat4.rotate(turtleState, turtleState,  Math.PI, vec3.fromValues(1.0, 0.0, 0.0));
        // glm::rotate(turtleState,glm::radians(180.0f),glm::vec3(1.0f,0.0f,0.0f));
    
        // Function to foward turtle
        let forward = () => 
        {
            let head = vec3.fromValues(0, 0, stepLength);
            turtleState = mat4.translate(turtleState, turtleState, head);
            let nextPosition = vec3.fromValues(turtleState[3*4+0],turtleState[3*4+1],turtleState[3*4+2]);
            turtlePosition = nextPosition;
         };

        let isOnMaxLength = false;
        
        wordGenerator((word) =>
        {
            if(isOnMaxLength)
            {
                return;
            }
            if(word === "+")
            {
                // turtleState = glm::rotate(turtleState,angle,glm::vec3(1.0f,0,0));
                // turtleState = glm::rotate(turtleState, angle,glm::vec3(1.0f,0,0));
                mat4.rotate(turtleState, turtleState,  angle, vec3.fromValues(1.0, 0, 0));
            }
            else if(word ==="-")
            {
                // turtleState = glm::rotate(turtleState,-angle,glm::vec3(1.0f,0,0));
                mat4.rotate(turtleState, turtleState, -angle, vec3.fromValues(1.0, 0, 0));
            }
            else if(word === "&")
            {
                // turtleState = glm::rotate(turtleState,angle,glm::vec3(0,1.0f,0));
                mat4.rotate(turtleState, turtleState, angle, vec3.fromValues(0, 1.0, 0));
            }
            else if(word === "^")
            {
                // turtleState = glm::rotate(turtleState,-angle,glm::vec3(0,1.0f,0));
                mat4.rotate(turtleState, turtleState, -angle, vec3.fromValues(0, 1.0, 0));
            }
            else if(word ==="\\")
            {
                // turtleState = glm::rotate(turtleState,angle,glm::vec3(0,0,1.0f));
                mat4.rotate(turtleState, turtleState, angle, vec3.fromValues(0, 0, 1.0));
            }
            else if(word ==="/")
            {
                // turtleState = glm::rotate(turtleState,-angle,glm::vec3(0,0,1.0f));
                mat4.rotate(turtleState, turtleState, -angle, vec3.fromValues(0, 0, 1.0));
            }
            else if(word === "|")
            {
                mat4.rotate(turtleState, turtleState, Math.PI, vec3.fromValues(1.0, 0, 0.0));
            }
            else if(word === "[")
            {
                turtleStack.push(mat4.clone(turtleState));
            }
            else if(word === "]")
            {
                turtleState = turtleStack[turtleStack.length-1];
                turtleStack.splice(turtleStack.length-1);
                let nextPosition = vec3.fromValues(turtleState[3*4+0], turtleState[3*4+1],turtleState[3*4+2]);
                turtlePosition = nextPosition;
            }
            else if(word === "f")
            {
                forward();
            }
            else if(word === "F" || forceFoward)
            {
                if(size == MAX_MODULES)
                {
                    isOnMaxLength = true;
                    return;
                }
    
                outMatrices.push(turtleState);

                turtleState = mat4.clone(turtleState);
    
                forward();
                size++;
            }
    
        });
    
        if(isOnMaxLength)
        {
            let err = "Max objects generated!";
            throw err;
        }
        return outMatrices;
    }

    
}

