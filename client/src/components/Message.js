import React from 'react';

const Message = ({message : {user,text,time} , name }) => {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();
    if (user === trimmedName){
        isSentByCurrentUser = true;
    }
    return(
        isSentByCurrentUser
        ?
        (<div className='right-msg'>
            <p>{trimmedName}</p>
            <div>{text}<p className='date-msg'>{time}</p></div>
        </div>)
        :
        (<div className='left-msg'>
            <div>{text}<p className='date-msg'>{time}</p></div>
            <p>{user}</p>
        </div>)
)}
export default Message;