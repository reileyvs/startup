import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Browse } from './browse/browse';
import { Create } from './create/create';
import { AuthState } from './login/authState';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onmessage = async (message) => {
      const thing = await message.data;
      console.log(thing);
      const msg = JSON.parse(message.data);
        //Hank
        displayMsg(msg.userName);
    };


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
        <button className="btn btn-light" type="button" onClick={() => notifs()}>Notifications</button>
      </div>
    </nav>
  </header>

    <Routes>
        <Route path='/' element={<Login
        userName={userName}
        authState={authState}
        onAuthChange={(userName, authState) => {
          setAuthState(authState);
          setUserName(userName);}} />} exact />
        <Route path='/browse' element={<Browse />} />
        <Route path='/create' element={<Create />} />
        <Route path='*' element={<NotFound />} />
    </Routes>

  <footer>
    <span className="text-reset">Vincent Reiley
    <br />
    <a href="https://github.com/reileyvs/startup">GitHub</a>
    </span>
  </footer>
  </div>
  </BrowserRouter>
  );
}

function NotFound() {
    return <main className='container-fluid text-center'>404: Woah, you found a page that doesn't exist</main>;
}



    async function displayMsg(name) {
      const chatText = { notif: `${name}` + " submitted a haircut!\n" };
      var notifications = JSON.parse(localStorage.getItem("notif")) ?? [];
      notifications.push(chatText);
      if (notifications.length > 5) {
        notifications.reverse();
        notifications.length = 5;
      }
      notifications.forEach(element => {
        console.log(element.notif);
      });
      localStorage.setItem("notif", JSON.stringify(notifications));
    }

  function notifs() {
    const cont = JSON.parse(localStorage.getItem("notif"));
    var stringy = "";
    if(cont) {
    cont.forEach(element => {
      stringy += element.notif;
    })
  }
  if (stringy) {
    window.alert(stringy);
  } else {
    window.alert("No notifications");
  }
  }