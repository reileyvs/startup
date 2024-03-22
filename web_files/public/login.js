

async function login() {
    const hairLengthEl = document.querySelector('.hair');
    const nameEl = document.querySelector('.name');
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers:
        {'Content-Type': 'text/plain'},
        body: JSON.stringify({ userName: nameEl, hairLength: hairLengthEl.value }),
    });
    if(!response.ok) {
        const body = await response.json();
        window.alert(body.msg);
    }
    localStorage.setItem("username", nameEl.value);
    localStorage.setItem("hairLength", hairLengthEl.value);
    window.location.href = "index.html";
}
async function create() {
    const hairLengthEl = document.querySelector('.hair');
    const nameEl = document.querySelector('.name');
    const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers:
        {'Content-Type': 'text/plain'},
        body: JSON.stringify({ userName: nameEl, hairLength: hairLengthEl.value }),
    });
    if(!response.ok) {
        const body = await response.json();
        window.alert(body.msg);
    }
    localStorage.setItem("username", nameEl.value);
    localStorage.setItem("hairLength", hairLengthEl.value);
    window.location.href = "index.html";
}