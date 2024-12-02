
import { Routes ,Route} from 'react-router-dom';
import Layout from './components/Home/Layout';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';


function App() {
  return (
    <div className="App">
     <Routes>
     <Route path="/" element={<Layout/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={<Signup/>}/>
     </Routes>
    </div>
  );
}

export default App;
