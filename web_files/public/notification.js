const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
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