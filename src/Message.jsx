import React, {Component} from 'react';

class Message extends Component {
    constructor(props) {
      super(props);
    };



  render() {
        console.log('Colour of msg: ', this.props.colour);
        const klass = 'message-username ' + this.props.colour;
        return (
          <div className="message">
             <span className= {klass} >{this.props.username}</span>
             <span className="message-content">{this.props.content}</span>
          </div>
    );
  }
}
export default Message;



// 'message-username'
