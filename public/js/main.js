const navLoginButton = document.querySelector("#nav-login-button");
if (navLoginButton) navLoginButton.onclick = navLoginPressed;

const logoutButton = document.querySelector("#nav-logout-button");
if (logoutButton) logoutButton.onclick = navLogoutPressed;

document.querySelector(".navbar-burger").onclick = toggleBurger;

function navLoginPressed() {
  document.location.replace("/login");
}

async function navLogoutPressed() {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    return document.location.replace("/");
  }
  alert("Log out failed.");
}

function toggleBurger() {
  document.querySelector(".navbar-burger").classList.toggle("is-active");
  document.querySelector(".navbar-menu").classList.toggle("is-active");
}
