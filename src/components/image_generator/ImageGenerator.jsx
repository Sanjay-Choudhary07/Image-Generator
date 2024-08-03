import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import defaultImage from '../assets/aiart.jpg';

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState("/");
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (inputRef.current.value === "") {
      return;
    }

    setLoading(true);

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`,
         "User-Agent": "Chrome",
      },
      body: JSON.stringify({
        prompt: inputRef.current.value,
        n: 1,
        size: "512x512",
      }),
    });

    let data = await response.json();
    let dataArray = data.data;
    setImageUrl(dataArray[0].url);
    setLoading(false);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">AI Image <span>Generator</span></div>
      <div className="subheader">
        <h1>Turn imagination into art.</h1>
      </div>
      <div className="subtext">
        <p>
          Created using the OpenAI API, our AI image generator brings imagination
          <br></br>
          to life, producing stunning art, illustrations, and images in seconds.
          <br></br>
          Unleash creativity and express yourself in new ways with the power of AI.
        </p>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <div className="social-icons">
        <a href="https://github.com/Sanjay-Choudhary07/Image-Generator"><i className="fa fa-github"></i></a>
      </div>
      <div className="name">
        <p>Made by <span>Sanjay</span> Choudhary</p>
      </div>
      <a href="https://www.linkedin.com/in/iamsanjaych" className="name"></a>
      <div className="img-loading">
        <div className="image"><img src={imageUrl === "/" ? defaultImage : imageUrl} alt="Generated" /></div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>Loading....</div>
        </div>
      </div>
      <div className="secondsubtext">
        <p>Simply enter a few words, and watch AI transform text into incredible art.</p>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} className="search-input" placeholder="Describe what you want to see..." />
        <div className="generate-btn" onClick={()=>{generateImage()}}>Generate</div>
      </div>
    </div>
  );
};

export default ImageGenerator;
