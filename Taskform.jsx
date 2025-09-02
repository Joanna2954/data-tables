import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Taskform = () => {
    let[user,setUser]=useState()
   
    
    let navigate=useNavigate();
    function getValue(){
        axios("http://92.205.109.210:8051/api/getall")
        .then(res=>{
            console.log(res.data);
            setUser(res.data.data)
            console.log(user);
            
            
        }

        )
       
    }
 useEffect(()=>{
            getValue()
        },[])


  return (
    <div>
       <Button onClick={()=>   navigate('/dataform')}>Add Details</Button>
{user && user.map(res=> (
        <div className='card'>
          
          <p >{res.name}</p>
          <p>{res.department}</p>
        <p>{res.rollno}</p>
        <p>{res.year}</p>

        </div>
       
        
      ))}
       

    </div>
  )
}

export default Taskform