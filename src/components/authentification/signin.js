import { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { AuthContext } from '../../context/authContext';
import imageWelcome from '../../assets/imageWelcome.png'
import axios from 'axios';
import './auth.css'
const Signin = ()=>{

    const router = useHistory()
    const[ email, setEmail]= useState('');
    const[ error, setError]= useState('');
     const[ token, setToken]= useState('');
    const[ password, setPass]= useState(''); 
    const authContext=useContext(AuthContext);
    function login(){
       
        const data={email, password}
         console.log(data)
       axios({ method: 'POST', 
    url: 'http://localhost:5000/api/v1/auth', 
    headers: { 'Content-Type': 'application/json'}, 
    data:data
        }).then ((res)=>{
           console.log(res.data.token)
            setToken(res.data.token)
            console.log(token)
            localStorage.setItem('token', res.data.token);
            window.location.reload(false);
        }).catch(err=> setError('Wrong details!'))
            
        
        authContext.setAuth({token,email})
    }

   return( <div className='items'>
       <div className='leftSideInfo' >
           <img
               src={imageWelcome}
               className='imageWelcome'
               alt="Login"
           />
       </div>

       <div className="sloganText">
           <div className="typing-demo">
               Invisible Power Makes Visible Changes
           </div>
           <p className="paragraphTarget">
               <div className="textTarget">
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a nisl congue, ultrices sem et, interdum libero. Sed id nisl ipsum.
                   Pellentesque vitae pharetra leo, id cursus nisi.
                   Suspendisse leo ligula, porta at arcu nec, interdum mattis sapien. Sed aliquet ornare finibus. Ut gravida lorem vel ornare mattis.
               </div>
           </p>
       </div>

    <div className='card-signin' >
      
      <div className='card-content'>
      <div className='mrg'>
            <label className='center' >Log in to your account </label>
            
            </div>
            <input  className='form-ctrl mrg-input' placeholder='Email'  variant='filled' mb={3} type='email' onChange={e=>setEmail(e.target.value)}/>
            <input  className='form-ctrl mrg-input' placeholder='Password' variant='filled' mb={6} type='password' onChange={e=>setPass(e.target.value)}/>
            {
                  error!=''?
                  <div className="alert alert-danger" role="alert">
         {error}
        </div> : null
                }
           
            <button className='btn-login mrg' onClick={e=>login(e)}>Login</button>
        </div>
        <div className="create-account">
            <div className='footer-card'>
             <span className='log' onClick={e=> router.push('/signup')} >Create an account</span>
              <span className='log' onClick={e=> router.push('/forgot')}  >Forgot password?</span>
             </div>
        </div>
        </div>
    </div>)
}
export default Signin