import RouterApp from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(): JSX.Element {
  return (
    <div>
      <ToastContainer autoClose={3000}></ToastContainer>
      <RouterApp/>
    </div>
  );
}

export default App;