async function fetchCuts() {
    let cuts = [];
  try {
    // Get the latest high scores from the service
    const response = await fetch('/api/cuts');
    scores = await response.json();

    // Save the scores in case we go offline in the future
    localStorage.setItem('cuts', JSON.stringify(cuts));
  } catch {
    // If there was an error then just use the last saved scores
    const cutsText = localStorage.getItem('cuts');
    if (cutsText) {
      cuts = JSON.parse(cutsText);
    }
  }
  //TODO: IMPLEMENT displayCuts()
  displayCuts(cuts);
}

function saveItem() {
    // const imgElement = document.getElementById("file");
    // imgElement.addEventListener(onchange, handleImageUpload);

    const nameEl = document.getElementById("text1");
    const sideEl = document.getElementById("text2");
    const topEl = document.getElementById("text3");
    Name = "hairName";
    Side = "hairSide";
    Top = "hairTop";
    fields(Name, nameEl);
    fields(Side, sideEl);
    fields(Top, topEl);
    createItem();
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
    don = localStorage.getItem("element");
    deen = don + tempCont.innerHTML;
    localStorage.setItem("element", deen);

    try {
        const response = await fetch('/api/cuts', {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(localStorage.getItem("element")),
        });
  
        const scores = await response.json();
        localStorage.setItem("element", JSON.stringify("element"));
      } catch {
        window.alert("Newest haircuts couldn't be loaded");
      }
}


function fields(nem, el){
    localStorage.setItem(nem, el.value);
}

// function handleImageUpload(event) {
//     window.alert("entered");
//     const file = event.target.files[0];
//     //if(!file) return;

//     const reader = new FileReader();
//     reader.onload = function(e) {
//         const base64Image = e.target.result;
//         localStorage.setItem("image", base64Image);
//     };
//     reader.readAsDataURL(file);
//     window.alert(localStorage.getItem("image"));
// }