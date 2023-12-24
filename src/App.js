import logo from './logo.svg';
import './App.css';
import AllRoutes from './AllRoutes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <AllRoutes/>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
