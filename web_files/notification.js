setInterval(() => {
    const int = Math.floor(Math.random() * 100);
    const name = "User" + int;
    const chatText = name + " submitted a haircut!";
    localStorage.setItem("notif", chatText);
  }, 10000);