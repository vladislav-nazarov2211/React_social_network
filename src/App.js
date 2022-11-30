import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginContainer from './components/Content/Login/LoginContainer';
import MainApp from './components/Content/MainApp/MainApp';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginContainer />}/>
        <Route path='/mainApp/*' element={<MainApp />}/>
      </Routes>  
    </BrowserRouter>      
  );
}

export default App;
