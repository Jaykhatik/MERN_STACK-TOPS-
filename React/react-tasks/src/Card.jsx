import React from "react";

function Card({ title, description, likesCount }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", width: "250px" }}>
      <h3>{title}</h3>
      <p>{description}</p>

      <p>👍 Likes: {likesCount}</p>
    </div>
  );
}

export default Card;
