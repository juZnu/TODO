import './App.css';
import Home from './Home';
import TodayTasks from './TodayTasks';
import {MyProvider} from './Context/MyProvider'
function App() {
  return (
    <MyProvider>
      <div >
        <Home />
        <TodayTasks />
      </div>
    </MyProvider>
  );
}

export default App;
