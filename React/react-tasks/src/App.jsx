import React, { useState } from "react";
import Card from "./Card";
import Todolist from "./Todolist";

function App() {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleLike = () => {
    if (!liked) {
      setLikesCount(likesCount + 1);
      setLiked(true);
    } else {
      setLikesCount(likesCount - 1);
      setLiked(false);
    }
  };


  return (
    <>
      <Card
        title="Jaybook"
        description="This card shows like counter"
        likesCount={likesCount}
      />

      <button onClick={handleLike}>
        {liked ? "Unlike" : "Like"}
      </button>

      
      <Todolist/>
    </>
  );
}

export default App;
