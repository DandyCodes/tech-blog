async function login() {
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to log in.");
    }
  }
}

function pressEnter(event) {
  if (event.keyCode === 13) {
    login();
  }
}

document.querySelector("#login-button").onclick = login;
document.querySelector("#password").onkeyup = pressEnter;
