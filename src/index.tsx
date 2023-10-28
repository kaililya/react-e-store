import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './components/app/app';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import { setupStore} from './services/store';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './services/thunks/ActionCreators';


const store = setupStore()

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <QueryClientProvider client={queryClient}>
    <Router>
     <React.StrictMode>
        <Provider store={store}>
         <App />
        </Provider>
     </React.StrictMode>
    </Router>
  </QueryClientProvider>

);

reportWebVitals();
