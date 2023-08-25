import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import db from './firebase'



import '../SlidebarChat.css'





const SidebarChat = ({newChat,id,name}) => {

  const [messages, setMessages] = useState("")

    useEffect(() => {

      if(id){

        db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot((snapShot)=>{
          setMessages(snapShot.docs.map((doc)=>{
            
            return doc.data()
          }))
          
          
        })
      }
  
  }, [])


const addChat =()=>{


 const roomName= prompt('Enter a name for new room')

 if(roomName){

  db.collection('rooms').add({name:roomName})

 }

}


  
  return !newChat?(
  <Link to={`rooms/${id}`}>
    <div  className='slidebarChat'>
      <Avatar src='https://api.dicebear.com/5.x/adventurer/svg?seed=Felix&flip=true'/>
      <div className='slidebarChat__info'>
        <h2>{name}</h2>
        <p>{messages[0]?.message}</p>
      </div>
    </div>
  </Link>
  ):(
    <div onClick={addChat} className='slidebarChat'>
        <h2>Add new chat</h2>
    </div>
  )
}

export default SidebarChat
