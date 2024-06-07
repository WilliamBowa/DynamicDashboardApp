import logo from './logo.svg';
import './App.css';
import DataTable  from './Components/DataTable/index.tsx';
import DataVisualization from "./Components/DataVisualization/DataVisualization.tsx";
import { Routes, Route } from 'react-router-dom';
import NavBar from "./Components/NavBar/index.tsx";
import "bootstrap/dist/css/bootstrap.min.css"
import userDataContext from './context/userDataContext.ts';
import useDataService from './service/UseDataService.ts';

function App() {
  var servicedata = useDataService()

  return (
    <userDataContext.Provider value={servicedata}>
      <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<DataTable />} />
            <Route path="/dataView" element={<DataVisualization />} />
        </Routes>
          {/* <DataTable />
          <DataVisualization/> */}
      </div>
    </userDataContext.Provider>

  );
}

export default App;
