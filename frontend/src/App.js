// App.jsx
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* Header/Navbar can go here if needed */}
      <Outlet /> {/* This renders the matched route component */}
    </div>
  );
}

export default App;
