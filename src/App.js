import './App.css';
import Sidebar from './component/Sidebar';
import Chat from './component/Chat';
import Login from './component/Login';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { useStateProvide } from './component/StateProvide';


function App() {

  const [{user}, dispatch] = useStateProvide()

    
  return (
        <BrowserRouter>
    <div className="app">

      { !user? <div> <Login/> </div>:
        <div className='app__body'>
        <Sidebar/>
           <Routes>  
              <Route path="/"  element={""} />
            
              <Route path="/rooms/:roomId" element={ <Chat/>} />

           </Routes>
      </div>
      }
    </div>
        </BrowserRouter>
  );
}

export default App;
