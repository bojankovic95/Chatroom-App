export class Chatroom {
  constructor(r, u) {
    this.room = r;
    this.username = u;
    this.chats = db.collection("chats");
    this.unsub;
  }

  set room(r) {
    this._room = r;
  }
  set username(u) {
    this._username = u;
  }

  get room() {
    return this._room;
  }
  get username() {
    return this._username;
  }

  updateUsername(newUsername) {
    this.username = newUsername;
    localStorage.setItem("username", newUsername);
  }

  updateRoom(newRoom) {
    this.room = newRoom;
    localStorage.setItem("room", newRoom);
    if (this.unsub) {
      this.unsub();
    }
  }

  async addChat(message) {
    let date = new Date();

    let docChat = {
      message: message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(date),
    };

    let response = await this.chats.add(docChat);
    return response;
  }

  getChats(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type == "added") {
            callback(change.doc.data(), change.doc.id);
          } else if (change.type == "removed") {
            document
              .querySelector(`button[data-id='${change.doc.id}']`)
              .parentElement.remove();
          }
        });
      });
  }
}
