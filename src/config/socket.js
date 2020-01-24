import io from "socket.io-client";
import * as TYPE from "../actions/constants";
import { get_message, messages_count } from "../actions/messages";

class SocketClient {
  constructor() {
    this.socket = null;
    this.dispatch = null;
  }

  /************* Socket Initializer ************************/
  init = (SOCKET_URL, TOKEN, dispatch) => {
    if (!this.socket) {
      // this.socket = io(SOCKET_URL, { transports: ['websocket'], upgrade: false });
      this.socket = io(SOCKET_URL, { query: `token=${TOKEN}` });
      this.dispatch = dispatch;
    }
    /*********** check user authentication ******************** */
    // this.authentication(TOKEN);

    /*********** event for socket connect ******************** */
    if (this.socket) {
      this.socket.on("connect", res => {
        // console.log('connect');
      });
    }

    /*********** event for socket disconnect ******************** */

    if (this.socket) {
      this.socket.on("disconnect", res => {
        // console.log('disconnect');
      });
    }

    /************** event of get messages******* *****************/
    if (this.socket) {
      this.socket.on(`get_message`, res => {
        this.dispatch(get_message(res));
        this.dispatch(messages_count());
      });
    }
  };

  /*********** user authentication before socket connection ******* */
  authentication = token => {
    if (this.socket) {
      this.socket.emit("authenticate", { token }, (error, res) => {
        // console.log(error, res, "authenticate", this.socket);
      });
    }
  };

  /*********** Handler for emitting events ******* */
  eventHandler = (type, data) => {
    switch (type) {
      case TYPE.LOGOUT_USERS:
        if (this.socket) {
          this.socket.emit("disconnect");
        }
        break;
      case TYPE.SEND_MESSAGE:
        if (this.socket) {
          if (data && data.type == "text") {
            this.socket.emit(`${data.senderId}-send_message`, {
              recieverId: data.recieverId, // message reciever
              senderId: data.senderId, // your id
              type: "text", // text/image
              message: data.message
            });
          }
          if (data && data.type == "image") {

            this.socket.emit(`${data.senderId}-send_message`, {
              recieverId: data.recieverId, // message reciever
              senderId: data.senderId, // your id
              type: "image", // text/image
              message: 'image',
              path: data.path
            });
          }
        }
      case TYPE.GET_MESSAGE:
        if (this.socket) {
          this.dispatch(get_message(data));
          this.dispatch(messages_count());
          this.socket.on(`${data.senderId}-get_message`, res => {
            this.dispatch(get_message(res));
            this.dispatch(messages_count());
          });
        }
        break;
    }
  };
}

export default new SocketClient();
