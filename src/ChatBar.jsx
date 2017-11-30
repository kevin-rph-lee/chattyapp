import React, {Component} from 'react';

class ChatBar extends Component {

  constructor() {
    super();

    this.state = {
      message: '',
      user: ''
    }
    this.onMessageChange = this.onMessageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
  };

  //Adding a new message calling the onNewMessage function
  onMessageChange(event){
    console.log(event.charCode);
    console.log(event.key);
    if (event.key === 'Enter') {
      event.target.value = '';
      this.props.onNewMessage(this.state.message)
    }
  };

  //Changing the username calling the onUserChange function
  onUserChange(event){
    console.log(event.charCode);
    console.log(event.key);
    if (event.key === 'Enter') {
      console.log('Changing user!: ', this.state.user);
      this.props.onUserChange(this.state.user);
    }
  };

  //handling text change for the chat box
  handleChange(event) {
    this.setState({message: event.target.value});
    console.log('Message Value: ', event.target.value);
  };

  //handling text change for the username box
  handleChangeUser(event) {
    this.setState({user: event.target.value});
    console.log('User Value: ', event.target.value);
  };

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" value={this.state.value} onChange={this.handleChangeUser} onKeyPress={this.onUserChange} placeholder={this.props.currentUser.name} />
        <input className="chatbar-message" value={this.state.value} onChange={this.handleChange} onKeyPress={this.onMessageChange} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;
