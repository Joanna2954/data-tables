import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2'

const Taskdata2 = () => {
    let[user,setUser]=useState()
    function getStudentdetail(){
        axios("http://92.205.109.210:8051/api/getall")
        .then(res=>{
            console.log(res);
            console.log(res.data);
            setUser(res.data.data)
            console.log(user);
            

            
            
        })

    }
     useEffect(()=>{
                getStudentdetail()
            },[])

    let col=[
        
        {
            name:'StudentID',
            selector:row=>row.studentId
        },{
            name:'Name',
            selector:row=>row.name
        },{
            name:'Rollno',
            selector:row=>row.rollno
        },{
            name:'Year',
            selector:row=>row.year
        },{
            name:'Department',
            selector:row=>row.department
        },{
            name:'Gender',
            selector:row=>row.gender
        },
        {
     name:"Edit",
     selector:row=><button onClick={()=>navigate('/dataform',{state:{row,edit:true}})}>Edit</button>
   },
        
        
        
        {
            name:'Delete',
            selector:row=><button onClick={()=>deleteUser(row.studentId)}>Delete</button>
        }
    ]


    function deleteUser(id){
        console.log(id);
        
        axios.post(`http://92.205.109.210:8051/api/delete/${id}`)
        .then(
            // alert('user deleted successfully')
            Swal.fire({
  title: "Delete!",
  text: "User deleted successfully",
  icon: "success"
})


        )

         getStudentdetail()

    }
  return (

    <div>

<DataTable 
  columns={col}
  data={user}
  pagination
  highlightOnHover

/>


    </div>
  )
}

export default Taskdata2

// npm install sweetalert2  (import Swal from 'sweetalert2') (for alert we can use this where we can many  colour and style option )