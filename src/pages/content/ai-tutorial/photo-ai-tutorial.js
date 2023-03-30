import { useState } from 'react';


export default function Page() {
  const num = require("../../../data/Blog.json")[0]["like"]
  const [likes, setLikes] = useState(num);

  function handleClick() {
    setLikes(likes + 1);
    let data = fs.readFileSync("../../../data/Blog.json");
    const D = JSON.parse(data);
    D[0].like = likes + 1;
  }

  return (
    <div>
      <button onClick={handleClick}>Likes ({likes})</button>
    </div>
  );
}

