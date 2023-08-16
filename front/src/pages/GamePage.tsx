import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "../css/canva.css"

const GamePage: React.FC = () => {
    const [score, setScore] = useState(0);
    const [opscore, setOpscore] = useState(0);
    const [stopGame, setStopGame] = useState(false);
    const [counter, setCounter] = React.useState(3);
    React.useEffect(() =>
    {
        if (counter > 0)
            setTimeout(() => setCounter(counter - 1), 1000);
        if (counter <= 0)
        {
            ft_canva();
        }
    }, [counter]);
  const ft_canva = () =>
  {
    const canvas = document.getElementById("canva") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx != null)
    {
        canvas.width = 1000;
        canvas.height = 500;
        console.log(canvas.width);
        let animationFrameId: number;

        const paddleWidth = canvas.clientWidth * 0.01;
        const paddleHeight = canvas.clientHeight * 0.3;
        const leftPaddle =
        {
            x: 0,
            y: canvas.height / 1 - paddleHeight / 2,
            color: "white",
            draw()
            {
                ctx.beginPath();
                ctx.rect(this.x, this.y, paddleWidth, paddleHeight);
                ctx.fillStyle = this.color;
                ctx.fill();
            },
        };
        const rightPaddle =
        {
            x: canvas.width - paddleWidth,
            y: canvas.height / 2 - paddleHeight / 2,
            color: "white",
            draw()
            {
                ctx.beginPath();
                ctx.rect(this.x, this.y, paddleWidth, paddleHeight);
                ctx.fillStyle = this.color;
                ctx.fill();
            },
        };
        const ball =
        {
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: 5,
            vy: 5,
            radius: 10,
            color: "white",
            draw()
            {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = this.color;
                ctx.fill();
            },
            update()
            {
                this.x += this.vx;
                this.y += this.vy;

                if (this.y + this.vy > canvas.height - this.radius || this.y + this.vy < this.radius)
                {
                    this.vy = -this.vy * Math.cos(1);
                }
                if (this.x - this.radius < leftPaddle.x + paddleWidth && this.y > leftPaddle.y && this.y < leftPaddle.y + paddleHeight)
                {
                    this.vx = -this.vx;
                }
                if (this.x + this.radius > rightPaddle.x && this.y > rightPaddle.y && this.y < rightPaddle.y + paddleHeight)
                {
                    this.vx = -this.vx;
                }
                if (this.x == canvas.width || this.vx == canvas.width)
                {
                    OponentScoreHndling();
                    this.x = canvas.width / 2;
                    this.y = canvas.height / 2
                }
                if (this.x == 0 || this.vx == 0)
                {
                    MyScoreHandling();
                    this.x = canvas.width / 2;
                    this.y = canvas.height / 2
                }
                if (stopGame == true)
                    window.cancelAnimationFrame(animationFrameId);
            },
        };

        const draw = () =>
        // canvas.height = 500;
        {
            ctx.fillStyle = "#33003A";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            leftPaddle.draw();
            rightPaddle.draw();
            ball.draw();
            ball.update();
            animationFrameId = window.requestAnimationFrame(draw);
        };

        canvas.addEventListener("mousemove", (event) =>
        {
            const mouseY = event.clientY - canvas.getBoundingClientRect().top;
            if (mouseY > 0 && mouseY < canvas.height - paddleHeight)
            {
                rightPaddle.y = mouseY;
            }
        });
        canvas.addEventListener("mousemove", (event) =>
        {
            const mouseY = event.clientY - canvas.getBoundingClientRect().top;
            if (mouseY > 0 && mouseY < canvas.height - paddleHeight)
            {
                leftPaddle.y = mouseY;
            }
        });
        draw();
        // window.addEventListener("resize", resizeCanva);
    }
};
    let my_Score:number = 1;
    let OpScore:number = 1;
    const MyScoreHandling = () =>
    {
        setScore(my_Score++);
    }
    const OponentScoreHndling = () =>
    {
        setOpscore(OpScore++);
    }
    const [show, setShow] = useState(true);
    const handleClose = () => 
    {
        setShow(false);
        setOpscore(0);
        setScore(0);
        setStopGame(true);
    }
    return (
        <div className="game">
            <h1>{opscore} - {score}</h1>
            {counter > 0 ?<h2>Game start in: {counter}</h2> :""}
            <canvas id="canva"></canvas>
            {score == 5 || opscore == 5
                ?
                <Modal show={show} backdrop="static" keyboard={false} animation={true}>
                    <Modal.Dialog >
                        <Modal.Body>
                            {score >= 5 ? <Modal.Title className="modalbodywin">You win</Modal.Title>:""}
                            {opscore >= 5 ? <Modal.Title className="modalbodylose">you lose</Modal.Title>:""}
                        </Modal.Body>
                            <Modal.Footer>
                                <button onClick={handleClose}>Close</button>
                            </Modal.Footer>
                    </Modal.Dialog>
                </Modal> : ""
            }
        </div>
  );
};

export default GamePage;