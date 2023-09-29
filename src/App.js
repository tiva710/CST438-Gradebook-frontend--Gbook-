import './App.css';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import ListAssignment from './components/ListAssignment';
import GradeAssignment from './components/GradeAssignment';
import AddAssignment from './components/AddAssignment';
import EditAssignment from './components/EditAssignment';

function App() {
  return (
    <div className="App">
      <h2>Gradebook</h2>
      <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={ListAssignment} />
              <Route path="/gradeAssignment" component={GradeAssignment} />
              <Route path="/addAssignment" component={AddAssignment} />
              <Route path="/editAssignment/:id" component={EditAssignment} />
              <Route path="/editAssignment/:id/delete" component={EditAssignment} />
              <Route render={ () => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
