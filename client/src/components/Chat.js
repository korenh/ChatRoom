import React , {useEffect , useState } from 'react';
import querystring from 'query-string';
import io from 'socket.io-client';
import Scrolltobottom from 'react-scroll-to-bottom';
import Message from './Message';

let socket;

export default function Chat({location}){
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [message , setMessage] = useState('');
    const [messages , setMessages] = useState([]);
    const Endpoint = 'localhost:5000';


    useEffect(() => {
        const {name , room} = querystring.parse(location.search);
        socket=io(Endpoint);
        setName(name);
        setRoom(room);
        socket.emit('join' , {name , room} , (error) => {
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
     }, [Endpoint , location.search]);

     useEffect(() => {
         socket.on('message' , (message)=> {setMessages([...messages , message])})
     },[messages]); 

     const sendMessage = (event) =>{
         event.preventDefault();
         if(message){
             socket.emit('sendMessage' , message , () => setMessage(''))}
     }

    return(
    <div className='chat-main'>
    <div className='navigation'>
        <p>Room| {room}</p>
        <p onClick={()=>window.location.href='/'}>Exit</p>
    </div>
    <Scrolltobottom className='chat-content'>
        {messages.map((message , i) => <div key={i}><Message message={message} name={name}/></div>)}
    </Scrolltobottom>
    <form className="send-main">
        <input type="text" placeholder="message" value={message} onChange={({ target: { value } }) => setMessage(value)} onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} />
        <button onClick={e => sendMessage(e)}>Send</button>
    </form>
    </div>
)};

