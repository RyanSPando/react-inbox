import React, {Component} from 'react'

class Toolbar extends Component {

    messageBools = () => {
        const andBool = this.props.messages.map(message => message.selected === true)
            .reduce((a, b) => a && b)

        const orBool = this.props.messages.map(message => message.selected === true)
            .reduce((a, b) => a || b)
        return {andBool, orBool}
    }

    messageStatus = () => {
        const messageBools = {...this.messageBools()}
        if (messageBools.andBool) {
            return "check-"
        } else if (messageBools.orBool) {
            return "minus-"
        } else {
            return ""
        }
    }

    selectAll = () => {
        const messageBools = {...this.messageBools()}

        if (messageBools.andBool) {
            const updatedMessages = this.props.messages
                .map(message => Object.assign({}, {...message}, {selected: false}))
            this.props.handleMessageEvent(updatedMessages)
        } else {
            const updateMessages = this.props.messages
                .map(message => Object.assign({}, {...message}, {selected: true}))
            this.props.handleMessageEvent(updateMessages)
        }
    }

    markAsRead = () => {
        const updatedMessages = this.props.messages.map(message => {
            if (message.read === false && !!message.selected) {
                return Object.assign({}, {...message}, {read: true})
            }
            else {
                return message
            }
        })
        this.props.handleMessageEvent(updatedMessages)
    }

    markAsUnread = () => {
        const updatedMessages = this.props.messages.map(message => {
            if (message.read && !!message.selected) {
                return Object.assign({}, {...message}, {read: false})
            }
            else {
                return message
            }
        })
        this.props.handleMessageEvent(updatedMessages)
    }

    deleteMessage = () => {
        const updatedMessages = this.props.messages.filter(message => !!message.selected === false)
        this.props.handleMessageEvent(updatedMessages)
    }

    addLabel = (e) => {
        e.preventDefault()
        const label = e.currentTarget.value
        const updatedMessages = this.props.messages.map(message => {
            if (!!message.selected) {
                return Object.assign({}, {...message}, {labels: this.addLabelIfUnique(message.labels, label)})
            }
            else {
                return message
            }
        })

        this.props.handleMessageEvent(updatedMessages)
    }

    addLabelIfUnique(labels, label) {
        if (labels.indexOf(label) < 0)
            labels.push(label)
        return labels
    }

    removeLabel = (e) => {
        e.preventDefault()
        const label = e.currentTarget.value
        const updatedMessages = this.props.messages.map(message => {
            if (!!message.selected) {
                return Object.assign({}, {...message},
                    {labels: message.labels.filter(currentLabel => currentLabel !== label)})
            }
            else {
                return message
            }
        })

        this.props.handleMessageEvent(updatedMessages)
    }


    render = () =>
        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                    <span className="badge badge">{
                        this.props.messages
                            .filter(message => !message.read)
                            .reduce((acc, x) => acc + 1, 0)
                    }</span>
                    unread messages
                </p>

                <button className="btn btn-default">
                    <i className={`fa fa-${this.messageStatus()}square-o`} onClick={this.selectAll}></i>
                </button>

                <button className="btn btn-default" onClick={this.markAsRead}>
                    Mark As Read
                </button>

                <button className="btn btn-default" onClick={this.markAsUnread}>
                    Mark As Unread
                </button>

                <select className="form-control label-select" onChange={this.addLabel}>
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select className="form-control label-select" onChange={this.removeLabel}>
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button className="btn btn-default" onClick={this.deleteMessage}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
}

export default Toolbar
