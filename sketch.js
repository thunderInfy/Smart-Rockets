let life = 200;
let lifeTime = 0;
let generation = 1, genPara;
let mypop;
let rocketImage;
let target;

function preload(){
	rocketImage = loadImage("rocketImage.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	mypop = new population(width/2, height, 100);
	target = createVector(width/2, height*0.1);
	genPara = createP();
}

function draw() {
	background(50);
	noStroke();
	fill(255,255,0);
	ellipse(target.x, target.y, 32, 32);
	mypop.show();
	mypop.update();
	genPara.html("Generation : " + generation);
	lifeTime++;
	if(lifeTime>=life){
		mypop = new population(width/2, height, 100);
		generation++;
		lifeTime = 0;
	}
}

class population{

	constructor(x,y,size){
		this.size = size;
		this.members = [];
		for(let i=0; i<size; i++){
			this.members.push(new rocket(x,y));
		}
	}
	show(){
		for(let i=0; i<this.members.length; i++){
			this.members[i].show();
		}
	}
	update(){
		for(let i=0; i<this.members.length; i++){
			this.members[i].update();
		}
	}
	evaluate(){
		let fitnessValues = [];
		for(let i=0; i<this.members.length; i++){
			fitnessValues.push(this.members[i].fitness());	
		}	
	}
}

class dna{

	constructor(){
		this.genes = [];
		for(let i=0; i<life; i++){
			this.genes.push(p5.Vector.random2D());
		}
	}

}

class rocket{

	constructor(x, y){
		this.pos = createVector(x,y);
		this.speed = createVector();
		this.acc = createVector();
		this.DNA = new dna();
	}

	applyForce(){
		this.acc = this.DNA.genes[lifeTime].copy();
	}

	update(){
		this.speed.add(this.acc);
		this.pos.add(this.speed);
		this.acc.mult(0);
		this.applyForce();
	}

	show(){
		push();
		rectMode(CENTER);
		translate(this.pos.x, this.pos.y);
		rotate(this.speed.heading()+PI/2);
		image(rocketImage,0,0,rocketImage.width*0.09,rocketImage.height*0.09);
		pop();
	}
	fitness(){
		return (1/dist(target.x, target.y, this.pos.x, this.pos.y));
	}
}