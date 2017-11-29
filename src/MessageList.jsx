import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
    constructor(props) {
      super(props);
    };

  render() {
    const messages = this.props.messages.map((message) => {
      return <Message
        key = { message.id }
        username = { message.username }
        content = { message.content } />
    });

    return (

        <main className="messages">
          {messages}
        </main>
      );
    }
}
export default MessageList;
