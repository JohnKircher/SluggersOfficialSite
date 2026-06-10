function updateManagerNav() {
  const loggedInTeam = localStorage.getItem("sluggersTeam");

  const loginNavItem = document.getElementById("loginNavItem");
  const managerNavItem = document.getElementById("managerNavItem");

  if (!loginNavItem || !managerNavItem) return;

  if (loggedInTeam) {
    loginNavItem.innerHTML = `<a href="#" id="logoutNavBtn">🚪 Logout (${loggedInTeam})</a>`;
    managerNavItem.style.display = "list-item";

    document.getElementById("logoutNavBtn").addEventListener("click", e => {
      e.preventDefault();
      localStorage.removeItem("sluggersTeam");
      localStorage.removeItem("activeMatchId");
      window.location.reload();
    });
  } else {
    loginNavItem.innerHTML = `<a href="team-login.html" onclick="localStorage.setItem('returnAfterLogin', window.location.href)">🔐 Login</a>`;
    managerNavItem.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", updateManagerNav);