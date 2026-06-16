import { useState } from "react";

export default function PasswordField(){
  const [visible,setVisible]=useState(false);

  return(
    <div className="card">
      <h2>Secure Input</h2>
      <input
        type={visible ? "text" : "password"}
        placeholder="Enter password"
      />
      <button onClick={()=>setVisible(!visible)}>
        {visible ? "Conceal" : "Reveal"}
      </button>
    </div>
  );
}
