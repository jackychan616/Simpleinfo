import { useState } from 'react';

export default function Page() {
  const file = require("../../../data/Blog.json")
  const [likes, setLikes] = useState(file[0]["like"]);

  const click = () => {
    setLikes(likes + 1);
  }

  return (
    <div>
      <button onClick={click}>Likes ({likes})</button>
    </div>
  );
}

