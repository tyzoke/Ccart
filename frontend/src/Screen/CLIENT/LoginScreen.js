import React,{useState,useEffect} from 'react'
import {Card, CardBody, CardTitle,Button} from 'react-bootstrap'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Spinner from '../../Component/Spinner'
import {useLoginMutation} from '../../slices/userApiSlice'
import {setCredentials} from '../../slices/loginSlice'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.min.css'
import CheckOutSteps from '../../Component/CheckOutSteps'



const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const {search} = useLocation();
  const redirect = new URLSearchParams(search).get('redirect') || '/';
  const [login,{isLoading}] =useLoginMutation();
  const {userInfo} =useSelector((state)=>state.login);
  useEffect(()=>{
    if(userInfo){
      navigate(redirect)
      }
  },[userInfo,redirect,navigate])



const submitHandler=async(e)=>{
  e.preventDefault()
  try{
    const res=await login({email,password}).unwrap();
     dispatch(setCredentials({...res}));
     navigate(redirect);
     
  }catch(error){
    toast.error(error?.data?.message || error.error);
 
  }

}


const resetHandler=async(e)=>{
  e.preventDefault()
  setEmail('');
  setPassword('');
}

  return (
    < >
    <div className='bg-gr'>
      <div>
            <LinkContainer to='/'>
                <Button>GO Back</Button>
            </LinkContainer>
        </div>
       <ToastContainer/>
       <CheckOutSteps step1/>

       
    <div className='d-flex justify-content-center top-50' >
      <Card style={{width:'400px',height:'400px',backgroundColor:'lightgoldenrodyellow' }}>
        

       

        <CardTitle className='bg-warning text-dark'>
          <div>Login</div>
        </CardTitle>
        <CardBody>
        <form action='/login' method='POST'>
          <label for='email' className='text-secondary'><h2>User Email</h2></label><br></br><input type='email' id='email' className='form-control h2' value={email} placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}/><br/>
          <label for='pass' className='text-secondary'><h3>Password</h3></label><br></br><input type='password' className='form-control' id='pass' value={password} placeholder='Enter your Password' onChange={(e)=>setPassword(e.target.value)}/><br/>
           <button type='submit' id='btn' className='btn btn-primary' onClick={submitHandler} disabled={isLoading}><h3>Submit</h3></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           
           <button type='reset' id='btn2' className='btn btn-danger' onClick={resetHandler}><h3>Reset</h3></button><br></br><br/>
          <Link to={redirect ? `/register?redirect=${redirect}`:'/register'}>To register click here</Link>
          {isLoading && <Spinner/>}
        
        </form>
        </CardBody>
      </Card>
    </div>
    </div>
    </>
  )
}

export default LoginScreen