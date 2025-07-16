import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import HeroSection from '../components/home/HeroSection';
import GitHubStats from '../components/home/GitHubStats';
import ProjectCard from '../components/projects/ProjectCard';
import Loading, { SkeletonProfile, SkeletonRepositoryList } from '../components/common/Loading';
import { useGitHubDashboard } from '../hooks/useGitHubData';

const Home = () => {
  const username = import.meta.env.VITE_GITHUB_USERNAME;
  const { data, loading, error } = useGitHubDashboard(username);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SkeletonProfile />
          </div>
        </div>
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SkeletonRepositoryList count={6} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Unable to load GitHub data
          </h2>
          <p className="text-gray-600 mb-4">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const featuredRepos = data.pinnedRepos && data.pinnedRepos.length > 0 
    ? data.pinnedRepos.slice(0, 6)
    : data.repositories
        ? data.repositories
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6)
        : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <HeroSection profile={data.profile} />

      {/* GitHub Stats */}
      <GitHubStats stats={data.stats} repositories={data.repositories} />

      {/* Featured Projects */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600">
              A selection of my most notable repositories
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredRepos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <ProjectCard 
                  repository={repo} 
                  isPinned={data.pinnedRepos && data.pinnedRepos.some(p => p.id === repo.id)}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center"
          >
            <Link
              to="/projects"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>View All Projects</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Recent Activity Preview */}
      {data.activity && data.activity.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Recent Activity
              </h2>
              <p className="text-lg text-gray-600">
                Latest contributions and updates
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {data.activity.slice(0, 3).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-3 h-3 bg-green-500 rounded-full mt-2 shadow-sm"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 mb-2">
                        {event.type === 'PushEvent' ? 'Pushed to' : 'Activity on'} {event.repo.name.split('/')[1]}
                      </p>
                      <p className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                        {new Date(event.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-center"
            >
              <Link
                to="/activity"
                className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-full font-medium hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200"
              >
                <span>View All Activity</span>
                <FiArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;