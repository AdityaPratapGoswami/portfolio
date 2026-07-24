import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ArticlePage from './components/ArticlePage';
import TaskTrackerPage from './components/TaskTrackerPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article/emotional-intelligence" element={<ArticlePage />} />
      <Route path="/project/okr-task-tracker" element={<TaskTrackerPage />} />
    </Routes>
  );
}

export default App;
