import logo from './logo.svg';
import './App.css';
import DataTable  from './Components/DataTable/index.tsx';
import DataVisualization from "./Components/DataVisualization/DataVisualization.tsx";
import { Routes, Route } from 'react-router-dom';
import NavBar from "./Components/NavBar/index.tsx";
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<DataTable />} />
          <Route path="/dataView" element={<DataVisualization />} />
       </Routes>
        {/* <DataTable />
        <DataVisualization/> */}
    </div>
  );
}

export default App;
