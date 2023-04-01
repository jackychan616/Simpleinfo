import { useState } from 'react';
import styles from '../../page.module.css'
export default function Page() {
  const file = require("../../../data/Blog.json")
  const [likes, setLikes] = useState(file[0]["like"]);
  function click(){
    setLikes(likes + 1)
  }
  return (
    <div>

      <button onClick={click}>Likes ({likes})</button>
    </div>
  );
} 

