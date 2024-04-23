import React from "react";
import "./aboutUs.css";
import sree from "./../../assets/sree.jpeg";



function aboutUs({theme}) {
  return (
    <div className={`container ${theme}`}>
      <header>
        <h1>Made by</h1>
      </header>
      <main>
        
        <div className="team-member">
          <img src={sree} alt="Team Member 3" />
          <h2>Sreeparvathy Sajeev</h2>
          <p>22BCE0652</p>
          <p>7306084723</p>
        </div>
      </main>
      <p className="para">This project was made using the help of React and openweathermap.org API<br></br>Under the guidance of Prof. Megala G</p>
    </div>
  );
}

export default aboutUs;
