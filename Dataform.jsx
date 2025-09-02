import axios from 'axios'
import React, { useLocation,useState } from 'react'
import { Button } from 'react-bootstrap'

const Dataform = () => {
  //   let location=useLocation()
  // console.log(location.state); 

let [user,setUser]=useState(

  {
      name:'',
      rollno:'',
      department:'',
      year:'',
      gender:''


  }
)

  function getDetails(e){
setUser({...user,[e.target.name]:e.target.value})
console.log(user);

  }

  function togetdetails(e){
    e.preventDefault();
    console.log(user);
    axios.post('http://92.205.109.210:8051/api/create',user)
    .then(
      alert('user createdd successfully')
    )
    .catch(err=>{
      console.log(err);
      

    })
  }

  return (
    <div>

        <form onSubmit={togetdetails}>
          <br></br>  <input placeholder='Name' name='name' onChange={getDetails}/><br></br>

          <br></br>  <input placeholder='Roll Number' name='rollno' onChange={getDetails}/><br></br>

            <br></br><input placeholder='Department' name='department' onChange={getDetails}/><br></br>

           <br></br> <input placeholder='Year' name='year' onChange={getDetails} /><br></br><br></br>
            


            <p>Gender selection</p>

               <label><input type='radio' value="male" name='gender' onChange={getDetails}/>male </label>
               <label><input type='radio' value="Female" name='gender'onChange={getDetails} /> female</label>
                      <label><input type='radio' value="other" name='gender' onChange={getDetails}/>other </label><br></br><br></br>
            
              <button>submit</button>
        </form>
    </div>
    
  )
}

export default Dataform