import { useState } from "react";

export default function NameCard(){
  const [name,setName]=useState("");

  return(
    <div className="card">
      <h2>User Profile</h2>
      <input
        type="text"
        placeholder="Type your name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />
      <p>Welcome {name || "Guest"}!</p>
    </div>
  );
}
