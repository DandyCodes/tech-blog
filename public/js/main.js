const logoutButton = document.querySelector("#logout-button");
if (logoutButton) {
  logoutButton.onclick = logout;
}

async function logout() {
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
