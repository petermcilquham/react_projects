import { useState } from 'react';
import { useEffect } from 'react';

import trollFace from '/troll-face.png';
import '~/components/memegen/memegen.css';

export function MemeGen() {
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    imageUrl: 'http://i.imgflip.com/1bij.jpg',
  });
  const [allMemes, setAllMemes] = useState<{ id: string; name: string; url: string }[]>([{ id: '', name: '', url: '' }]);

  function handleChange(event: any) {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((data) => {
        setAllMemes(data.data.memes);
      });
  }, []);

  function getMemeImg() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const newMemeUrl = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({ ...prevMeme, imageUrl: newMemeUrl }));
  }
  return (
    <>
      <header className='header'>
        <img src={trollFace} />
        <h1>Meme Generator</h1>
      </header>
      <main>
        <div className='form'>
          <label>
            Top Text
            <input type='text' placeholder='One does not simply' name='topText' onChange={handleChange} value={meme.topText} />
          </label>

          <label>
            Bottom Text
            <input type='text' placeholder='Walk into Mordor' name='bottomText' onChange={handleChange} value={meme.bottomText} />
          </label>
          <button onClick={getMemeImg}>Get a new meme image 🖼</button>
        </div>
        <div className='meme'>
          <img src={meme.imageUrl} />
          <span className='top'>{meme.topText}</span>
          <span className='bottom'>{meme.bottomText}</span>
        </div>
      </main>
    </>
  );
}
