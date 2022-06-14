const login = document.querySelector(".login"),
  sign = document.querySelector(".sign"),
  title = document.querySelector(".submit").children[0],
  button = document.querySelector(".submit").children[3];
let submitstatus = 0;
login.addEventListener("click", () => {
  document.querySelector("#login").style.display = "flex";
  title.innerText = "登录";
  button.innerText = "马上登录";
  submitstatus = 0;
});
sign.addEventListener("click", () => {
  document.querySelector("#login").style.display = "flex";
  title.innerText = "注册";
  button.innerText = "马上注册";
  submitstatus = 1;
});
document.querySelector(".maincontent").addEventListener("click", () => {
  document.querySelector("#login").style.display = "none";
});
button.addEventListener("click", () => {
  let user = document.querySelector(".submit").children[1].value,
    password = document.querySelector(".submit").children[2].value;
  switch (submitstatus) {
    case 0:
      {
        axios
          .post("http://localhost:8000/authapi/login", {
            userName: user,
            userPassword: password,
          })
          .then((res) => {
            let loginstatus = res.data.status * 1;
            if (loginstatus === 1 || loginstatus === 2) {
              axios
                .post("http://localhost:8000/onlineusers/", {
                  userName: user,
                  userStatus: "Online",
                })
                .catch((err) => {
                  console.log(err);
                });
              location.href = res.data.data.href;
            } else {
              console.log("Wait?!!What happened???", res);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      break;

    case 1:
      {
        axios
          .post("http://localhost:8000/authapi/sign", {
            userName: user,
            userPassword: password,
            userType: "USER",
          })
          .then((res) => {
            console.log(res);
            location.reload();
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }
      break;

    default:
      break;
  }
});
