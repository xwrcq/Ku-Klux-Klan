const modal = document.querySelector(".modal-container");
const modalBtn = document.querySelector("#modalLogin");
const loginBtn = document.querySelector("#login");
const regBtn = document.querySelector("#create");
const loginForm = document.querySelector("#form-login");
const regForm = document.querySelector("#form-reg");
const divErr = document.querySelectorAll(".form-modal__error");
const nickErr = document.querySelector("#err-nick");
const emailErr = document.querySelector("#err-email");
const passErr = document.querySelector("#err-pass");

window.addEventListener("click", (e) => {
  let target = e.target;
  if (!target) return;

  if (target.id == "modalLogin") {
    if (localStorage.hasOwnProperty("user")) {
      userLogout();
    } else {
      modal.style.top = `${window.scrollY}px`;
      modal.classList.add("open");

      disableScroll();
    }

    return;
  }

  if (modal.classList.contains("open")) {
    const modalContent = document.querySelector(".modal-container__content");
    if (
      !modalContent.contains(target) ||
      target.classList.contains("modal-container__cross")
    )
      closeModal();
  }
});

window.onload = checkUser;

regBtn.onclick = logToggle;
loginBtn.onclick = logToggle;

loginForm.querySelectorAll("input").forEach(input => input.onfocus = clearError);
regForm.querySelectorAll("input").forEach(input => input.onfocus = clearError);

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const [email, password] = loginForm.querySelectorAll("input");

  fetch("http://localhost:3000/login", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res);
    })
    .then((data) => {
      userLogin(data);
    })
    .catch((res) => {
      console.log(res.status, res.statusText);

      res.json().then((json) => {
        showError(json);
      });
    });
});

regForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const [nickname, email, password] = regForm.querySelectorAll("input");

  const res = formValidation(nickname.value, email.value, password.value);
  if(!res) return;

  fetch("http://localhost:3000/register", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      nickname: nickname.value,
      email: email.value,
      password: password.value,
      isAdmin: false,
    }),
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res);
  })
  .then((data) => {
    userLogin(data);
  })
  .catch((res) => {
    console.log(res.status, res.statusText);

    res.json().then((json) => {
      showError(json);
    });
  });
});

function closeModal() {
  modal.classList.remove("open");
  enableScroll();
  clearInputs();
  clearError();
}

function logToggle() {
  loginForm.classList.toggle("open");
  regForm.classList.toggle("open");
  clearInputs();
  clearError();
}

function disableScroll() {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  (scrollLeft = window.pageXOffset || document.documentElement.scrollLeft),
    (window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    });
}

function enableScroll() {
  window.onscroll = function () {};
}

function clearInputs() {
  modal.querySelectorAll("input").forEach((input) => (input.value = ""));
}

function userLogin(data) {
  localStorage.setItem("user", JSON.stringify(data));

  closeModal();
  modalBtn.textContent = "Logout";
}

function userLogout() {
  localStorage.removeItem("user");

  modalBtn.textContent = "Login";
}

function showError(msg) {
  divErr.forEach(div => {
    div.classList.add("active");
    div.textContent = msg;
  });
}

function clearError() {
  divErr.forEach(div => {
    div.classList.remove("active");
    div.textContent = "";
  });

  emailErr.classList.remove("active");
  emailErr.textContent = "";
  nickErr.classList.remove("active");
  nickErr.textContent = "";
  passErr.classList.remove("active");
  passErr.textContent = "";
}

function formValidation(nick, em, pass) {
  if (nick === '' || nick== null || nick.length < 3) {
    nickErr.classList.add("active");
    nickErr.textContent = "nickname is invalid";

    return false;
  }

  if(!validMail(em) || em.length < 4) {
    emailErr.classList.add("active");
    emailErr.textContent = "email is invalid";

    return false;
  }

  if(pass === '' || pass== null || pass.length < 6) {
    passErr.classList.add("active");
    passErr.textContent = "nickname is invalid";

    return false;
  }

  return true;
}

function validMail(mail)
{
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(mail);
}

function checkUser() {
  if(localStorage.getItem("user")) modalBtn.textContent = "Logout";
}