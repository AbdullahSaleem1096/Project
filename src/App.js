import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OnlineStore from './components/OnlineStore';
import Messaging from './components/Messaging';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OnlineStore />} />
        <Route path="/chat" element={<Messaging />} />
      </Routes>
    </Router>
  );
}

export default App;
