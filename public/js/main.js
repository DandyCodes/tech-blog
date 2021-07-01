const navLoginButton = document.querySelector("#nav-login-button");
if (navLoginButton) navLoginButton.onclick = navLoginPressed;

const logoutButton = document.querySelector("#nav-logout-button");
if (logoutButton) logoutButton.onclick = navLogoutPressed;

async function navLoginPressed() {
  document.location.replace("/login");
}

async function navLogoutPressed() {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Log out failed.");
  }
}
