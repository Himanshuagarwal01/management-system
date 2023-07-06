//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import DeviceDetailsTable from './components/Device/DeviceDetailsTable';

function App() {
  return (
   <>
   <Router>
    <Header/>
    <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/deviceDetails/*' Component={DeviceDetailsTable}/>
      <Route path='/comments' />
    </Routes>
   </Router>
   </>
  );
}

export default App;
