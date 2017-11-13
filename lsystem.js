"use strict"

function createRule(str)
{
    let production = [];
    for(let i=0; i < str.length;i++)
    {
        production.push(str[i]);
    }
    return production;
}


function isReservedChar(chara)
{
    if(chara ===  "+" || chara === "-" || chara === "/" || chara === "\\" || 
      chara === "&" || chara === "^" || chara === "|" || chara === "[" || chara === "]")
    {
        return true;
    }
    return false;
}

function parseLsystem(str)
{
    const regex = /\s*([a-zA-Z])\s*\->\s*([a-zA-Z+\-|\\[\]&\/^]*)\s*/;

    let lines = str.split("\n");

    let lsystem = {};
    for(let i =0 ; i < lines.length; i++)
    {
        let line = lines[i];

        if(line && line.length > 0)
        {
            let result= regex.exec(line);
            
            if(result)
            {
                lsystem[result[1]] = result[2];
            }
        }
        
    }
    return lsystem;
}

function recursiveTraverse(n, level, tokken, callback, rules)
{
    if(level == n)
    {
        callback(tokken);
    }
    else
    {
        if(!isReservedChar(tokken))
        {
            if(rules.hasOwnProperty(tokken))
            {
                let production = rules[tokken];
                for(let i = 0; i < production.length; i++)
                {
                    let p = production[i];
                    recursiveTraverse(n,level+1, p,callback, rules);
                }
            }
            else
            {
                 recursiveTraverse(n,level+1,tokken,callback, rules);
            }
        }
        else
        {
            recursiveTraverse(n,level+1,tokken,callback, rules);
        }
    }
}
function deriveLsytem(axiom, iterations, rules, callback)
{
    for(let i=0; i <axiom.length; i++)
    {
        recursiveTraverse(iterations, 0, axiom[i], callback, rules);
    }
}