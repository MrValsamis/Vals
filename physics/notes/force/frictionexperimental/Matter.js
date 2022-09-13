// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

// create two boxes and a ground
var boxA = Bodies.rectangle(385, 200, 100, 100);
var boxB = Bodies.rectangle(150, 50, 80, 80);
var boxC = Bodies.rectangle(250, 50, 80, 80);
var boxD = Bodies.rectangle(450, 50, 80, 80);
var boxE = Bodies.rectangle(550, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, boxC, boxD, boxE, ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);