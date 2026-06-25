import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TestPage from './components/TestPage';
import Results from './components/Results';
import History from './components/History';

function App() {
  // Mock user object since we don't need authentication
  const mockUser = {
    displayName: 'Student',
    email: 'student@test.com',
    uid: 'mock-user-id'
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={mockUser} />} />
        <Route path="/test/:testId" element={<TestPage user={mockUser} />} />
        <Route path="/results/:attemptId" element={<Results user={mockUser} />} />
        <Route path="/history" element={<History user={mockUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
