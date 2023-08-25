import { Avatar, IconButton } from '@mui/material'
import React ,{useState,useEffect} from 'react'
import db from './firebase'

import DonutLargeIcon from '@mui/icons-material/DonutLarge'; 
import ChatIcon from '@mui/icons-material/Chat'; 
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import '../Sidebar.css'
import SidebarChat from './SidebarChat';
import { useStateProvide } from './StateProvide';


const Sidebar = () => {

    const [rooms, setrooms] = useState([])
    const [{user}, dispatch] = useStateProvide()

    const photoUrl = user.multiFactor.user.photoURL



    useEffect(()=>{

        db.collection('rooms').onSnapshot((Snapshot)=>{

            setrooms(Snapshot.docs.map((doc)=>{
               return {
                        id:doc.id,
                        data: doc.data()
                      }
                  }))

        })

    },[])
  return (
    <div className='sidebar'>
        <div className='sidebar__header'>
            <Avatar src={`${photoUrl}`} referrerPolicy="no-referrer"  />
            <div className='sidebar__headerRight'>

                <IconButton>
                    <DonutLargeIcon/>
                </IconButton>
    
                <IconButton>
                    <ChatIcon/>
                </IconButton>
                
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
                
            </div>
        </div>

        <div className='sidebar__search'>
            <div className='sidebar__searchContainer'>
                 <SearchOutlinedIcon/>
                 <input type={'text'} placeholder="Search or start a new chat"/>                
            </div>
        </div>

        
        <div className='sidebar__chats'>
            <SidebarChat newChat={'s'}/>
            {
              rooms.map((room)=>(
                  <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                  ))
            }
           
        </div>
      
    </div>
  )
}

export default Sidebar
