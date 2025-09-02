import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal';
import './Taskdata.css'; // Add this import for custom styles


const Taskdata = () => {
  const [dltdata,setDeltdata]=useState(
    {
  "employeeId": "",
  "removedRemarks": "test",
  "createdBy": 1
}
)

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 let [user,setUser]=useState()
//  let [val,setVal]=useState()
   
    let navigate=useNavigate();

 function getUser(){

axios("http://208.109.34.247:8012/Employee/GetAllEmployeeDetails")
.then(val=>{
// console.log(val);
console.log(val);

      setUser(val.data. employeeList)

})
 }
    useEffect(()=>{
getUser()
    },[])

//       function getDetails(){
// setUser()
// console.log(user.employeeList);}

const customstyle = {
  rows: {
    style: {
      minHeight: "72px",
      backgroundColor: "#f8f9fa", // Light background for rows
      textAlign: "center",
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
      backgroundColor: '#007bff', // Bootstrap primary color
      color: '#fff',
      fontWeight: 'bold',
      textAlign: "center",
    },
  },
  cells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
      textAlign: "center",
    },
  },
  headRow: {
    style: {
      backgroundColor: '#007bff',
      color: '#fff',
      textAlign: "center",
    },
  },
};

    let col=[
      {
       name:'EmployeeId',
        selector:row=>row.employeeId
      },
      {
        name:'EmployeeName',
        selector:row=>row.employeeName
      },
      {
        name:'Mobile',
        selector:row=>row.mobile
      },
      {
        name:'userName',
        selector:row=>row.userName
      },

      
   {
     name:"Edit",
     selector:row=><Button  onClick={()=>navigate('/taskdataform2',{state:{row,edit:true}})}>Edit</Button>
   },
    {
            name:'Delete',
            selector:row=><Button  onClick={()=>deltHandler(row.employeeId)}>Delete</Button>
        }
    

    ]

    function deltHandler(id){

      setDeltdata({...dltdata,employeeId:id})

handleShow()

    }
      
    function deleteUser(e){
      e.preventDefault()
        console.log(dltdata);
        handleClose()
        
        
        axios.post(`http://208.109.34.247:8012/Employee/RemoveEmployee`,dltdata)
        .then(getUser())
        .then(
            // alert('user deleted successfully')
  Swal.fire({
  title: "Delete!",
  text: "User deleted successfully",
  icon: "success"
})



        )

       
    }



  return (
    <div className="taskdata-container">
<DataTable 

columns={col}
data={user}
highlightOnHover
pagination

paginationRowsPerPageOptions={[20]}

customStyles={customstyle}
className="colorful-table"
/>
<Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton style={{ backgroundColor: "#007bff", color: "#fff" }}>
        <Modal.Title>Delete Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={deleteUser} className="colorful-form">
          <div className="form-group mb-3">
            <label>Employee ID</label>
            <input
              className="form-control"
              placeholder="createdby"
              name="employeeId"
              value={dltdata.employeeId}
              disabled
              style={{ backgroundColor: "#e9ecef" }}
            />
          </div>
          <div className="form-group mb-3">
            <label>Remarks</label>
            <input
              className="form-control"
              placeholder="remarks"
              name="removedRemarks"
              value={dltdata.removedRemarks}
              onChange={(e) => setDeltdata({ ...dltdata, [e.target.name]: e.target.value })}
              style={{ backgroundColor: "#fffbe6" }}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-danger">Delete</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
    <div className="d-flex justify-content-end mt-3">
      <Button variant="success" onClick={() => navigate('/taskdataform2')}>Add Details</Button>
    </div>
  </div>
)
}

export default Taskdata