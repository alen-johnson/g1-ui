import "./App.css";
import {
  CreateGamePage,
  GameModePage,
  GameRunPage,
  HelpPage,
  HomePage,
  SettingsPage,
} from "./pages/pagesIndex";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gamerun" element={<GameRunPage />} />
          <Route path="/gamemode" element={<GameModePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/createGame" element={<CreateGamePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
