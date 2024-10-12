import {React} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import UserList from './components/UserList';
import Leaderboard from './components/Leaderboard';
import Navigation from './components/Navigation';


const App = () => {
  return (
    <Router>
      <div className="container App">
        <header className="hero">
          <h1>User Points Claiming System</h1>
          <p>Manage user points efficiently and view real-time leaderboards.</p>
        </header>
        <Navigation /> 
        <Routes>
          <Route exact path="/" element={<UserList />} />
          <Route exact path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
