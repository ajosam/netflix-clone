import React,{useEffect,useState} from 'react'
import Youtube from 'react-youtube'
import './RowPost.css'
import axios from '../../axios'
import { imageUrl,API_KEY } from '../../constants/constants'



function RowPost(props) {
    
    const [movies, setMovies] = useState([])
    const [urlId, setUrlId] = useState('')
    useEffect(() => {
        axios.get(props.url).then((response)=>{
            console.log(response.data)
            setMovies(response.data.results)
        }).catch(err=>{
            alert('Network error')
        })
     }, [])
     
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
    
    const handleClick = (id) =>{
        console.log(id)
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
            console.log(response.data)
            if(response.data.results.length !==0){
                setUrlId(response.data.results[0])
            }else{
                console.log("Trailer not available")
            }
        })
      }
    
   
    return (
        <div className="row">
            <h2>{props.title}</h2>
            <div className="posters">
                {
                    movies.map((obj)=>{
                        return(
                            <div>
                                <img onClick={()=>handleClick(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${movies ? imageUrl+obj.backdrop_path : ""}`} alt="poster" />
                            </div>
                           
                        )
                        
                    })
                }
               
                
            </div>
            {  urlId && <Youtube videoId={urlId.key} opts={opts} /> }
        </div>
    )
}

export default RowPost
