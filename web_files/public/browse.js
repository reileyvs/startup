const { ExplainVerbosity } = require("mongodb");

async function fetchCuts() {
  try {
    const response = await fetch('/api/get-cuts');
    var cuts = await response.json();
    debugger;
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
    // const imgElement = document.getElementById("file");
    // imgElement.addEventListener(onchange, handleImageUpload);
    const response = await fetch('/api/checkCredents');
    if(!response.ok) {
      var me = response.json();
      window.alert("Please log in first");
      return;
    }
    const imgEl = document.getElementById("file");
    const nameEl = document.getElementById("text1");
    const sideEl = document.getElementById("text2");
    const topEl = document.getElementById("text3");
    Imag = "image";
    Name = "hairName";
    Side = "hairSide";
    Top = "hairTop";
    fields(Imag, imgEl);
    fields(Name, nameEl);
    fields(Side, sideEl);
    fields(Top, topEl);
    await createItem();
    window.location.href = "create.html";
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
    don = await fetchCuts();
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
}

function fields(nem, el){
    localStorage.setItem(nem, el.value);
}