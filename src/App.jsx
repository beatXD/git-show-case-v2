import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useGitHubProfile } from './hooks/useGitHubData';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Activity from './pages/Activity';
import ProjectDetail from './components/projects/ProjectDetail';
import NotFound from './pages/NotFound';
import Loading from './components/common/Loading';
import './App.css';

function App() {
  const username = import.meta.env.VITE_GITHUB_USERNAME;
  const { profile, loading: profileLoading } = useGitHubProfile(username);

  if (!username) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Configuration Required
          </h2>
          <p className="text-gray-600 mb-4">
            Please set your GitHub username in the environment variables.
          </p>
          <div className="text-left bg-gray-100 p-4 rounded-lg max-w-md">
            <p className="text-sm text-gray-700 mb-2">
              Create a <code className="bg-gray-200 px-1 rounded">.env</code> file with:
            </p>
            <code className="text-sm text-gray-800">
              VITE_GITHUB_USERNAME=your-username
            </code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        {profileLoading ? (
          <div className="h-16 bg-white border-b border-gray-200"></div>
        ) : (
          <Header profile={profile} />
        )}

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:projectName" element={<ProjectDetail />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        {profileLoading ? (
          <div className="h-32 bg-gray-50"></div>
        ) : (
          <Footer profile={profile} />
        )}
      </div>
    </Router>
  );
}

export default App;