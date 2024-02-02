function toggleProfileOptions() {
  const profileOptions = document.getElementById("profileOptions");
  profileOptions.style.display =
    profileOptions.style.display === "none" ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const userOptions = document.getElementById("userOptions");

  const userData = localStorage.getItem("user");

  if (userData) {
    const user = JSON.parse(userData);
    const userProfileHTML = `
            <div class="profile-container">
                <button class="profile-icon-btn" onclick="toggleProfileOptions()">
                    <i class="fa fa-user-circle"></i>
                    <span id="profileText">My Profile</span>
                </button>
                <div class="profile-options" id="profileOptions" style="display: none;">
                    <p>${user.email}</p>
                    <a href="#" onclick="toggleDropdown()">My Account</a>
                    <ul class="dropdown" id="accountDropdown" style="display: none;">
                        <li><a href="#">My Watchlist</a></li>
                        <li><a href="#">My Subscription</a></li>
                        <li><a href="#">My Rentals</a></li>
                        <li><a href="#">My Transactions</a></li>
                        <li><a href="#" onclick="logout()">Logout</a></li>
                    </ul>
                </div>
            </div>
        `;
    userOptions.innerHTML = userProfileHTML;
  } else {
    const defaultOptionsHTML = `
            <button class="login-btn">
                <a href="./signin.html" style="text-decoration: none; color: inherit">Login</a>
            </button>
            <button class="register-btn">
                <a href="./register.html" style="text-decoration: none; color: inherit">Register</a>
            </button>
            <button class="subscribe-btn">Subscribe</button>
        `;
    userOptions.innerHTML = defaultOptionsHTML;
  }
});

function toggleDropdown() {
  const accountDropdown = document.getElementById("accountDropdown");
  accountDropdown.style.display =
    accountDropdown.style.display === "none" ? "block" : "none";
}

function logout() {
  // Clear user data from localStorage
  localStorage.removeItem("user");
  // Redirect to the home page or login page
  window.location.href = "./index.html";
}
