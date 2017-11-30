import React, {Component} from 'react';
import Message from './Message.jsx'
import Notification from './Notification.jsx'

class MessageList extends Component {
    constructor(props) {
      super(props);
    };

  render() {
    const messages = this.props.messages.map((message) => {
      //Checking to see what kind of message it is, a regular one or notificiation
      switch(message.type){
        case 'incomingMessage': return <Message
                                        key = { message.id }
                                        username = { message.username }
                                        content = { message.content }
                                        colour = { message.colour } />;
        case 'incomingNotification': return <Notification
                                             key = { message.id }
                                             content = { message.content } />;
        }
    });

    return (
        <main className="messages">
          {messages}
        </main>
      );
    }
}
export default MessageList;
