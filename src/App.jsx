import { useState } from 'react';
import Select from "react-select"

function App() {
  const customStyles = {
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#1C1817",
    }),
    control: (provided) => ({
      ...provided,
      border: "none",
      outline: "none",
      boxShadow: "none",
      borderRadius: "0",
      backgroundColor: "#EDE0DD",
      cursor:"pointer",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#4299e1" : "#fff",
      color: state.isSelected ? "#fff" : "#4a5568",
      ":hover": {
        backgroundColor: "#EDE0DD",
      },
    }),
  };
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeURL, setMemeURL] = useState(null);
  const [loading,setLoading]=useState(false)
  const [selectedOption,setSelectedOption]=useState({ value: "imgflip", label: "imgflip" })
  const ids = [181913649,129242436,124822590	,93895088,4087833	,101470	]
  const handleChange=(selectedOption)=>{
    setSelectedOption(selectedOption)

  }
  
  const generateMeme = async () => {
    const randomIndex = Math.floor(Math.random() * ids.length);
    const randomItem = ids[randomIndex];
    setLoading(true)
    const response = await fetch(`https://api.imgflip.com/caption_image?template_id=${randomItem}&username=yahia14&password=12345Yahia&text0=${topText}&text1=${bottomText}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log(data.data.url);
      setMemeURL(data.data.url)
      setLoading(false)
    } else {
      console.error('Error generating meme');
      setLoading(false)
    }
  };

 
 


  return (
    <div className=' bg-black min-h-screen flex flex-col gap-4 justify-center items-center ' >
     <div className=' absolute py-4 px-4 top-0 w-full flex justify-start items-center ' >
     <Select
                  className="w-44"
                  styles={customStyles}
                  options={[
                    { value: "imgflip", label: "imgflip" },
                    { value: "meme generator", label: "meme generator" },
                  ]}
                  value={selectedOption}
                  onChange={handleChange}
                />

     </div>
     {selectedOption.value==="imgflip" ? <>
     <div className=' w-full flex flex-row justify-center items-center gap-2 ' >
      <input
        type="text"
        className=' outline-none border-black border-[1px] rounded-sm px-4 py-2 '
        placeholder="Top Text"
        value={topText}
        onChange={(e) => setTopText(e.target.value)}
      />
      <input
        type="text"
        className=' outline-none border-black border-[1px] rounded-sm px-4 py-2 '
        placeholder="Bottom Text"
        value={bottomText}
        onChange={(e) => setBottomText(e.target.value)}
      />
      <button className=' bg-slate-200 text-black font-semibold px-8 py-2 ' onClick={generateMeme}>Generate Meme</button>

      </div>
      
      {loading ? <p className=' text-white ' >Generating...</p>  :  memeURL && (
        <img src={memeURL} alt="Generated Meme" className='' />
      )}
     </>   :"adza" }
    </div>
  )
}

export default App
