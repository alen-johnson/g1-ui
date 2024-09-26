import './App.css';
import { CreateGame, GameMode, Home, Settings } from './pages/pagesIndex';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {GameRun} from './components/componentsIndex'

function App() {
  return (
    <div className="App">
 <BrowserRouter>
 <Routes>
     <Route path='/'  element={<Home/>} />
     <Route path='/gamerun'  element={<GameRun/>} />
    <Route path='/gamemode' element={<GameMode/>} />
    <Route path='/settings' element={<Settings/>} />
    <Route path='/createGame' element={<CreateGame/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
