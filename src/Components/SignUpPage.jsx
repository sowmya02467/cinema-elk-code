
import React, { useState } from "react";
import { Stack,Grid,Button, TextField, Link } from "@mui/material";
import logo  from "../assets/112.png"

import { auth } from "./Firebase";
import{ useNavigate} from 'react-router-dom'
import { createUserWithEmailAndPassword} from 'firebase/auth'







export  default function SignUpPage(){

    const navigate = useNavigate()
    const [email , setEmail] = useState('sowmya@google.com');
    const [password , setPassword] = useState('123456789');
    const [userName , setUserName] = useState();
  
    async function handleLogin(){
        createUserWithEmailAndPassword(auth , email , password , userName).then(userDetails =>{
            console.log(userDetails)
      alert('Account created successfully')
      navigate('/')
      
        })

        
    }
 

    return(
        <div>
           
            <Stack style={{height:'100vh',width:'100vw',backgroundColor:'#f15a25'}}>
        
        <Grid container spacing={2} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
           <Grid item xs={6}>
            <img   style={{height:'29rem',width:'19rem' ,marginLeft:'10rem' ,marginTop:'3rem'}}  src={logo}     alt="" />
            </Grid>



        <Grid item xs={6} style={{marginTop:"6rem"}}>

           <from >
               <h1 style={{color:'white',fontSize:'3.5rem'}}>cinema elk</h1>
           
           
              <TextField value={email}  onChange={(e)=> setEmail(e.currentTarget.value)} variant="outlined" type="email"  InputProps={{style: {borderRadius: '5px', marginRight:'1rem',backgroundColor:'white'},}}/>
              <TextField  value={password}   onChange={(e)=> setPassword(e.currentTarget.value)} variant="outlined" type="email"  InputProps={{style: {borderRadius: '5px', marginRight:'1rem',backgroundColor:'white'},}}/>
        </from>

<form>
<TextField   onChange={(e)=> setUserName(e.currentTarget.value)}  label = "username"  variant="outlined" type="text"  InputProps={{style: {borderRadius: '5px', width:"25rem", marginTop:"0.5rem",backgroundColor:'white'},}}/>
</form>


        <Stack>
           <Button  onClick={handleLogin} style={{width:'61%',marginTop:"1rem",backgroundColor:'#f15a25',border:'2px solid white'}}variant="contained" color="primary">
           signup
           </Button>
           <h3 style={{color:'white',marginLeft:'8rem',fontWeight:'lighter' }}> join the club   <Link  style={{cursor:'pointer' ,color:'white'}} onClick={ ()=> navigate('/')} > click here</Link></h3>
          
        </Stack>
        </Grid>
        </Grid>
       </Stack>


        </div>
    )
}