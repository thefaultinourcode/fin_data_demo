import React from "react";
import './App.css';
import LineChart from "./components/LineChart";
import 'semantic-ui-css/semantic.min.css';

function App() {
  const [style, setStyle] = React.useState('light');


  function toggle(e){
    console.log('dark mode');
    if(style === 'light'){
      setStyle('dark');
      document.getElementById('mode').innerText = "Light Mode";
    }
    else{
      setStyle('light');
      document.getElementById('mode').innerText = "Dark Mode";
    }

    alert('Dark/Light mode is a work in progress; see code for current logic (to be expanded upon)')
  }

  return (
    <div className="App">
      <div className={style}></div>
        <div className="LineChart">
          <LineChart/>
          {/* TODO: Add dark/light mode toggle */}
          <label className="switch">
            <button id="mode" className="ui button" onClick={toggle}>Dark Mode</button>
          </label>     
        </div>
    </div>
  );
}

export default App;
