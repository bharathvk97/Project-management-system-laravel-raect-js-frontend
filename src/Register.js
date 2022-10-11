import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Invalidroute from './Invalidroute';
import Addproject from './Addproject';
import Updateproject from './Updateproject';
import Projectlist from './Projectlist';

function Register(){
    let user = JSON.parse(localStorage.getItem('staff-info'));
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[login_type,setLogintype] = useState("");
    const navigate = useNavigate();
    async function signup(){
        let item = {name,email,password,login_type};
        console.warn(item);
        let result = await fetch("http://localhost:8000/api/register",{
            method:"POST",
            body:JSON.stringify(item),
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        })
        result = await result.json();
        console.warn("result",result);
        localStorage.setItem("staff-info",JSON.stringify(result));
        if(localStorage.getItem('staff-info')){
            navigate("/projectlist");
        }
    }
    return(
       
        <div>
            {
            user == undefined || user == null?
            <>
            <h1>Registration</h1>
            <div className="col-sm-6 offset-sm-3">
            <input type="text" value={name} onChange= {(e)=>setName(e.target.value)} className="form-control" placeholder="Name" /><br />
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Email" /><br />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Password" /><br />
            <select name="logintype" id="logintype" className="form-control" value={login_type} onChange= {(e)=>setLogintype(e.target.value)} ><br />
            <option value="Admin">Admin</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Team Lead">Team Lead</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Tester">Tester</option>
            </select>
            <button onClick={signup} className="btn btn-primary">Sign Up</button>
            </div>
            </>
            : 
            <>
            <Projectlist />
            </>
            }
        </div>
    );
    
}
export default Register;