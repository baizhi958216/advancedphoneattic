const userName = document.querySelector(".username");
const userExit = document.querySelector(".exit");
const wanjige = document.querySelector(".wanjige");
const items = document.querySelector(".items");
const getUserLogin = async () => {
  await axios
    .get("http://localhost:8000/authapi/")
    .then((res) => {
      userdata = res.data.userName;
      if (userdata) {
        userName.innerHTML = userdata;
      } else {
        userName.innerHTML = "请登录";
        document.querySelector(".exit").style.display = "none";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
getUserLogin();
let getTopic = async () => {
  await axios
    .get("http://localhost:8000/bbs/")
    .then((res) => {
      allTopics = res.data.data;
      for (const topic in allTopics) {
        items.innerHTML += `
        <div class="item item-data-${topic}">
            <div class="item-topic">${allTopics[topic].topic}</div>
            <div class="reply">${allTopics[topic].reply}</div>
            <div class="read">${allTopics[topic].read}</div>
            <div class="alive">${allTopics[topic].postDate}</div>
          </div>
        `;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
getTopic();
/* // 测试添加帖子
let addTopic = async () => {
  await axios
    .post("http://localhost:8000/bbs/", {
      topic: "如何开启 FBE 加密？",
      content: "不会",
      reply: "20",
      read: "10",
      postDate: String(Date.now()),
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
addTopic(); */

userExit.addEventListener("click", () => {
  axios
    .patch(`http://localhost:8000/onlineusers/${userName.innerText}`, {
      username: userName.innerText,
    })
    .then((res) => {
      console.log(res.data.status);
      userName.innerHTML = "请登录";
      document.querySelector(".exit").style.display = "none";
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
});

wanjige.addEventListener("click", () => {
  location.href = "http://localhost:8000/public/index.html";
});
