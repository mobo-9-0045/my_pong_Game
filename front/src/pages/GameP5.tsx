import React, { useState, useEffect } from 'react';
import Sketch from "react-p5"
import { Modal } from "react-bootstrap";
import './GameP5.css';


const GameP5: React.FC = () =>
{
	const [score, setScore] = useState(0);
	const [opscore, setOpScore] = useState(0);
	const aspectRatio = 16 / 9;
  const maxCanvasWidth = window.innerWidth * 0.8;
  const maxCanvasHeight = window.innerHeight * 0.8;
	let canvaWidth : number;
	let canvaHeight : number;
	let my_canva:any;
	if (maxCanvasWidth / aspectRatio <= maxCanvasHeight)
	{
		canvaWidth = maxCanvasWidth;
		canvaHeight = canvaWidth / aspectRatio;
	}
	else
	{
		canvaHeight = maxCanvasHeight;
		canvaWidth = canvaHeight * aspectRatio;
	}
	const canvaX = (window.innerWidth - canvaWidth) / 2;
	const canvaY = (window.innerHeight - canvaHeight) / 2;
	//Ball
	const ball = 
	{
		r:0.02 * canvaWidth,
		x : canvaWidth / 2,
		y : canvaHeight / 2,
		vx :7,
		vy :2,
		draw : function draw(p:any):void
		{
			p.ellipse(this.x, this.y, this.r, this.r);
		},
		update : function update(p:any):void
		{
			const rightPadlleTop = rightPadlle.y;
			const rightPadlleBottom = rightPadlle.y + (rightPadlle.height);
			const leftPaddleTop = leftPadlle.y;
			const leftPaddleButtom = leftPadlle.y + leftPadlle.height;
			this.y += this.vy;
			this.x += this.vx;
			if (this.y - (this.r / 2) < 0 || (this.y + (this.r / 2)) > canvaHeight)
				this.vy *= -1;
			if ((this.x + (this.r / 2) >= rightPadlle.x) && (this.y > rightPadlleTop) && (this.y < rightPadlleBottom))
				this.vx *= -1;
			if ((this.x - (this.r / 2) <= leftPadlle.x + leftPadlle.width) && (this.y > leftPaddleTop) && (this.y < leftPaddleButtom))
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
		width:canvaWidth * 0.01,
		height:canvaHeight * 0.3,
		x:0,
		y:Math.random() * (canvaHeight - 150),
		draw : function draw(p:any)
		{
			p.fill(255);
			p.rect(this.x, this.y, this.width, this.height);
		}
	}

	//RightPadle
	const rightPadlleWidth = canvaWidth * 0.01;
	const rightPadlle = 
	{
		x :canvaWidth - rightPadlleWidth,
		width:canvaWidth * 0.01,
		height:canvaHeight * 0.3,
		y:canvaHeight / 2,
		draw : function draw(p:any)
		{
			p.rect(this.x, this.y, this.width, this.height);
		}
	}

	const setup = (p : any, canvasParentRef : Element) =>
	{
		my_canva = p.createCanvas(canvaWidth, canvaHeight).parent(canvasParentRef);
		my_canva.position(canvaX, canvaY);
		my_canva.parent(canvasParentRef);
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
		document.addEventListener('keydown', detectKey, true);
		return () =>
		{
			document.addEventListener('keydown', detectKey, true);
		};
	}, [score, opscore]);
	const detectKey = (e:KeyboardEvent) =>
	{
		if (e.key == "ArrowUp")
		{
			console.log(`${e.key} Pressed`);
			rightPadlle.y = rightPadlle.y - 35;
		}
		if (e.key == "ArrowDown")
		{
			console.log(`${e.key} Pressed`);
			rightPadlle.y = rightPadlle.y + 35;
		}
	}
	const StopBall = ():void =>
	{
		ball.vx = 0;
		ball.vy = 0;
	}
	return (
		<div className="game-container">
			<div className="score-container">
      	<h1>{opscore} - {score}</h1>
    	</div>
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
		</div>
	);
}
export default GameP5;
