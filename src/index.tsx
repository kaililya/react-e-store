import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './components/app/app';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import { setupStore} from './services/store';


const store = setupStore()
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
if (!window.location.pathname.includes('/react-e-store')) {
  window.history.replaceState(
    '',
    '',
    '/react-e-store' + window.location.pathname
  );
};
root.render(
    <Router basename='/react-e-store'>
     <React.StrictMode>
        <Provider store={store}>
         <App />
        </Provider>
     </React.StrictMode>
    </Router>
);

reportWebVitals();
