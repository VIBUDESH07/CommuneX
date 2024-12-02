
import { Routes ,Route} from 'react-router-dom';
import Layout from './components/Home/Layout';
import Login from './components/Login/Login';


function App() {
  return (
    <div className="App">
     <Routes>
     <Route path="/" element={<Layout/>}/>
     <Route path="/login" element={<Login/>}/>
     </Routes>
    </div>
  );
}

export default App;
