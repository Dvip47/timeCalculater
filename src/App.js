import './App.css';
import AllTab from './Component/AllTab';
import Greeting from './Component/Greeting';
import '@fortawesome/fontawesome-free/css/all.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Greeting />
        <AllTab />
      </header>
    </div>
  );
}

export default App;
