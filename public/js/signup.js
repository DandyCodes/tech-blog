async function signup() {
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      return document.location.replace("/dashboard");
    }

    alert("Sign up failed.");
  }
}

function pressEnter(event) {
  if (event.keyCode === 13) {
    signup();
  }
}

document.querySelector("#signup-button").onclick = signup;
document.querySelector("#password").onkeyup = pressEnter;
