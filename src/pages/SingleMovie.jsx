import axios from "axios"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

function SingleMovie() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        const movie = axios.get(`http://localhost:8000/api/movies/${id}`).then((resp) => {
            setMovie(resp.data.data);
        })
    }, [])

    console.log(movie)
}

export default SingleMovie