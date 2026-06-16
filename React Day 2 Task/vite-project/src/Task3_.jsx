import { useState } from "react";

export default function ThemeSwitcher(){
  const [darkMode,setDarkMode]=useState(false);

  return(
    <div className={darkMode ? "card dark" : "card"}>
      <h2>Appearance Switcher</h2>
      <button onClick={()=>setDarkMode(!darkMode)}>
        Change Theme
      </button>
    </div>
  );
}
