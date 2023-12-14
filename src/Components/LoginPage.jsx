



import { Stack,Grid,Button, TextField, Link } from "@mui/material";
import logo  from "../assets/112.png"
import React, { useState } from "react";
import { auth } from "./Firebase";
import{ useNavigate} from 'react-router-dom'
import { signInWithEmailAndPassword} from 'firebase/auth'



export default function LoginPage(){
   
   const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const navigate = useNavigate();

    async function handleLogin(){
    signInWithEmailAndPassword(auth , email , password ).then(userDetails =>{
    console.log(userDetails.user)
    navigate('/movies')
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




         <Stack>
            <Button  onClick={handleLogin} style={{width:'61%',marginTop:"1rem",backgroundColor:'#f15a25',border:'2px solid white'}}variant="contained" color="primary">
               login
            </Button>
            <h3 style={{color:'white',marginLeft:'8rem',fontWeight:'lighter' }}> join the club   <Link  style={{cursor:'pointer' ,color:'white'}} onClick={ ()=> navigate('/signUp')} > click here</Link></h3>
           
         </Stack>
         </Grid>
         </Grid>
        </Stack>

      </div>
      
   )
}