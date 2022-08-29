import axios from 'axios'
import { useEffect, useState } from 'react'
import '../style.css'
const GifPage = () => {
    const [searchInput, setSearchInput] = useState();
    const [giphyData, setGiphyData] = useState([]);
    const [temp, setTemp] = useState('trending');
    const [isLoading, setIsLoading] = useState();

    const getGifData = async (input) => {
        try {
            const res = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=sfJoNIbYEOS4pmyNpQe5lT4FkLd6xmAg&q=${input}&limit=30`)
            setIsLoading(false);
            return res.data;
        } catch (er) {
            console.log(er)
        }
    }

    useEffect(() => {
        const promise = getGifData(searchInput);
        promise.then((data) => setGiphyData(data.data.map(el => el.images.original.url)));
    }, [searchInput])

    const submitSearchInput = () => {
        setSearchInput(temp);
        setIsLoading(true);
    }

    return (<div>
        <div className='center'><b>Giphy api</b></div>
        <div className='center'><input onChange={(event) => setTemp(event.target.value)} /> <button onClick={submitSearchInput}>Search</button> </div>
        <div className='gifCon'>
            {isLoading ? <p>Loading...</p> : giphyData.map(el =>
                <img src={el} className=' gif' />
            )}

        </div>
    </div>);
}
export default GifPage