import React, { useState, useEffect } from 'react';
import Sketch from "react-p5"
import { Modal } from "react-bootstrap";
import './GameP5.css';


const GameP5: React.FC = () =>
{
	const [score, setScore] = useState(0);
	const [opscore, setOpScore] = useState(0);
	let my_canva:any;
	const canvaWidth : number = 1000;
	const canvaHeight : number = 500;
	//Ball
	const ball = 
	{
		r:20,
		x : canvaWidth / 2,
		y : canvaHeight / 2,
		vx :5,
		vy :5,
		draw : function draw(p:any):void
		{
			p.ellipse(this.x, this.y, this.r, this.r);
		},
		update : function update(p:any):void
		{
			const rightPadlleTop = p.mouseY;
			const rightPadlleBottom = p.mouseY + (rightPadlle.height);
			const leftPaddleTop = leftPadlle.y;
			const leftPaddleButtom = leftPadlle.y + leftPadlle.height;
			this.y += this.vy;
			this.x += this.vx;
			if (this.y - (this.r / 2) < 0 || (this.y + (this.r / 2)) > canvaHeight)
				this.vy *= -1;
			if ((this.x + (this.r / 2) > rightPadlle.x) && (this.y > rightPadlleTop) && (this.y < rightPadlleBottom))
				this.vx *= -1;
			console.log(`leftPaddleButtom = ${leftPaddleButtom} leftPaddleTop = ${leftPaddleTop} diff = ${leftPaddleTop - leftPaddleButtom}`);
			console.log((this.x - (this.r / 2) == leftPadlle.x), (this.y > leftPaddleTop), (this.y < leftPaddleButtom));
			if ((this.x - (this.r / 2) == leftPadlle.x) && (this.y > leftPaddleTop) && (this.y < leftPaddleButtom))
				this.vx *= -1;
			if (this.x - (this.r / 2) < 0)
			{
				handleScore();
				this.x = canvaWidth / 2;
				this.y  = canvaHeight / 2;
			}
			if (this.x + (this.r / 2) > canvaWidth)
			{
				handleOpScore();
				this.x = canvaWidth / 2;
				this.y = canvaHeight / 2;
			}
		}

	}
	const leftPadlle =
	{
		width:10,
		height:150,
		x:0,
		y:Math.random() * (canvaHeight - 150),
		draw : function draw(p:any)
		{
			p.fill(255);
			p.rect(this.x, this.y, this.width, this.height);
		}
	}
	//RightPadle
	const rightPadlle = 
	{
		x :canvaWidth - 10,
		width:10,
		height:150,
		draw : function draw(p:any)
		{
			p.rect(this.x, p.mouseY, this.width, this.height);
		}
	}
	const setup = (p : any, canvasParentRef : Element) =>
	{
		my_canva = p.createCanvas(canvaWidth, canvaHeight).parent(canvasParentRef);
	};
	let updateInterval = 60;
	const draw = (p:any) =>
	{
		if (typeof draw.frameCount === 'undefined')
			draw.frameCount = 0;
		if (draw.frameCount % updateInterval === 0)
			leftPadlle.y = Math.random() * (canvaHeight - leftPadlle.height);
		draw.frameCount++
		p.background(0);
		ball.update(p);
		ball.draw(p);
		leftPadlle.draw(p);
		rightPadlle.draw(p);
	}
	let a: number;
	let b: number;
	a = b = 0;
	function handleOpScore()
	{
		setOpScore(b => b + 1);
	}
	function handleScore()
	{
		setScore(a => a + 1);
	}
	const [show, setShow] = useState(true);
	const handleClose = () => 
	{
		setShow(false);
		resetGame();
	}
	const resetGame = () =>
	{
		console.log("Game should be reseted from here");
		ball.vx = canvaWidth / 2;
		ball.vy = canvaHeight / 2;
		setScore(0);
		setOpScore(0);
	}
	useEffect(() => {
		if (score === 2 || opscore === 2)
		{
			setShow(true);
			StopBall();
		}
	}, [score, opscore]);
	const StopBall = ():void =>
	{
		ball.vx = 0;
		ball.vy = 0;
	}
	return (
		<>
			<h1>{opscore} - {score}</h1>
			{score == 2 || opscore == 2
				?
				<Modal show={show} backdrop="static" keyboard={false} animation={true}>
					<Modal.Dialog >
						<Modal.Body>
							{score == 2 ? 
								<>
									<Modal.Title className="modalbodywin">You win</Modal.Title>
								</>:""}
							{opscore == 2 ? 
								<>
									<Modal.Title className="modalbodylose">you lose</Modal.Title>
								</>:""}
						</Modal.Body>
							<Modal.Footer>
								<button onClick={handleClose}>Close</button>
							</Modal.Footer>
					</Modal.Dialog>
				</Modal> : ""
			}
			<Sketch setup={setup} draw={draw}/>
		</>
	);
}
export default GameP5;
