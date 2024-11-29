
import { Routes ,Route} from 'react-router-dom';
import Head from './components/Home/Head';


function App() {
  return (
    <div className="App">
     <Routes>
     <Route path="/" element={<Head/>}/>
     </Routes>
    </div>
  );
}

export default App;
