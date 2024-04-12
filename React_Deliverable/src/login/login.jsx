import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main className='container-fluid text-center'>
      <div>
        {authState !== AuthState.Unknown && <h1>Welcome to Lezicuts</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}


function Login2() {
    const prayerNameEl = document.querySelector('.aname');
    prayerNameEl.textContent = localStorage.getItem('username') ?? 'Mystery person';
    const hairEl = document.getElementById('hair');
    hairEl.placeholder = localStorage.getItem('hairLength');
  return (
    <main>
      <div className="row">
        <div className="col-sm">
        <h3 className="aname"></h3>
        <label for="hair">Hair length: </label>
        <input className="hair" type="text" id="hair" placeholder="length" />
        </div>
        <div className="col-sm">
    <h3>Login</h3>
            <li>
                <label for="text">Username: </label>
                <input className="name" type="text" id="user" name="varText" placeholder="Username" />
                <label for="text">Password: </label>
                <input type="password" className="password" placeholder="Password"></input>
            </li>
        </div>
    </div>
    <div>
    <button className="btn btn-dark" onClick="create()">Create Account</button>
    <button className="btn btn-dark" onClick="login()">Login</button>
    <button className="btn btn-dark" onClick="logout()">Log Out</button>
    </div>
    <hr />
    </main>
  );
}

async function login() {
    const hairLengthEl = document.querySelector('.hair');
    const nameEl = document.querySelector('.name');
    const passwordEl = document.querySelector('.password');
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers:
        {'Content-Type': 'text/plain'},
        body: JSON.stringify({ userName: nameEl.value, password: passwordEl.value, hairLength: hairLengthEl.value }),
    });
    if(!response.ok) {
        localStorage.setItem('username', "Mystery Person");
        const body = await response.json();
        window.alert(body.msg);
    } else {
        localStorage.setItem("username", nameEl.value);
        localStorage.setItem("hairLength", hairLengthEl.value);    
    }
    window.location.href = "index.html";
}
async function create() {
    const hairLengthEl = document.querySelector('.hair');
    const passwordEl = document.querySelector('.password');
    const nameEl = document.querySelector('.name');
    const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers:
        {'Content-Type': 'text/plain'},
        body: JSON.stringify({ userName: nameEl.value, password: passwordEl.value, hairLength: hairLengthEl.value }),
    });
    if(!response.ok) {
        const body = await response.json();
        window.alert(body.msg);
    }
    localStorage.setItem("username", nameEl.value);
    localStorage.setItem("hairLength", hairLengthEl.value);
    window.location.href = "index.html";
}
function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('notif');
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => (window.location.href = '/'));
  }