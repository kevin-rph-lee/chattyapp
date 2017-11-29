import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
    this.onNewMessage=this.onNewMessage.bind(this);
    this.componentDidMount=this.componentDidMount.bind(this);
    this.onUserChange=this.onUserChange.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");

    console.log("connected to server?...  i hope");


    this.socket.onmessage =  (event) => {
      console.log("Client got the message! ", event.data);
      const messages = this.state.messages;
      messages.push(JSON.parse(event.data));
      this.setState({messages});
    }
  }

  onNewMessage(message){
    console.log("Message is: ", message);
    const newMessage = {
      username: this.state.currentUser.name,
      content: message
    };

    this.socket.send(JSON.stringify(newMessage));
  }


  onUserChange(name){
    let currentUser =this.state.currentUser;
    currentUser['name'] = name;
    this.setState({currentUser});
  }

  render() {
    console.log('in app ',this.state.currentUser);
    return(
      <div>
        <MessageList currentUser={this.state.currentUser} messages={this.state.messages}  />
        <Chatbar onNewMessage = {this.onNewMessage} onUserChange = {this.onUserChange} currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;
