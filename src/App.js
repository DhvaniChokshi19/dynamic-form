import React from 'react';
import FormRenderer from "./FormRenderer.jsx";
import FORM_CONFIG from "./form-config.json";
function App() {
  return (
    <div className="App">
      <h1 style={{textAlign: "center", color: "#2c2416", fontFamily: "'Lora', serif", marginBottom: "20px"}}>Dynamic Form Renderer</h1>
      <FormRenderer config={FORM_CONFIG}/>
    </div>
  );
}

export default App;
