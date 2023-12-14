
import { Typography } from '@mui/material';
import React from 'react';
import {Rating , CardMedia, AppBar,Toolbar,Button,Grid,Card,Stack } from '@mui/material';
import logo from '../assets/1112.png';
import profile from '../assets/boy-1.png';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState,useEffect } from 'react';
import {collection ,getDocs} from 'firebase/firestore';
import { database } from './Firebase';
import { useNavigate } from 'react-router-dom';


export default function SingleReviewPage(){
const navigate = useNavigate();


   const [ myMovieReview  , setAllMyMovieReview] = useState([])

   useEffect(() =>{
    const getAllReviews = async () =>{
        const details = collection(database,'reviews1' );
        const reviews = await getDocs(details);
        setAllMyMovieReview(reviews.docs.map((user) =>(
            {...user.data() ,id : user.id}
        )))
    }
    getAllReviews()
   }, []);
    return (

        <Stack>
           <AppBar style={{borderBottom:'1px solid grey',backgroundColor:'#80DEEA',padding:'0.5rem',}}position="static">
            <Toolbar>
            <img src ={logo} height={70} width={100}/>
            <Typography component='div' variant='h4' sx={{flexGrow:1}} style={{color:"black"}}><i>CinemaElk</i></Typography>
            <Button onClick={()=>navigate('/')} style={{backgroundColor:'#612ad9',color:'white'}}>Logout</Button>
            </Toolbar>
            </AppBar>


            <Grid container spacing={2} style={{display:'flex' ,flexWrap:'wrap'}} >

            <Grid item xs={1} style={{display:'grid' ,marginTop:'6rem',gap:'1.5rem',height:'50vh'}}>

              <HomeIcon  onClick={()=> navigate('/movies')}  sx={{fontSize:40}}  style={{backgroundColor:'#f15a25',borderRadius:'50%',padding:'0.3rem',cursor:'pointer'}}  />
              <MovieIcon onClick={()=> navigate('/reviews')} sx={{fontSize:40}} style={{borderRadius:'50%',padding:'0.3rem',cursor:'pointer'}} color='primary'/>
              <AccountCircleIcon sx={{fontSize:50}} style={{borderRadius:'50%',padding:'0.3rem',cursor:'pointer'}} color='primary' />
            
            </Grid>
             
            <Grid item xs={11}  style={{marginTop:'0.8rem'}}>

                <Typography variant="h6" >Reviews Given By sowmya</Typography>
                
                <Stack style={{display:'flex',flexWrap:'wrap'}}>
                    {
                       myMovieReview.map((review, index)=>{
                            return(
                                <Stack>
                                    <Card style={{width:'40rem',height:'16rem',padding:'0.5rem',margin:'0.5rem',border:'1px solid grey',display:'flex'}}  Key={index}>
                                        <Stack>
                                            <Typography variant="h6"onClick={()=>navigate('/singlereviews')} style={{display:'flex',borderBottom:'2px solid grey',alignItems:"center", gap:'0.5rem',padding:'0.5rem',cursor:'pointer'}}>

                                            <img style={{height:'2rem',width:'2rem'}} src={profile} />
                                            {review.name}
                                            </Typography>
                                            <Stack style={{marginTop:'0.5rem'}}>
                                             <Rating/>
                                            </Stack>
                                            <Typography variant="body1">
                                            {review.review}
                                            </Typography>
                                            <Button  style={{marginTop:'0.5rem'}} variant="contained" color="primary"> read more</Button>
                                        </Stack>
                                        <Stack>
                                            <CardMedia  component='img'  src={review.image} style={{cursor:'pointer',height:'15rem',width:'11rem',marginTop:'1rem'}} />
                                        </Stack>
                                    </Card>
                                    </Stack>
                            )
                       })
                    }
                </Stack>
                

                   </Grid>

            
                   </Grid>
                   </Stack>    
    )
    
}