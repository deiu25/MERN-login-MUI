import { useEffect } from "react";
import { Provider } from 'react-redux';

import store from './store';
import { loadUser } from "./actions/userActions";

import MainComponent from './MainComponent';

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default App;
