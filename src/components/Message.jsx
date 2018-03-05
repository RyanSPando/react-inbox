import React from 'react'

const Message = ({message: {subject, read, starred, selected, labels}, idx, selectMessage, starToggle}) =>
    <span>
        <div className={`row message ${read ? "read" : "unread"} ${selected && "selected"}`}>
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input name="checkBox" value={idx} type="checkbox" checked={selected ? "checked" : ""} onClick={selectMessage} readOnly/>
                    </div>
                    <div className="col-xs-2">
                        <i className={`star fa fa-star${starred ? "" : "-o"}`} data-index={idx} onClick={starToggle}/>
                    </div>
                </div>
            </div>
            <div className="col-xs-11">
            {labels.map((label, idx) => <span className="label label-warning" key={idx}>{label}</span>)}
                <a href="#">
                    {subject}
                </a>
            </div>
        </div>
        <div className="row message-body hidden">
            <div className="col-xs-11 col-xs-offset-1">
                 This is the body of the message.
            </div>
        </div>
    </span>

export default Message