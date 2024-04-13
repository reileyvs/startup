import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
socket.onmessage = async (message) => {
    const thing = await message.data;
    console.log(thing);
    const msg = JSON.parse(message.data);
      //Hank
      displayMsg(msg.userName);
  };

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

export function Create() {
  return (
    <main>
        <h3 className="text-center">Submit your own haircut!</h3>
        <div className="row">
            <div className="col-sm">
                <ul>   
                    <li>
                        <label>Upload image link: </label>
                        <input type="text" id="file" name="varFile" ></input>
                    </li>
                    <li>
                        <label>Haircut Name: </label>
                        <input type="text" id="text1" name="varText" ></input>
                    </li>
                </ul>
            </div>
            <div className="col-sm">
                <ul>
                    <li>
                        <label>Hair side length: </label>
                        <input type="text" id="text2" name="varText" ></input>
                    </li>
                    <li>
                        <label>Hair top length: </label>
                        <input type="text" name="varText" id="text3" ></input>
                    </li>
                </ul>
            </div> 
        </div>
        <div>
        <button type="button" className="btn btn-dark" onClick={() => saveItem(socket)}>Submit</button>
        </div>
        <hr />
    </main>
  );
}

async function fetchCuts() {
    try {
      const response = await fetch('/api/get-cuts');
      var cuts = await response.json();
      var arr = [];
      cuts.forEach((obj) => {
        arr.push(obj.haircut);
    });
      var test = JSON.stringify(arr);
      localStorage.setItem("element", JSON.stringify(arr));
      return cuts;
    } catch {
      return localStorage.getItem("element");
    }
  }
  
  async function saveItem() {
      const response = await fetch('/api/checkCredents');
      if(!response.ok) {
        window.alert("Please log in first");
        return;
      }
      const imgEl = document.getElementById("file");
      const nameEl = document.getElementById("text1");
      const sideEl = document.getElementById("text2");
      const topEl = document.getElementById("text3");
      const Imag = "image";
      const Name = "hairName";
      const Side = "hairSide";
      const Top = "hairTop";
      fields(Imag, imgEl);
      fields(Name, nameEl);
      fields(Side, sideEl);
      fields(Top, topEl);
      await createItem(socket);
      window.location.href = "create";
  }
  
  async function createItem() {
      const cardItem = document.createElement("div");
      cardItem.className = "col-sm";
      const card = document.createElement("div");
      card.className = "card";
      card.style = "width: 18rem";
      const image = document.createElement("img");
      image.src = localStorage.getItem("image") ?? "https://coolmenshair.com/wp-content/uploads/haircuts-for-balding-men-1.jpg";
      image.className = "card-img-top";
      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
      const header = document.createElement("h3");
      header.textContent = localStorage.getItem("hairName");
      const deets = document.createElement("div");
      deets.innerHTML = "<b>Details:</b>";
      const side = document.createElement("div");
      side.textContent = "Side length: " + localStorage.getItem("hairSide");
      const top = document.createElement("div");
      top.textContent = "Top length: " + localStorage.getItem("hairTop");
      const row = document.getElementById("haircuts");
      cardItem.appendChild(card);
      card.appendChild(image);
      card.appendChild(cardBody);
      cardBody.appendChild(header);
      cardBody.appendChild(deets);
      cardBody.appendChild(side);
      cardBody.appendChild(top);
      const tempCont = document.createElement("div");
      tempCont.appendChild(cardItem);
      var don = await fetchCuts();
      if(don.length > 1 && don[0] === "--No haircuts to display") {
          don.splice(0, 1);
          don = "";
      }
      //console.log(tempCont.innerHTML);
      try {
          const response = await fetch('/api/post-cut', {
            method: 'POST',
            headers: 
            {'Content-Type': 'text/plain'},
            body: tempCont.innerHTML,
          });
          const cuts = await response.json();
          var arr = [];
          cuts.forEach((obj) => {
          arr.push(obj.haircut);
    });
          var test = JSON.stringify(arr);
          localStorage.setItem("element", JSON.stringify(arr));
        } catch (ex) {
          debugger;
          window.alert("Newest haircuts couldn't be loaded");
        }
          const msg = {
            userName : localStorage.getItem('userName'),
          }
          await socket.send(JSON.stringify(msg));
          return arr;
  }
  
  function fields(nem, el){
      localStorage.setItem(nem, el.value);
  }