
import { Routes ,Route} from 'react-router-dom';
import Layout from './components/Home/Layout';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Dashboard from './components/Dashboard.jsx/Dashboard';
import CompleteSignup from './components/Login/CompleteSignup';


function App() {
  return (
    <div >
     <Routes>
     <Route path="/" element={<Layout/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={<Signup/>}/>
     <Route path="/dash/*" element={<Dashboard/>}/>
     <Route path="/complete" element={<CompleteSignup/>}/>
     </Routes>
    </div>
  );
}

export default App;
