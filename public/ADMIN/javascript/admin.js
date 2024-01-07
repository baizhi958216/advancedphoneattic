const userName = document.querySelector(".username");
const panelheader = document.querySelector(".panelheader");
const panelitems = document.querySelector(".panelitems");
const dbadd = document.querySelector(".add");
let selected = 0;
/* 


切换编辑面板
遍历.modify/.delete绑定update/delete


 */
let getelement = () => {
  let dmodify = document.querySelectorAll(".modify"),
    ddelete = document.querySelectorAll(".delete");
  dmodify.forEach((ele) => {
    ele.addEventListener("click", async () => {
      document.querySelector(".shadow").style.display = "block";
      document.querySelector(".shadow").addEventListener("click", () => {
        document.querySelector(".modifywindow").style.display = "none";
        document.querySelector(".shadow").style.display = "none";
      });
      document.querySelector(".modifywindow").style.display = "block";
      switch (selected) {
        // 用户编辑
        case 0:
          {
            document.querySelector(".modifywindow").innerHTML = usermodify;
            let result = await axios({
              method: "get",
              url: `http://localhost:8000/authapi/byid/${ele.id}`,
            });
            let ipt = document.querySelectorAll("input");
            ipt[0].value = result.data.data.query.userName;
            ipt[1].value = result.data.data.query.userPassword;
            ipt[2].value = result.data.data.query.userType;
            /* 


            提交事件


             */
            document
              .querySelector(".mag-submit")
              .addEventListener("click", async () => {
                result = await axios.patch(
                  `http://localhost:8000/authapi/${ele.id}`,
                  {
                    userName: ipt[0].value,
                    userPassword: ipt[1].value,
                    userType: ipt[2].value.toUpperCase(),
                  }
                );
                if (result.data.status === "success") {
                  document.querySelector(".modifywindow").style.display =
                    "none";
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
        // 机型编辑
        case 1:
          document.querySelector(".modifywindow").innerHTML = usermodify;
          break;
        // 帖子编辑
        case 2:
          {
            document.querySelector(".modifywindow").innerHTML = topicmodify;
            let result = await axios({
              method: "get",
              url: `http://localhost:8000/bbs/${ele.id}`,
            });
            let ipt = document.querySelectorAll("input");
            ipt[0].value = result.data.data.query.topic;
            ipt[1].value = result.data.data.query.content;
            ipt[2].value = result.data.data.query.reply;
            ipt[3].value = result.data.data.query.read;
            ipt[4].value = result.data.data.query.postDate;
            /* 


            提交事件


             */
            document
              .querySelector(".mag-submit")
              .addEventListener("click", async () => {
                result = await axios.patch(
                  `http://localhost:8000/bbs/${ele.id}`,
                  {
                    topic: ipt[0].value,
                    content: ipt[1].value,
                    reply: ipt[2].value,
                    read: ipt[3].value,
                    postDate: ipt[4].value,
                  }
                );
                if (result.data.status === "success") {
                  document.querySelector(".modifywindow").style.display =
                    "none";
                  document.querySelector(".shadow").style.display = "none";
                  panelitems.innerHTML = "";
                  changePanel(
                    "论坛管理",
                    "http://localhost:8000/bbs/",
                    (res) => {
                      for (const key in res.data.data) {
                        panelitems.innerHTML += `
                      <div class="item">
                        <div class="item-name">${res.data.data[key].topic}</div>
                        <div id="${res.data.data[key]._id}" class="modify"></div>
                        <div class="delete"></div>
                      </div>`;
                      }
                      getelement();
                    }
                  );
                } else {
                  console.log(result);
                }
              });
          }
          break;
        default:
          break;
      }
    });
  });
  ddelete.forEach((ele) => {
    ele.addEventListener("click", async () => {
      // 删除数据
      switch (selected) {
        case 0:
          {
            let result = await axios({
              method: "delete",
              url: "http://localhost:8000/authapi/",
              data: {
                userName: ele.parentNode.childNodes[1].innerText,
              },
            });
            if (result.status === 204) {
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
              console.log(result.status);
            }
          }
          break;
        case 1:
          break;
        case 2:
          {
            let result = await axios({
              method: "delete",
              url: "http://localhost:8000/bbs/",
              data: {
                topic: ele.parentNode.childNodes[1].innerText,
              },
            });
            if (result.status === 204) {
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
              console.log(result);
            }
          }
          break;
        default:
          break;
      }
    });
  });
};

window.onload = () => {
  axios
    .get("http://localhost:8000/authapi/")
    .then((e) => {
      let user = e.data.userName;
      if (user) {
        userName.innerHTML = user;
      } else {
        userName.innerHTML = "请登录";
        document.querySelector(".exit").style.display = "none";
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
};
