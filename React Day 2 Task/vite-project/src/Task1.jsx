import { useState } from "react";

export default function CounterPanel(){
  const [count,setCount]=useState(0);

  return(
    <div className="card">
      <h2>Score Counter</h2>
      <p>Current Score: {count}</p>
      <button onClick={()=>setCount(prev=>prev+1)}>Increment</button>
      <button onClick={()=>setCount(prev=>prev-1)}>Decrement</button>
      <button onClick={()=>setCount(0)}>Reset</button>
    </div>
  );
}
