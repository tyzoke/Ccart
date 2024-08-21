import { useState,useEffect } from 'react'
import { useRegisterMutation } from '../../slices/userApiSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { Card,Button, } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { setCredentials } from '../../slices/loginSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast ,ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.min.css'
import Spinner from '../../Component/Spinner'


const RegistrationScreen = () => {
   const [name,setName] = useState('')
   const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')
   const [confirmPassword,setConfirmPassword] = useState('')
   const [addharNumber,setAddhar]=useState('')
   const [contactNumber,setContactNo]=useState('')
   const [address,setAddress]=useState('')
   const [city,setCity]=useState('')
   const [state,setState]=useState('')
   const [postalCode,setPostalCode]=useState('')
   const [country,setCountry] =useState('')
   const [register,{isLoading}] = useRegisterMutation()

   const dispatch =useDispatch();
   const navigate = useNavigate();
   const {userInfo} = useSelector((state) => state.login)
   const {search}=useLocation();
   const redirect = new URLSearchParams(search).get('redirect') || '/';
   useEffect(()=>{
    if(userInfo){
      navigate(redirect)
      }
  },[userInfo,redirect,navigate])

  
const submitHandler=async(e)=>{
  e.preventDefault()
  if(password!==confirmPassword ){
    toast.error('Password and Confirm Password does not match')
    return
    }
    else{
    try{
      const res = await register({name,email,password,addharNumber,contactNumber,address,city,state,postalCode,country})
      dispatch(setCredentials({...res}))
      navigate(redirect)
      }catch(error){
        toast.error(error?.data?.message || error.error);
        }
        }

}
const resetHandler=async(e)=>{
  e.preventDefault();
  setName('')
  setEmail('')
  setPassword('')
  setConfirmPassword('')
  setAddhar('')
  setContactNo('')
  setAddress('')
}


  return (
    < >
    
        <div>
            <LinkContainer to='/'>
                <Button>GO Back</Button>
            </LinkContainer>
        </div>
        <ToastContainer/>

    <Card style={{backgroundColor:'lightgoldenrodyellow' }}>
    <div>
      <Card.Body className='bg-warning fs-5'>
        Registration
      </Card.Body>
     <form>
     <div className="mb-3">
    <label for="userName" className="form-label "><b>Name</b></label>
    <input type="text" className="form-control" id="userName" value={name} placeholder='Enter user Name' onChange={(e)=>setName(e.target.value)} />
  </div>

  <div className="mb-3">
    <label for="email" className="form-label"><b>Email address</b></label>
    <input type="email" className="form-control" id="email" value={email} placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)} />
  </div>

  <div className="mb-3">
    <label for="password" className="form-label"><b> Password</b></label>
    <input type="password" className="form-control" id="password" value={password} placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="confirmPassword" className="form-label"><b>Confirm Password</b></label>
    <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} placeholder='Again type Password' onChange={(e)=>setConfirmPassword(e.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="addhar" className="form-label"><b>Addhar Card Number</b></label>
    <input type="number" className="form-control" id="addhar" value={addharNumber} placeholder='Enter your addhar number' onChange={(e)=>setAddhar(e.target.value)}/>
  </div>

 

  <div className="mb-3">
    <label for="contactNo" className="form-label"><b>Contact Number</b></label>
    <input type="number" className="form-control" id="contactNo" value={contactNumber} placeholder='Enter your Contact Number' onChange={(e)=>setContactNo(e.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="address" className="form-label"><b>Full Address</b></label>
    <textarea className="form-control" id="address" value={address} placeholder='Enter full Address' onChange={(e)=>setAddress(e.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="city" className="form-label"><b>City</b></label>
    <textarea className="form-control" id="city" value={city} placeholder='Enter City' onChange={(e)=>setCity(e.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="postalCode" className="form-label"><b>Postal Code</b></label>
    <textarea className="form-control" id="postalCode" value={postalCode} placeholder='Enter Postal Code' onChange={(e)=>setPostalCode(e.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="state" className="form-label"><b>State</b></label>
    <textarea className="form-control" id="state" value={state} placeholder='Enter full Address' onChange={(e)=>setState(e.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="country" className="form-label"><b>Country</b></label>
    <textarea className="form-control" id="country" value={country} placeholder='Enter full Address' onChange={(e)=>setCountry(e.target.value)}/>
  </div>

  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="C-1"/>
    <label className="form-check-label" for="C-1">Accept term and Conditions</label>
  </div>
  <button type="submit" className="btn btn-primary" onClick={submitHandler}>Submit</button>
  <button type='reset' id='btn2' className='btn btn-danger' onClick={resetHandler}>Reset</button>
  {isLoading && <Spinner/>}
</form>
</div>
</Card>
    </>
  )
}

export default RegistrationScreen