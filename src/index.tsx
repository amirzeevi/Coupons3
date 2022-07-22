import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Layout from './Components/layout/layout';
import './index.css';
import { store } from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Layout />
    </Provider>
  // </React.StrictMode>
);
