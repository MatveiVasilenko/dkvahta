import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Auth from './routes/Auth/Auth';
import Main from './routes/Main/Main';
import ContextUsers from './context/Users/ContextUsers';
import ReducerUsers from './context/Users/ReducerUsers';
import StateUsers from './context/Users/StateUsers';
import Collective from './routes/Collective/Collective';
import Employer from './routes/Employer/Employer';
import Schedule from './routes/Schedule/Schedule';
import Visits from './routes/Visits/Visits';
import Companies from './routes/Companies/Companies';
import ProtectedRoute from './routes/ProtectedRoute';
import Trash from './routes/Trash/Trash';
import Search from './routes/Search/Search';
import IndSchedule from './routes/IndSchedule/IndSchedule';
import Actions from './routes/Actions/Actions';

function App() {
  const [stateMain, dispatchMain] = React.useReducer(ReducerUsers, StateUsers)
  return (
    <Switch>
      <Route path="/" exact component={Auth}/>
      <ContextUsers.Provider value={{stateMain, dispatchMain}}>
        <ProtectedRoute>
          <Route path="/general" component={Main}/>
          <Route path="/collective" component={Collective}/>
          <Route path="/employer" component={Employer}/>
          <Route path="/schedule" component={Schedule}/>
          <Route path="/ind_schedule" component={IndSchedule}/>
          <Route path="/visits" component={Visits}/>
          <Route path="/companies" component={Companies}/>
          <Route path="/search" component={Search}/>
          <Route path="/actions" component={Actions}/>
          <Route path="/trash" component={Trash}/>
        </ProtectedRoute>        
      </ContextUsers.Provider>
    </Switch>
  );
}

export default App;
