import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


const Taskdataform2 = () => {

  let location=useLocation()
  console.log(location.state); 

  let navigate=useNavigate()


  const [isEdit,setIsEdit]=useState(location.state?.edit||false)
  console.log(isEdit);
  


  
    let [user,setUser]=useState(

  {
  employeeId: 0,
  employeeName: "",
  mobile: "",
  userName: "",
  password: "",
  confirmPassword: ""
  

  }
)

// isEdit && setUser(location.state.row)
// console.log(user);


  function getDetails(e){
setUser({...user,[e.target.name]:e.target.value})
console.log(user);

  }

  function togetdetails(e){
    e.preventDefault();
    console.log(user);

    if(isEdit){
      {
       axios.post('http://208.109.34.247:8012/Employee/InsertEmployee',user)
    .then(
      
Swal.fire({
  title: "Drag me!",
  icon: "success",
  draggable: true
})

// 
    )
    .catch(err=>{
      console.log(err);
      

    })

      }
    }else{
       axios.post('http://208.109.34.247:8012/Employee/InsertEmployee',user)
    .then(
      alert('user createdd successfully')
    )
    .catch(err=>{
      console.log(err);
      

    })
    }
   
    navigate('/taskdata')
  }


  useEffect(()=>{

    if(isEdit){
      setUser(location.state.row)
    }

  },[])


  return (
    <div className="taskdataform2-container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
    <form onSubmit={togetdetails} className="colorful-form2 p-4 rounded shadow">
      <h3 className="text-center mb-4" style={{ color: "#007bff" }}>
        {isEdit ? "Edit Employee" : "Add Employee"}
      </h3>
      {/* <input ... disabled/> */}
      <div className="form-group mb-3">
        <input
          className="form-control colorful-input"
          placeholder="Employee Name"
          name="employeeName"
          onChange={getDetails}
          value={user.employeeName}
        />
      </div>
      <div className="form-group mb-3">
        <input
          className="form-control colorful-input"
          placeholder="Mobile"
          name="mobile"
          onChange={getDetails}
          value={user.mobile}
        />
      </div>
      <div className="form-group mb-3">
        <input
          className="form-control colorful-input"
          placeholder="UserName"
          name="userName"
          onChange={getDetails}
          value={user.userName}
        />
      </div>
      <div className="form-group mb-3">
        <input
          className="form-control colorful-input"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={getDetails}
          value={user.confirmPassword}
        />
      </div>
      <div className="form-group mb-4">
        <input
          className="form-control colorful-input"
          placeholder="Password"
          name="password"
          onChange={getDetails}
          value={user.password}
        />
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary colorful-btn"
          type="submit"
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </div>
    </form>
  </div>
  )
}

export default Taskdataform2