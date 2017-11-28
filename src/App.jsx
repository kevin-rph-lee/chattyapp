import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  render() {
    return(
      <div>
        <MessageList />
        <Chatbar />
      </div>
    );
  }
}
export default App;
