import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import OnboardingSuccess from './pages/OnboardingSuccess';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact={true} path="/success" component={OnboardingSuccess} />
      <Route path="/" component={Onboarding} />
    </Switch>
  );
};

export default App;
