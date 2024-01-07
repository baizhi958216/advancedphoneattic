document.querySelector(".users").addEventListener("click", () => {
  selected = 0;
  changePanel("用户管理", "http://localhost:8000/authapi/all", (res) => {
    for (const key in res.data.data.query) {
      panelitems.innerHTML += `
            <div class="item">
              <div class="item-name">${res.data.data.query[key].userName}</div>
              <div id="${res.data.data.query[key]._id}" class="modify"></div>
                <div class="delete"></div>
            </div>`;
    }
    getelement();
  });
});
document.querySelector(".devices").addEventListener("click", () => {
  selected = 1;
  changePanel("机型管理", "http://localhost:8000/deviceapi/", (res) => {
    for (const key in res.data.data.query) {
      panelitems.innerHTML += `
          <div class="item">
            <div id="${key}" class="item-name">${res.data.data.query[key].deviceName}</div>
            <div id="${key}" class="modify"></div>
            <div id="${key}" class="delete"></div>
          </div>`;
    }
    getelement();
  });
});
document.querySelector(".bbs").addEventListener("click", () => {
  selected = 2;
  changePanel("论坛管理", "http://localhost:8000/bbs/", (res) => {
    for (const key in res.data.data) {
      panelitems.innerHTML += `
          <div class="item">
            <div class="item-name">${res.data.data[key].topic}</div>
            <div id="${res.data.data[key]._id}" class="modify"></div>
            <div class="delete"></div>
          </div>`;
    }
    getelement();
  });
});
/* 


用户退出


 */
document.querySelector(".exit").addEventListener("click", () => {
  axios
    .patch(`http://localhost:8000/onlineusers/${userName.innerText}`, {
      username: userName.innerText,
    })
    .then(() => {
      userName.innerHTML = "请登录";
      document.querySelector(".exit").style.display = "none";
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
  document.querySelector(".managepanel").style.display = "none";
});
// 主页
document.querySelector(".wanjige").addEventListener("click", () => {
  location.href = "http://localhost:8000/public/index.html";
});
let changePanel = (panelname, host, res) => {
  panelheader.innerText = panelname;
  panelitems.innerHTML = "";
  axios
    .get(host)
    .then(res)
    .catch((err) => {
      console.log(err);
    });
};

/* 


添加数据


 */

dbadd.addEventListener("click", () => {
  switch (selected) {
    case 0:
      {
        document.querySelector(".shadow").style.display = "block";
        document.querySelector(".shadow").addEventListener("click", () => {
          document.querySelector(".modifywindow").style.display = "none";
          document.querySelector(".shadow").style.display = "none";
        });
        document.querySelector(".modifywindow").style.display = "block";
        document.querySelector(".modifywindow").innerHTML = usermodify;
        document
          .querySelector(".mag-submit")
          .addEventListener("click", async () => {
            let ipta = document.querySelectorAll("input"),
              username = ipta[0].value,
              userpassword = ipta[1].value,
              usertype = ipta[2].value;
            const result = await axios({
              method: "post",
              url: "http://localhost:8000/authapi/sign",
              data: {
                userName: username,
                userPassword: userpassword,
                userType: usertype.toUpperCase(),
              },
            });
            if (result.data.status === "success") {
              document.querySelector(".modifywindow").style.display = "none";
              document.querySelector(".shadow").style.display = "none";
              panelitems.innerHTML = "";
              changePanel(
                "用户管理",
                "http://localhost:8000/authapi/all",
                (res) => {
                  for (const key in res.data.data.query) {
                    panelitems.innerHTML += `
                        <div class="item">
                            <div class="item-name">${res.data.data.query[key].userName}</div>
                            <div id="${res.data.data.query[key]._id}" class="modify"></div>
                            <div class="delete"></div>
                        </div>`;
                  }
                  getelement();
                }
              );
            } else {
              console.log(result.data);
            }
          });
      }

      break;

    case 1:
      {
        console.log("设备");
      }

      break;
    case 2:
      {
        document.querySelector(".shadow").style.display = "block";
        document.querySelector(".shadow").addEventListener("click", () => {
          document.querySelector(".modifywindow").style.display = "none";
          document.querySelector(".shadow").style.display = "none";
        });
        document.querySelector(".modifywindow").style.display = "block";
        document.querySelector(".modifywindow").innerHTML = topicmodify;
        document
          .querySelector(".mag-submit")
          .addEventListener("click", () => {});
        document
          .querySelector(".mag-submit")
          .addEventListener("click", async () => {
            let ipta = document.querySelectorAll("input"),
              topic = ipta[0].value,
              content = ipta[1].value,
              reply = ipta[2].value,
              read = ipta[3].value,
              postDate = ipta[4].value;
            const result = await axios({
              method: "post",
              url: "http://localhost:8000/bbs/",
              data: {
                topic: topic,
                content: content,
                reply: reply,
                read: read,
                postDate: postDate,
              },
            });
            if (result.data.status === "success") {
              document.querySelector(".modifywindow").style.display = "none";
              document.querySelector(".shadow").style.display = "none";
              panelitems.innerHTML = "";
              changePanel("论坛管理", "http://localhost:8000/bbs/", (res) => {
                for (const key in res.data.data) {
                  panelitems.innerHTML += `
                      <div class="item">
                        <div class="item-name">${res.data.data[key].topic}</div>
                        <div id="${res.data.data.query[key]._id}" class="modify"></div>
                        <div class="delete"></div>
                      </div>`;
                }
                getelement();
              });
            } else {
              console.log(result.data);
            }
          });
      }
      break;

    default:
      break;
  }
});
