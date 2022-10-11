import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import {Link, useNavigate} from 'react-router-dom';
 function Projectlist(){
    
    const [data, setData] = useState([]);
    
    // console.warn( JSON.parse(localStorage.getItem('staff-info')));
    useEffect(()=>{
        getData();
        
    },[])
   
    async function deleteoperation(id){
       let result =  await fetch("http://localhost:8000/api/delete/"+id,{
            method:"DELETE"

        });
        result = await result.json();
        getData();
    }
    
    async function getData(){
        let result =  await fetch("http://localhost:8000/api/projectlist");
        let results = await result.json();
        setData(results);
    }
    return(
        <div>
            <h1>Project List</h1>
            <h6 id="role"><u>You are logged in  to {JSON.parse(localStorage.getItem('staff-info')).login_type} role</u></h6>
            <div className="col-sm-6 offset-sm-3">
                <>
            <Table>
                <tr>
                    <td id="txtbld">Id</td>
                    <td id="txtbld">Project Name</td>
                    <td id="txtbld">Description</td>
                    <td id="txtbld">Allocated To</td>
                    <td id="txtbld">Project Type</td>
                    <td id="txtbld">File</td>
                    <td id="txtbld">Operations</td>
                </tr>
                {
                    data.map((item)=>
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.project_name}</td>
                            <td>{item.description}</td>
                            <td>{item.allocated_to}</td>
                            <td>{item.project_type}</td>
                            <td><img style={{width:100}} src={"http://localhost:8000/"+item.file_path}/></td>
                            <td><span onClick = {()=>deleteoperation(item.id)} className='delete-btn'>Delete</span>
                            
                                <Link to={"update/"+item.id}>
                                    <span className='edit-btn'>Update</span>
                                </Link>
                                </td>
                        </tr>
                    )
                }
                
            </Table>
            </>
            </div>
            
        </div>
    )
}
    

export default Projectlist;