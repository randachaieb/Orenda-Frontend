
import { useState } from 'react'
import { useHistory } from 'react-router'
import axios from "axios"
import './auth.css'
import manCeo from "../../assets/manCeo.jpg";
import manCto from "../../assets/manCto.jpg";
import womanManager from "../../assets/womanManager.jpg";

const Signup = ()=>{
    const[ name, setName]= useState('');
    const[ bio, setBio]= useState('');
    const[ email, setEmail]= useState('');
     const[ region, setRegion]= useState('');
     const[ address, setAddress]= useState('');
     
    const[ pass, setPass]= useState('');
    const router = useHistory();

 

    function handleSubmit(e) {
    e.preventDefault()
        console.log({name , bio, email, pass, address, region})
    axios({ method: 'POST', 
    url: 'http://localhost:5000/api/v1/user', 
    headers: { 'Content-Type': 'application/json'}, 
    data: {
    name: name,
    email: email,
    password: pass,
    } 
   
        }).then((res)=> {
           
                router.push('/')
           
        },
          (error) => {
                    console.log(error.response);
                })};

   return( <div className='items'>
       <div className="centered">
           <section className="cardsCreator">
               <article className="cardAuthor">
                   <a href="#">
                       <picture className="thumbnail">
                           <img src={manCeo}
                                class="imageCreator"
                                alt="A banana that looks like a bird" />
                       </picture>
                       <div className="card-content">
                           <h2>Vacation Image 01</h2>
                           <p>Find or post  places and offers.</p>
                       </div>
                   </a>
               </article>
               <article className="cardAuthor">
                   <a href="#">
                       <picture className="thumbnail">
                           <img src={manCto}
                                class="imageCreatorCto"
                                alt="Norwegian boller"/>
                       </picture>
                       <div className="card-content">
                           <h2>Vacation Image 02</h2>
                           <p>Being exposed to a huge network of creative People.</p>
                       </div>
                   </a>
               </article>
               <article className="cardAuthor">
                   <a href="#">
                       <picture className="thumbnail">
                           <img src={womanManager}
                                class="imageCreator"
                                alt="A dinosaur wearing an aluminium jacket"/>
                       </picture>
                       <div className="card-content">
                           <h2>Vacation Image 03</h2>
                           <p>Have fun wihle exploring New places, offers and people.</p>
                       </div>
                   </a>
               </article>
           </section>
       </div>
    <div className='card-signup' >
        <div className='card-content'>
      <div className='mrg'>
            <label className='center' >Create an account</label>
            </div>
            <div className='space-between'>
            <div className='inputs'>
            <input  className='form-ctrl mrg-input' placeholder='Full Name'  variant='filled' type='text' onChange={e=>setName(e.target.value)}/>            
            <input  className='form-ctrl mrg-input' placeholder='Email'  variant='filled' type='email' onChange={e=>setEmail(e.target.value)}/>
            <input  className='form-ctrl mrg-input' placeholder='Password' variant='filled'  type='password' onChange={e=>setPass(e.target.value)}/>
            <input  className='form-ctrl mrg-input' placeholder='Confirm Password' variant='filled'  type='password' onChange={e=>setPass(e.target.value)}/>
           </div>
            </div>
            <button className='btn-login mrg' onClick={e=> handleSubmit(e)}>Sign up</button>
        </div>
        <div className="create-account">
            <div className='footer-card'>
             <span className='log' onClick={e=> router.push('/')} >I already have an account</span>
              
             </div>
        </div>
    </div>
    </div>)
}
export default Signup