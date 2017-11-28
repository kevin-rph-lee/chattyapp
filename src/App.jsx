import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
    this.onNewMessage=this.onNewMessage.bind(this);
  }

    // in App.jsx
  // componentDidMount() {
  //   console.log("componentDidMount <App />");
  //   setTimeout(() => {
  //     console.log("Simulating incoming message");
  //     // Add a new message to the list of messages in the data store
  //     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //     const messages = this.state.messages.concat(newMessage)
  //     // Update the state of the app component.
  //     // Calling setState will trigger a call to render() in App and all child components.
  //     this.setState({messages: messages})
  //   }, 3000);
  // }
  //
  onNewMessage(message){
    let messages = this.state.messages;
    console.log("Message is: ", message);
    console.log('Last id: ' + messages[messages.length-1]['id']);
    messages.push({
      id: (messages[messages.length-1]['id'] + 1),
      username: 'Anonymous',
      content: message
    });
    this.setState({messages});
  }


  render() {
    console.log('in app ',this.state.currentUser);
    return(
      <div>
        <MessageList currentUser={this.state.currentUser} messages={this.state.messages}  />
        <Chatbar onNewMessage = {this.onNewMessage} />
      </div>
    );
  }
}
export default App;
