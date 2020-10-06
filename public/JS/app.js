import { Chatroom } from "./chat.js";
import { ChatUI } from "./ui.js";

//DOM
let btnUpdate = document.querySelector("#updateBtn");
let usernameInput = document.querySelector("#usernameForm");
let rooms = document.querySelector("nav");
let btnSend = document.querySelector("#sendBtn");
let messageInput = document.querySelector("#messageForm");
let btn = document.querySelectorAll(".btn");
let colorBtn = document.querySelector("#colorButton");
let content = document.querySelector(".content");
let startDate = document.querySelector("input[name=startDate]");
let endDate = document.querySelector("input[name=endDate]");
let dateBtn = document.querySelector("#dateBtn");
let btnOptions = document.querySelector("#optionsBtn");
let divOptions = document.querySelector("#optionsDiv ");
let btnClose = document.querySelector("#close");

function onload() {
  let colorValue = localStorage.getItem("color");
  let colorPicker = document.querySelector("#colorPicker");
  content.style.backgroundColor = `${colorValue}`;
  colorPicker.value = colorValue;
}
onload();

//localstorage check
let checkUsername = () => {
  if (localStorage.username) {
    return localStorage.username;
  } else {
    return "anonymous";
  }
};

let checkRoom = () => {
  if (localStorage.room) {
    return localStorage.room;
  } else {
    return "general";
  }
};

//kreiranje instanci klasa
let chatroom = new Chatroom(checkRoom(), checkUsername());
let ulChatList = document.querySelector("ul");
let chatUI = new ChatUI(ulChatList);

chatroom.getChats((data) => {
  chatUI.templateLI(data);
  document
    .querySelector(".messages ul li:last-child")
    .scrollIntoView({ behavior: "smooth" });
});

//Send message
btnSend.addEventListener("click", (event) => {
  event.preventDefault();
  let message = document.querySelector("#messageInput").value;

  if (message == "" || !/\S/.test(message)) {
    document.querySelector("#messageInput").placeholder =
      "You must enter some text...";
    //alert("You must type a message");
    return false;
  } else {
    chatroom
      .addChat(message)
      .then(() => messageInput.reset())
      .catch((err) => {
        console.log(err);
      });
  }
  document.querySelector("#messageInput").placeholder = "Your message...";
});
//Change username
btnUpdate.addEventListener("click", (event) => {
  event.preventDefault();
  let username = document.querySelector("#usernameInput").value;

  if (username == "") {
    document.querySelector("#usernameInput").placeholder =
      "Name must have between 2 and 10 characterst!";
    return false;
  } else if (username.length < 3 || username.length > 10) {
    alert("Name must have between 2 and 10 characterst!");
  } else {
    chatroom.updateUsername(username);
    document.querySelector(
      "#usernameInput"
    ).placeholder = `Username changed to ${username}`;
    setTimeout(() => {
      document.querySelector("#usernameInput").placeholder = "Update username";
    }, 3000);
    usernameInput.reset();
  }
});

//Change room
rooms.addEventListener("click", (event) => {
  if (event.target.tagName == "BUTTON") {
    let newRoom = event.target.getAttribute("id");

    btn.forEach((elem) => {
      elem.classList.remove("btnclicked");
    });
    event.target.classList.add("btnclicked");

    chatroom.updateRoom(newRoom);
    chatUI.clear();
    chatroom.getChats((data) => {
      chatUI.templateLI(data);
      document
        .querySelector(".messages ul li:last-child")
        .scrollIntoView({ behavior: "smooth" });
    });
  }
});

//OPTIONS
btnOptions.addEventListener("click", (event) => {
  if (divOptions.style.display === "none") {
    divOptions.style.display = "block";
  } else if (divOptions.style.display !== "none") {
    divOptions.style.display = "none";
  }
});

//COLOR
colorBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let colorPicker = document.querySelector("#colorPicker");
  let colorValue = colorPicker.value;
  content.style.backgroundColor = `${colorValue}`;
  localStorage.setItem("color", colorValue);
});

//DATE
dateBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let start = new Date(startDate.value);
  let end = new Date(endDate.value);

  chatUI.clear();

  db.collection("chats")
    .where("created_at", ">=", start)
    .where("created_at", "<=", end)
    .orderBy("created_at")
    .get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        snapshot.docs.forEach((doc) => {
          chatUI.templateLI(doc.data());
        });
      } else {
        alert(`There are no messages sent from ${start} to ${end}.`);
      }
    })
    .catch((err) => console.log("Error", err));
});

/*//DELETE 
db.collection('chats')
    .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            let type = change.type;
            let doc = change.doc;
            let id = doc.id;
            let li = document.querySelectorAll("li")
            li.forEach(li =>{
                li.setAttribute('data-id', id)
            })
            if (type == "removed") {
                
                li.forEach(l => {
                    if (l.getAttribute("data-id") == id) {
                        l.remove();
                    }
                })
            }
        })
    });
let ul = document.querySelector("ul")
        ul.addEventListener("click", event => {
            event.preventDefault();
        if (event.target.tagName === "BUTTON") {
            let id = event.target.parentElement.getAttribute('data-id');
            console.log(id)
            db.collection("chats").doc(id).delete()
                .then(() => {
                    console.log("Message successfully deleted")
                })
                .catch(err => {
                    console.log("error")
                })

        }
    })
    */
