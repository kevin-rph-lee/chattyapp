import React, {Component} from 'react';

class ChatBar extends Component {

  constructor() {
    super();

    this.state = {
      message: ''
    }

    this.onMessageChange = this.onMessageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  //Add message
  onMessageChange(event){
    console.log(event.charCode);
    if(event.charCode === 13){
      this.props.onNewMessage(this.state.message)
    }
  };

  handleChange(event) {
    this.setState({message: event.target.value});
    console.log('Value: ', event.target.value);
  };

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" />
        <input className="chatbar-message" value={this.state.value} onChange={this.handleChange} onKeyPress={this.onMessageChange} placeholder="Type a message and hit ENTER" />
      </footer>

    );
  }
}
export default ChatBar;
