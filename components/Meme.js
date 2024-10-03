import React from "react"

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
    })
    const [allMemes, setAllMemes] = React.useState([])

    const [image, setImage] = React.useState({
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })

    const [count, setCount] = React.useState(-1)

   React.useEffect(() => {
    if(image) {
        setCount(prevCount => prevCount + 1)
    }
   }, [image])
    
    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setImage(prevImage => ({
            ...prevImage,
            randomImage: url
        }))
    }

    function clearText() {
        setMeme("")
    }
    
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={event => {
                        getMemeImage();
                        clearText();
                    }}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={image.randomImage} className="meme--image" alt="random meme" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            <div>
                <h3 className="font">Number Of Memes Loaded: {count}</h3><span>
                    <button className="reset-btn" onClick={(e) => {setCount(1); clearText();}}>Reset Memes</button>
                </span>
            </div>
        </main>
    )
}