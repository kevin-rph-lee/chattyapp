import React, {Component} from 'react';

class UserCounter extends Component {
  render() {
    return (
      <div className="user-counter">{this.props.usersOnline} users online</div>
    );
  }
}

export default UserCounter;
