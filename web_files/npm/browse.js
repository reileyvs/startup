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

function createItem() {
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
    localStorage.setItem("element", tempCont.innerHTML);
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