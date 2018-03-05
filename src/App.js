import React, {Component} from 'react';
// import logo from './logo.svg';
import './index.css';
import Messages from "./components/Messages";
import Toolbar from "./components/Toolbar";
import messagesFromFile from './seed'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: messagesFromFile
        }
    }

    starToggle = (e) => {
        const idx = parseInt(e.target.dataset.index, 10)

        const messageToUpdate = this.state.messages[idx]

        const updatedMessages = this.state.messages.slice(0, idx)
            .concat(Object.assign({}, messageToUpdate, {starred: !messageToUpdate.starred}))
            .concat(this.state.messages.slice(idx + 1))

        this.setState({
            messages: updatedMessages
        })
    }

    selectMessage = (e) => {
        const idx = parseInt(e.target.value, 10)

        const messageToUpdate = this.state.messages[idx]

        const updated = Object.assign({}, messageToUpdate, {selected: !!!messageToUpdate.selected})
        const updatedMessages = this.state.messages.slice(0, idx)
            .concat(updated)
            .concat(this.state.messages.slice(idx + 1))

        this.setState({
            messages: updatedMessages
        })
    }

    handleMessageEvent = (updatedMessages) => {
        this.setState({
            messages: updatedMessages
        })
    }


    render() {
        return (
            <div>
                <Toolbar messages={this.state.messages} handleMessageEvent={this.handleMessageEvent}/>
                <Messages messages={this.state.messages} starToggle={this.starToggle}
                          selectMessage={this.selectMessage} handleMessageEvent={this.handleMessageEvent}/>
            </div>);
    }
}

export default App;
