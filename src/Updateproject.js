import {useParams} from 'react-router-dom';
import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
const Updateproject = ()=>{
    
    let params = useParams();
    const [data, setData] = useState([]);
    const [project_name,setProjectname] = useState("");
    const [allocated_to,setAllocatedto] = useState("");
    const [description,setDescription] = useState("");
    const [file,setFile] = useState("");
    const [project_type,setProjecttype] = useState("");
    const navigate = useNavigate();
    const [validationError,setValidationError] = useState({})
    
    useEffect(()=>{
       
        getData();

    },[])
    
    async function getData(){
        let result =  await fetch("http://localhost:8000/api/getsingleproject/"+params.id);
        let results = await result.json();
        localStorage.setItem("project-info",JSON.stringify(results));
        const localdata =  JSON.parse(localStorage.getItem('project-info'));
        setData(results);
        setProjectname(results.project_name);
        setDescription(results.description);
        setAllocatedto(results.allocated_to);
        setProjecttype(results.project_type);
        setFile(results.file_path)
    }
    async function updateprojects($id){
        let item = {project_name,allocated_to,file,description,project_type};
        console.warn(item);
        const formData = new FormData();
        formData.append("file",file);
        formData.append("project_name",project_name);
        formData.append("allocated_to",allocated_to);
        formData.append("project_type",project_type);
        formData.append("description",description);
        console.warn(JSON.stringify(formData));
        let result = await fetch("http://localhost:8000/api/updateproject/"+$id,{
            method:"POST",
            mode: 'no-cors',
            body:formData
        });
       navigate("/projectlist");

    }
    
    return(
        <div className="col-sm-6 offset-sm-3">
        <h1>Update Projects</h1>
        <img style={{width:100}} src={"http://localhost:8000/"+data.file_path}/><br />
        <input type="text" placeholder="Name" defaultValue={data.project_name} onChange={(e)=>setProjectname(e.target.value)} className="form-control" /><br />
        <input type="file"  id = "imagefile" name ="file" placeholder="File" accept="image/png, image/jpeg" defaultValue={data.file_path} onChange={(e)=>{setFile(e.target.files[0]); console.warn("File Name",e.target.files.name)}} /><span id='val'></span>
        <label id="filename">{data.file_path}</label><br />
        <select name="allocated_to" id="allocated_to" className="form-control" defaultValue={data.allocated_to} onChange= {(e)=>setAllocatedto(e.target.value)} ><br />
        <option value="Database Administration">Database Administration</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Team Lead">Team Lead</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Tester">Tester</option>
            </select><br />
            <select name="project_type" id="project_type" className="form-control" defaultValue={data.project_type} onChange= {(e)=>setAllocatedto(e.target.value)} ><br />
            <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
            </select><br />
        <input type="text" placeholder="Description" defaultValue={data.description} onChange={(e)=>{setDescription(e.target.value);}} className="form-control" /><br />
        <button className="btn btn-primary" onClick = {()=>updateprojects(params.id)}>Update Product</button>
        </div>
    )
}
export default Updateproject;