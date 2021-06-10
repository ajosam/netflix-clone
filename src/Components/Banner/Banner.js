import React,{useEffect, useState} from 'react'
import {API_KEY,imageUrl} from '../../constants/constants'
import axios from '../../axios'
import './Banner.css'



function Banner() {
//     const [ran,setRan] = useState('')
// const min = 0;
//     const max = 20;
    
//     setRan(min + Math.random() * (max-min))
const [movie, setMovie] = useState()


    useEffect(() => {
        

        axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
           
            console.log(response.data.results[0])
            setMovie(response.data.results[Math.floor(Math.random() * (20 - 0) + 0)])
        })
    }, [])


   

    

   
    return (
        <div
        style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path : ""})`}}
         className="Banner">
         <div className="content">
             <h1 className="title">{movie ? movie.title : ""}</h1>
             <div className="banner_buttons">
                 <button className="button">Play</button>
                 <button className="button">My List</button>
             </div>
             <h1 className="discription">{movie ? movie.overview : ""}</h1>
         </div>   
         <div className="fade_bottom"></div>
        </div>
    )
}

export default Banner
