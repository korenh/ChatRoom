import React , {useState} from 'react';
import {Link} from 'react-router-dom';

export default function Sign(){
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    
    return(
        <div className='sign-main'>
            <h2>ChatRoom</h2>
            <input placeholder='name' type='text' onChange={(event) => setName(event.target.value)}/>
            <input placeholder='room' type='text' onChange={(event) => setRoom(event.target.value)} />
            <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`} >
            <button type='submit'>Join</button>
            </Link>
        </div>
    )
}