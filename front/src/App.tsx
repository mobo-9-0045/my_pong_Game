
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// import PongGame from './pages/GamePage';
import GameP5 from './pages/GameP5';


function App() {
  return (
    <>
      <BrowserRouter>
        <Link to="GamePage">
          <Button variant="success">Play</Button>
        </Link>
        <Routes >
          <Route path="/GamePage" element={<GameP5 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
