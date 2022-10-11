import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props){
    const navigate = useNavigate();
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[login_type,setLogintype] = useState("");
    // useEffect(()=>{
    //     if(localStorage.getItem("staff-info")){
    //         navigate("/projectlist");
    //     }
    // }
    // );
    useEffect(()=>{
        if(localStorage.getItem('staff-info')){
            navigate("/projectlist");
        }
    },[])
    async  function loginaction(){
        let item = {email,password,login_type};
        let result = await fetch("http://localhost:8000/api/login",{
            method:"POST",
            body:JSON.stringify(item),
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        })
        
        result =  await result.json();
        console.warn(result);
        localStorage.setItem("staff-info",JSON.stringify(item));
        console.warn(JSON.parse(localStorage.getItem('staff-info')));
        const localdata =  JSON.parse(localStorage.getItem('staff-info'));
        if(result.status ==="success" && localdata.email && localdata.password && localdata.login_type && Object.keys(localStorage.getItem('staff-info')).length !== 0){
           
            props.handlelogin(true);
            navigate("/projectlist");
        }
    }
    return(
       <div>
        <h1>Login Page</h1>
            <div className="col-sm-6 offset-sm-3">
                <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className="form-control"/><br/>
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className="form-control"/><br/>
                <select name="logintype" id="logintype" className="form-control" value={login_type} onChange= {(e)=>setLogintype(e.target.value)} ><br />
                <option value="Admin">Admin</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Team Lead">Team Lead</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Tester">Tester</option>
            </select>
                <button className="btn btn-success" onClick={loginaction}>Sign In</button>
            </div>
        </div>
        );
    
}
export default Login;