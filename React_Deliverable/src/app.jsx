import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Browse } from './browse/browse';
import { Create } from './create/create';

export default function App() {
  return (
    <BrowserRouter>
  <div className='body'>
    <header className="sticky-top">
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="">
            <h1>Lezicuts</h1>
        </NavLink>
        <NavLink className="btn btn-light" type="button" to=''>Home</NavLink>
        <NavLink className="btn btn-light" type="button" to='browse'>Cuts</NavLink>
        <NavLink className="btn btn-light" type="button" to='create'>Create</NavLink>
        <button className="btn btn-light" type="button" onclick="notifs()">Notifications</button>
      </div>
    </nav>
  </header>

    <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/browse' element={<Browse />} />
        <Route path='/create' element={<Create />} />
        <Route path='*' element={<NotFound />} />
    </Routes>

  <footer>
    <span className="text-reset">Vincent Reiley</span>
    <br />
    <a href="https://github.com/reileyvs/startup">GitHub</a>
  </footer>
  </div>
  </BrowserRouter>
  );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Woah, you found a page that doesn't exist</main>;
}