import './App.css';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import ListAssignment from './components/ListAssignment';
import GradeAssignment from './components/GradeAssignment';
import AddAssignment from './components/AddAssignment';
import EditAssignment from './components/EditAssignment';

function App() {
  return (
    <div className="App">
    <Login />
  </div>
  );
}

export default App;
