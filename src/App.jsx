import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import UserCounter from './UserCounter.jsx';



class App extends Component {

  constructor(props) {
    super(props);

    this.socket = null;
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [],
      colour: null,
      usersOnline: 0
    };
    this.onNewMessage=this.onNewMessage.bind(this);
    this.componentDidMount=this.componentDidMount.bind(this);
    this.onUserChange=this.onUserChange.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    //Assigning colour to the client and storing it in a state
    const colourStyles = [
      'redUser',
      'blueUser',
      'greenUser',
      'brownUser',
    ];
    const colorIndex = Math.floor(Math.random() * colourStyles.length);
    this.setState({colour: colourStyles[colorIndex]});

    this.socket.addEventListener('message', (event) => {
      const newMessage = JSON.parse(event.data);

      //Checking what kind of message should be sent to the clients
      if (newMessage.type === 'incomingMessage' || newMessage.type === 'incomingNotification') {
        const messages = this.state.messages;   // TODO: consider slicing, and/or deep cloning
        messages.push(newMessage);
        this.setState({messages});
      } else if (newMessage.type === 'userCountUpdate'){
        const usersOnline = newMessage.count;
        this.setState({usersOnline});
      } else {
        console.log('ERROR!', event.data);
      }
    });
  }

  //Sending a new message to the websocket server for a new chat message
  onNewMessage(message){
    const newMessage = {
      username: this.state.currentUser.name,
      content: message,
      type: 'postMessage',
      colour: this.state.colour
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  //Sending a new message to the websocket server for a new username change notification
  onUserChange(name){
    let currentUser = this.state.currentUser;
    const newUserNotification = {
      type: 'postNotification',
      content: `${currentUser.name} has changed their name to ${name}`,
    };
    currentUser['name'] = name;
    this.setState({currentUser});
    this.socket.send(JSON.stringify(newUserNotification));
  }

  render() {
    return(
      <div>
        <UserCounter usersOnline = {this.state.usersOnline} />
        <MessageList currentUser = {this.state.currentUser} messages = {this.state.messages}  notifications = {this.state.notifications} />
        <Chatbar onNewMessage = {this.onNewMessage} onUserChange = {this.onUserChange} currentUser={this.state.currentUser} />
      </div>
    );
  }
}

export default App;
