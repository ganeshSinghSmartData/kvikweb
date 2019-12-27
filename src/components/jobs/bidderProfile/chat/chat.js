import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, FormGroup } from "reactstrap";
import "./chat.scss";
import { messages_list, resetChats } from "../../../../actions/messages";
import { LocalForm, Control } from "react-redux-form";
import SocketClient from "../../../../config/socket";
import { SEND_MESSAGE, GET_MESSAGE } from "../../../../actions/constants";
import ScrollToBottom from "react-scroll-to-bottom";
import { css } from "glamor";
import moment from "moment";

const ROOT_CSS = css({
  height: 400,
  width: 800
});

let messagesEnd = null;
const Chat = props => {
  const [message, setMessage] = useState("");
  const user = useSelector(state => state.user);
  const messages = useSelector(state => state.messages);
  const [message_count, setMessageCount] = useState(0);
  const dispatch = useDispatch();

  const scrollToBottom = () => {
    messagesEnd&&messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  useEffect(() => {
    loadChatData(props.Id);
  }, []);
  const loadChatData = async Id =>{
    if(Id){
      SocketClient.eventHandler(GET_MESSAGE, { user_id: user.data._id });
      await dispatch(messages_list({ id: Id, limit: 10, skip: 0 }));
        scrollToBottom()
    }
  }
  /*********************** Handle message input ************************************** */
  const onHandleChange = e => {
    setMessage(e.target.value);
  };

  /*********************** Handle message send ************************************** */
  const handleMessage = val => {
    if(message)
    SocketClient.eventHandler(SEND_MESSAGE, {
      message: message,
      recieverId: props.Id,
      senderId: user.data._id
    });
    setMessage("");
    scrollToBottom()
    dispatch(messages_list({ id: props.Id, limit: 10, skip: 0 }));
  };

  const chatHide = () => {
    props.chatHideCallback(false);
  };
  return (
    <div
      className={`chat-block d-flex flex-column ${
        props.chatToggle ? "on" : ""
      }`}
    >
      <div className="chat-head d-flex flex-shrink-0">
        <h2>CHAT</h2>
        <Button
          color="primary"
          className="chat-btn rounded-circle position-static ml-auto"
          onClick={chatHide}
        >
          <svg
            id="chat"
            xmlns="http://www.w3.org/2000/svg"
            width="19.361"
            height="19.37"
            viewBox="0 0 19.361 19.37"
          >
            <g id="Group_7885" data-name="Group 7885">
              <path
                id="Path_3432"
                data-name="Path 3432"
                d="M16.643,2.839A9.682,9.682,0,0,0,2.31,15.825,3.634,3.634,0,0,1,.785,17.59a.9.9,0,0,0,.26,1.7,4.608,4.608,0,0,0,.685.053h0a6.262,6.262,0,0,0,3.48-1.127A9.685,9.685,0,0,0,16.643,2.839Z"
                transform="translate(-0.117 0)"
                fill="#fff"
              />
            </g>
          </svg>
        </Button>
      </div>
      <div className="chat-inner overflow-auto flex-fill">
        {/* <ScrollToBottom className={ROOT_CSS}> */}
        <ScrollToBottom>
          {messages &&
            messages.data.length > 0 &&
            messages.data.map((val, index) => {
              return (
                <React.Fragment key={index}>
                  {val.senderId === user.data._id ? (
                    <div className="chat-row d-flex justify-content-end">
                      <div ref={(el) => { messagesEnd = el; }} className="chat-txt user">
                        <p>{val.message}</p>
                        <span className="d-block chat-time">09:20PM</span>
                      </div>
                    </div>
                  ) : (
                    <div className="chat-row d-flex">
                    <div ref={(el) => { messagesEnd = el; }} className="chat-txt admin">
                      <p>{val.message}</p>
                      <span className="d-block chat-time">
                        {moment(val.createdAt).format("LT")}
                      </span>
                    </div>
                  </div>
                    )}
                </React.Fragment>
              );
            })}
        </ScrollToBottom>
        {/* <div className="chat-history-rw d-flex justify-content-center position-relative">
          <label className="mb-0 position-relative">
            Today
          </label>
        </div>
        <div className="chat-row d-flex">
          <div className="chat-txt admin">
            <p>
              Lorem ipsum dolor sit ameti
            </p>
            <span className="d-block chat-time">
              09:20PM
          </span>
          </div>
        </div> */}
      </div>
      <div className="chat-foot">
        <LocalForm
          model="messages"
          onSubmit={values => handleMessage(values)}
          className="d-flex"
        >
          <div className="chat-foot-l flex-fill">
            <FormGroup>
              <Control.text
                model=".message"
                className="form-control"
                onChange={e => onHandleChange(e)}
                type="text"
                value={message}
                placeholder="Write Message..."
              />
            </FormGroup>
          </div>
          <div className="chat-foot-r">
            <Button
              color="link"
              className="rounded-circle p-0 attach-btn svg-seconary-100-hover position-relative"
            >
              <Input type="file" name="file" className="position-absolute" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36.307"
                height="36.696"
                viewBox="0 0 36.307 36.696"
              >
                <path
                  id="attachment"
                  d="M6.79,27.1a6.8,6.8,0,0,1-4.806-11.6L16.04,1.449a5.034,5.034,0,0,1,7.269.213,5.033,5.033,0,0,1,.213,7.269L10.317,22.136a3.182,3.182,0,1,1-4.5-4.5l8.945-8.945a.772.772,0,0,1,1.092,1.092L6.909,18.728a1.637,1.637,0,0,0,2.315,2.315L22.43,7.838a3.526,3.526,0,0,0-.213-5.084,3.525,3.525,0,0,0-5.084-.213L3.076,16.6A5.252,5.252,0,0,0,10.5,24.025L24.56,9.968a.772.772,0,1,1,1.092,1.092L11.6,25.117A6.749,6.749,0,0,1,6.79,27.1Z"
                  transform="matrix(0.848, -0.53, 0.53, 0.848, 0, 13.713)"
                  fill="#757575"
                />
              </svg>
            </Button>
            <Button
              type="submit"
              color="secondary"
              className="rounded-circle p-0"
            >
              <svg
                id="arrow"
                xmlns="http://www.w3.org/2000/svg"
                width="21.939"
                height="18.855"
                viewBox="0 0 21.939 18.855"
              >
                <path
                  id="Path_3272"
                  data-name="Path 3272"
                  d="M33.566,50.443l-8.153-8.153a1.274,1.274,0,1,0-1.8,1.8l5.979,5.979H13.274a1.274,1.274,0,0,0,0,2.548H29.589L23.611,58.6a1.274,1.274,0,0,0,1.8,1.8l8.153-8.153A1.274,1.274,0,0,0,33.566,50.443Z"
                  transform="translate(-12 -41.916)"
                  fill="#fff"
                />
              </svg>
            </Button>
          </div>
        </LocalForm>
      </div>
    </div>
  );
};

export default Chat;
