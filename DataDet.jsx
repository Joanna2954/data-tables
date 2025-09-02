import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component';


const DataDet = () => {
     const [user,setUser]=useState()


    function getUsers(){
      axios('http://92.205.109.210:8051/api/getall')
      .then(val=>{
        // console.log(val);
                console.log(val.data);

                setUser(val.data.data)
                
        
      })
    }

    useEffect(()=>{
getUsers()
    },[])



    let col=[
      {
        name:'Name',
        selector:row=>row.name
      },
       {
        name:'Student id',
        selector:row=>row.studentId
      },
       {
        name:'Roll Number',
        selector:row=>row.rollno
      },
       {
        name:'Year',
        selector:row=>row.year
      },
      {
        name:'Department',
        selector:row=>row.department
      },
      {
        name:'Gender',
        selector:row=>row.gender
      },
      

    ]
  return (
    <div>

<DataTable
columns={col}
data={user}
highlightOnHover
pagination
selectableRowsHighlight
/>


    </div>
  )
}

export default DataDet