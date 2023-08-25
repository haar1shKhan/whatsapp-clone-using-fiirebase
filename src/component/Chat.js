import { Avatar,IconButton } from '@mui/material'
import React, { useState ,useEffect} from 'react'
import '../Chat.css'
import db from './firebase'
import { serverTimestamp  } from "firebase/firestore";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import { useStateProvide } from './StateProvide';

const Chat = () => {
    const roomId= useParams()
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([])
    const [{user}, dispatch] = useStateProvide()
    const [input,setInput] = useState('')
    const userId = user.multiFactor.user.uid;


    useEffect(() => {
       
        if(roomId){
            db.collection('rooms').doc(roomId.roomId).onSnapshot((snapShot)=>{
                setRoomName(snapShot.data().name);
            })

            db.collection('rooms').doc(roomId.roomId).collection('messages').orderBy('timestamp','asc').onSnapshot((snapShot)=>{

                setMessages(snapShot.docs.map((doc)=>{
                   return doc.data()
                }))


            })

        }

    }, [roomId])
    
    const sendMessage=async (e)=>{
        e.preventDefault()

     await db.collection('rooms').doc(roomId.roomId).collection('messages').add({
            name:user.multiFactor.user.displayName,
            message:input,
            timestamp:serverTimestamp(),
            Id:user.multiFactor.user.uid
            
        })

       setInput('')

    }



  return (
    <div className='chat'>

        <div className='chat__header'>
            <Avatar src='https://api.dicebear.com/5.x/adventurer/svg?seed=john&flip=true'/>

            <div className='chat__info'>
                
                <h3>{roomName}</h3>
                <p>last scene...</p>

            </div>

            <div className='chat__headerRight'>

                <IconButton>
                    <SearchOutlinedIcon/>
                </IconButton>
                
                <IconButton>
                    <AttachFileIcon/>
                </IconButton>

                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
                
            </div>


        </div>


            
         <div  className='chat__body'>
        {messages.map((message,index)=>{ 
    
            let date = new Date(message.timestamp?.seconds*1000).toUTCString()
            
        return <p key={index} className={`chat__message ${userId===message.Id && "chat_reciever"}`}>
                    <span className='chat__name'>{message.name}</span>
                    {message.message}
                    <span className='chat__timestamp'>{date}</span>
                    {/* <span className='chat__timestamp'>12:00 pm</span> */}
                </p>
            
        })}
        </div> 

        <div className='chat__footer'>

            <SentimentSatisfiedAltIcon/>

            <form>
                <input type={'text'} value={input} onChange={e=>setInput(e.target.value)} placeholder='Send a message'/>
                <button onClick={sendMessage} type='submit'>
                submit
                </button >
            </form>

             <MicIcon/>

        </div>
      
    </div>
  )
}

export default Chat
