import './App.css';
import Header from './Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Addproject from './Addproject';
import Updateproject from './Updateproject';
import Projectlist from './Projectlist';
import Home from './Home';
import { useState } from 'react';
function App() {
  let user = JSON.parse(localStorage.getItem('staff-info'));
  const[isloggedin,setIsloggedin] = useState(false);
  //console.warn(isloggedin);
  const logincomponent = <Login handlelogin={setIsloggedin} />
  return (
    <div className="App">
      <BrowserRouter>
      <Header logincomponent/>
      <Routes>
        <Route>
         
          <Route exact path="/" element={<Home /> } />
          <Route path="/login" element={logincomponent} />
          <Route path="/register" element={<Register/>} />

          <Route path="/addproject" element={<Addproject />} />
          <Route path="projectlist/update/:id" element={<Updateproject />} />
          <Route path="/projectlist" element={<Projectlist />} />
          
         
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
