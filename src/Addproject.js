import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Invalidroute from "./Invalidroute";

function AddProduct(){
    let user = JSON.parse(localStorage.getItem('staff-info'));
    const [project_name,setProjectname] = useState("");
    const [allocated_to,setAllocatedto] = useState("");
    const [description,setDescription] = useState("");
    const [file,setFile] = useState("");
    const [project_type,setProjecttype] = useState("");
    const navigate = useNavigate();
    

    async function addprojects(){
        let item = {project_name,allocated_to,file,description,project_type};
        console.warn(item);
        const formData = new FormData();
        formData.append("file",file);
        formData.append("project_name",project_name);
        formData.append("allocated_to",allocated_to);
        formData.append("project_type",project_type);
        formData.append("description",description);
        console.warn(JSON.stringify(formData));
        let result = await fetch("http://localhost:8000/api/addproject",{
            method:"POST",
            mode: 'cors',
            body:formData
        });
        console.warn(result);
        navigate("/projectlist");
    }
    return(
        
        <div>
            {
         
            user != undefined || user != null?
            <>
            <h1>Add Projects</h1>
            <div className="col-sm-6 offset-sm-3">
            <input type="text" placeholder="Name" onChange={(e)=>setProjectname(e.target.value)} className="form-control" /><br />
            <input type="file" placeholder="File" onChange={(e)=>setFile(e.target.files[0])} className="form-control" /><br />
            <input type="text" placeholder="Description" onChange={(e)=>setDescription(e.target.value)} className="form-control" /><br />
            <select name="allocated_to" id="allocated_to" className="form-control" value={allocated_to} onChange= {(e)=>setAllocatedto(e.target.value)} ><br />
                <option value="Database_Administration">Database Administration</option>
                <option value="Project_Manager">Project Manager</option>
                <option value="Team_Lead">Team Lead</option>
                <option value="Software_Engineer">Software Engineer</option>
                <option value="Tester">Tester</option>
            </select><br />
            <select name="project_type" id="project_type" className="form-control" value={project_type} onChange= {(e)=>setProjecttype(e.target.value)} ><br />
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
            </select><br />
            <button className="btn btn-primary" onClick={addprojects}>Add Project</button>
            </div>
            </>
            : 
            <>
            <Invalidroute />
            </>
            }
        </div>
        
    )
}
export default AddProduct