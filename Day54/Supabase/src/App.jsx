import React, { useState } from 'react'
import { createClient } from "@supabase/supabase-js";
import axios from 'axios';

const supabaseUrl = 'https://xnenqbetuufqkuxzwvvy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuZW5xYmV0dXVmcWt1eHp3dnZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTgwNjYsImV4cCI6MjA3OTI3NDA2Nn0.aDiz6CDIMxvLn76hnxAifd0t7saqpuk9RM5OdkOmS5M'
const supabase = createClient(supabaseUrl, supabaseKey)

const App = () => {
  let [img, setImg] = useState(null);
  function handleChange(e){
    setImg(e.target.files[0]);
  }
  async function send(){
    if(!img){
      alert("Please select an image!")
      return;
    }
    try{
      const {data, error} = await supabase.storage.from("insta").upload("insta_images/" + img.name, img, {upsert: true});
      if(error) throw error;
      const imgUrl = `${supabaseUrl}/storage/v1/object/public/insta/insta_images/${img.name}`;
      console.log("Image URL:", imgUrl);
      let res = await axios.post('http://localhost:4000/upload',{imgUrl});
      console.log(res.data);
      
    }
    catch(error){
      alert(error)
    }
  }
  return (
    <div>
      <input type="file" onChange={handleChange}/>
      <button onClick={send}>Send</button>
    </div>
  )
}

export default App