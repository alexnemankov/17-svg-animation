
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { AnimationPage } from './pages/AnimationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/animation/:id" element={<AnimationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
