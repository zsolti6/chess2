import './App.css';
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom';
import { ChessList } from './ChessList';
import { ChessSingle } from './ChessSingle';
import { ChessCreate } from './ChessCreate';
import { ChessMod } from './ChessMod';
import { ChessDel } from './ChessDel';

export const App = () => {
  return (
    <div className='App'>
      <Router>
        <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <NavLink className="nav-link" to="/">Sakk</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className="nav-link" to="/create-chess">Új sakkozó</NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<ChessList/>}/>
          <Route path="/chess/:chessId" element={<ChessSingle/>}/>
          <Route path="/create-chess" element={<ChessCreate/>}/>
          <Route path="/mod-chess/:chessId" element={<ChessMod/>}/>
          <Route path="/del-chess/:chessId" element={<ChessDel/>}/>
        </Routes>
      </Router>
    </div>
  );
}
/******  f29c06c2-c6a2-40a1-be25-685cb14e8cfd  *******/