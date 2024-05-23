const main = document.querySelector(".main");

const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  init();

  main.addEventListener("click", (e) => {
    e.preventDefault();
    let target = e.target;
    if (!target) return;

    if(target.id == "delete-btn") {
      const email = target.dataset.email;
      deleteUser(email);
    }
  });
}

function deleteUser(email) {
  if(user.email == email) return;
  fetch("http://localhost:3000/user", {
    method: "delete",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      email: email,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res);
    })
    .then((data) => {
      main.removeChild(document.querySelector(".section-participants"));
      init();
    })
    .catch((res) => {
      console.log(res.status, res.statusText);

      res.json().then((json) => {
        showError(json);
      });
    });
}

function init() {
  let users = [];
  fetch("http://localhost:3000/users")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    })
    .then((data) => {
      users = data;

      let usersHTML = "";

      user.isAdmin
        ? users.length > 0 &&
          users.forEach((u) => {
            usersHTML += `
            <div class="main__table-item">
              <div>${u.nickname}</div>
              <div>${u.email}</div>
              <div><button class="main__table-btn" id="delete-btn" data-email="${u.email}">delete user</button></div>
            </div>`;
          })
        : users.length > 0 &&
          users.forEach((u) => {
            usersHTML += `
            <div class="main__table-item">
              <div>${u.nickname}</div>
              <div>${u.email}</div>
            </div>`;
          });

      const content = `
        <section class="main__section section-participants">
          <h2 class="main__section-title">Current participants</h2>
          <h3 class="main__section-title" style="text-decoration: underline;">${user.nickname}</h3>
          <div class="main__table">
            ${usersHTML}
          </div>
        </section>
      `;

      main.insertAdjacentHTML("beforeend", content);
    })
    .catch((res) => {
      console.log(res.status, res.statusText);

      res.json().then((json) => {
        showError(json);
      });
    });
}
