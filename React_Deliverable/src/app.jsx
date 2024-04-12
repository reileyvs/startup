import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
  <div className='body'>
    <header className="sticky-top">
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a classNaem="navbar-brand" href="https://getbootstrap.com/">
            <h1>Lezicuts</h1>
        </a>
        <a className="btn btn-light" type="button" href="index.html">Home</a>
        <a className="btn btn-light" type="button" href="browse.html">Cuts</a>
        <a className="btn btn-light" type="button" href="create.html">Create</a>
        <button className="btn btn-light" type="button" onclick="notifs()">Notifications</button>
      </div>
    </nav>
  </header>

  <main>App components go here</main>

  <footer>
    <span className="text-reset">Vincent Reiley</span>
    <br />
    <a href="https://github.com/reileyvs/startup">GitHub</a>
  </footer>
  </div>
  );
}