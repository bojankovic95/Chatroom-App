export class ChatUI {
  constructor(ul) {
    this.ul = ul;
  }
  set list(ul) {
    this._list = ul;
  }

  get list() {
    return this._list;
  }

  clear() {
    this.ul.innerHTML = "";
  }

  templateLI(data) {
    let date = data.created_at.toDate();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let dateToday = new Date();
    let today = dateToday.getDate();
    let localUsername = localStorage.getItem("username");

    let current = new Date();
    let currentDay = current.getDate();

    if (minutes <= 9) {
      minutes = "0" + minutes;
    }

    if (hours <= 9) {
      hours = "0" + hours;
    }

    if (day <= 9) {
      day = "0" + day;
    }

    if (month <= 9) {
      month = "0" + month;
    }

    if (localUsername == data.username) {
      if (currentDay == day) {
        let htmlLi = `<li class = "messageuiright">
            <span class = "username" style ="font-weight:bold">${data.username}: </span>
            <span class = "message">${data.message}</span>
            <div class = "date">${hours}:${minutes}</div>
        </li>`;

        this.ul.innerHTML += htmlLi;
      } else {
        let htmlLi = `<li class = "messageuiright">
            <span class = "username" style ="font-weight:bold">${data.username}: </span>
            <span class = "message">${data.message}</span>
            <div class = "date">${day}. ${month}. ${year} - ${hours}:${minutes}</div>
        </li>`;

        this.ul.innerHTML += htmlLi;
      }
    } else {
      if (currentDay == day) {
        let htmlLi = `<li class = "messageui">
            <span class = "username" style ="font-weight:bold">${data.username}: </span>
            <span class = "message">${data.message}</span>
            <div class = "date">${hours}:${minutes}</div>
        </li>`;

        this.ul.innerHTML += htmlLi;
      } else {
        let htmlLi = `<li class = "messageui">
            <span class = "username" style ="font-weight:bold">${data.username}: </span>
            <span class = "message">${data.message}</span>
            <div class = "date">${day}. ${month}. ${year} - ${hours}:${minutes}</div>
        </li>`;

        this.ul.innerHTML += htmlLi;
      }
    }
    /*let deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");

        deleteButton.innerHTML = "x";

        let messageBox = document.querySelectorAll("li");
        messageBox.forEach(box =>{
            box.appendChild(deleteButton);
        })*/
  }
}
