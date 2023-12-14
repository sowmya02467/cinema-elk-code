
import { AppBar, Toolbar ,Button, Typography, Grid, CardMedia} from "@mui/material";
import React, { useEffect, useState }  from "react";
import logo  from '../assets/1112.png'
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios";
import { Card } from "antd";

import '../App.css'
import { useNavigate } from "react-router-dom";



const nowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=23d349ce8dc584da3f1863464d8d5c91`
const Popular =        `https://api.themoviedb.org/3/movie/popular?api_key=23d349ce8dc584da3f1863464d8d5c91`;
const TopRated =       `https://api.themoviedb.org/3/movie/top_rated?api_key=23d349ce8dc584da3f1863464d8d5c91`;
const UpComing =       `https://api.themoviedb.org/3/movie/upcoming?api_key=23d349ce8dc584da3f1863464d8d5c91`;
const MoviesImages =   `https://image.tmdb.org/t/p/w500`





export default function MoviePage(){
  const navigate  = useNavigate()

   const[playingNow, setPlayingNow] = useState([])
    const[popularMovies, setPopularMovies] = useState([]);
    const [TopRatedMovies , setTopRatedMovies] = useState([]);
    const [upComingMovies , setUpComingMovies] = useState([]);

    
   useEffect(()=>{
      axios.get(nowPlaying).then((render)=>{
        setPlayingNow(render.data.results)
        console.log(render.data.results)
      })
   }, [])
    
   useEffect(()=>{
    axios.get(Popular).then((render)=>{
      setPopularMovies(render.data.results)
        console.log(render.data.result)

    })

   }, [])


   useEffect(()=>{
    axios.get(TopRated).then((render)=>{
     setTopRatedMovies(render.data.results)
        console.log(render.data.result)

    })

   }, [])


   useEffect(()=>{
    axios.get(UpComing).then((render)=>{
      setUpComingMovies(render.data.results)
        console.log(render.data.result)

    })

   }, [])


   function handlelogin(){

    navigate('/')
  
}

function handlemyallreviews(){

navigate('/myallreviews/:id')

}

function handlereviews(){

navigate('/reviews')

}







    return(
        <div style={{backgroundColor:"#FFCDD2"}}>
         <AppBar style={{border:'1px solid grey',backgroundColor:'#80DEEA',padding:'0.5rem' }}position="static">
          <Toolbar>
            <img src={logo}  height={70} width={100}alt="" />
            <Typography   component='div' variant='h4' sx={{flexGrow:1}} style={{color:"black"}}> <li>CINEMA ELK</li></Typography>
            <Button    onClick={handlelogin}  style={{backgroundColor:'#612ad9',color:'white'}}>logout</Button>
           </Toolbar>
     </AppBar>


  <Grid container spacing={2}>
      <Grid item xs={1} style={{display:'grid' ,marginTop:'6rem',gap:'1.5rem',height:'50vh'}}   >
        <HomeIcon      sx={{fontSize:40}}  style={{backgroundColor:'#f15a25' ,borderRadius:'50%',padding:'0.3rem',cursor:'pointer'}}  />
        <MovieIcon   onClick={handlereviews}    sx={{fontSize:50}} style={{borderRadius:'50%',padding:'0.3rem',cursor:'pointer'}} color='primary'   />
        <AccountCircleIcon   onClick={handlemyallreviews}   sx={{fontSize:50}} style={{borderRadius:'50%',padding:'0.3rem',cursor:'pointer'}} color='primary'   />
      </Grid>


     


     <Grid item xs={11} className='scroll'  style={{ marginLeft:"5rem" , marginTop:'-18rem'}}>
        <div >
            <Typography component='div' variant='h5' sx={{flexGrow:1}} style={{color:"black"}} >Now Playing</Typography>
            <div className='scrollBar'>
         {playingNow.map((playing , index)=>{
          return(
            <div>
            <Card  style={{width:'12rem',height:'18rem',padding:'0.3rem',margin:'0.5rem',border:'1px solid grey'}}  Key={index} >
           <CardMedia component='img' onClick={()=> navigate(`/details/${playing.id}`,{state:playing})} src={MoviesImages + playing.poster_path} style={{cursor:'pointer',height:'11rem',width:'9rem',paddingLeft:'0.4rem'}}/>
            <Typography  variant="body1" >
              <div>
            { playing.title }
            </div>
             </Typography>
               </Card>
               </div>
             )

             })}
            </div>
     </div>
       
       <div>
        <Typography  component='div' variant='h5' sx={{flexGrow:1}} style={{color:"black"}}>TopRatedMovies</Typography>
        <div className='scrollBar'>
            {popularMovies.map((playing , index)=>{
                return(
                    <div>
                        <Card style={{width:'12rem',height:'18rem',padding:'0.5rem',margin:'0.5rem',border:'1px solid grey'}}  Key={index} >
                            <CardMedia       onClick={()=> navigate(`/details/${playing.id}`,{state:playing})}  component='img'  src={MoviesImages + playing.poster_path}  style={{cursor:'pointer',height:'11rem',width:'9rem'}} />
                            <Typography varient= "body1">
                                <div>
                                    {playing.title}
                                </div>
                            </Typography>
                        </Card>
                        </div>
                )
            })}
        </div>
       </div>

     


       <div>
        <Typography  component='div' variant='h5' sx={{flexGrow:1}} style={{color:"black"}}>  Popular</Typography>
        <div className='scrollBar'>
            {TopRatedMovies.map((playing , index)=>{
                return(
                    <div>
                        <Card style={{width:'12rem',height:'18rem',padding:'0.5rem',margin:'0.5rem',border:'1px solid grey'}}  Key={index} >
                            <CardMedia    onClick={()=> navigate(`/details/${playing.id}`,{state:playing})}     component='img'  src={MoviesImages + playing.poster_path}  style={{cursor:'pointer',height:'11rem',width:'9rem'}} />
                            <Typography varient= "body1">
                                <div>
                                    {playing.title}
                                </div>
                            </Typography>
                        </Card>
                        </div>
                )
            })}
        </div>
       </div>




       <div>
        <Typography  component='div' variant='h5' sx={{flexGrow:1}} style={{color:"black"}}>UP coming movies</Typography>
        <div className='scrollBar'>
            {upComingMovies.map((playing , index)=>{
                return(
                    <div>
                        <Card style={{width:'12rem',height:'18rem',padding:'0.5rem',margin:'0.5rem',border:'1px solid grey'}}  Key={index} >
                            <CardMedia     onClick={()=> navigate(`/details/${playing.id}`,{state:playing})}       component='img'  src={MoviesImages + playing.poster_path}  style={{cursor:'pointer',height:'11rem',width:'9rem'}} />
                            <Typography varient= "body1">
                                <div>
                                    {playing.title}
                                </div>
                            </Typography>
                        </Card>
                        </div>
                )
            })}
        </div>
       </div>

     </Grid>

</Grid>



        </div>
    )
}