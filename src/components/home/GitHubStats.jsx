import { motion } from 'framer-motion';
import { FiStar, FiGitBranch, FiEye, FiCode } from 'react-icons/fi';
import { formatNumber, calculatePercentage, getLanguageColor } from '../../utils/formatters';

const GitHubStats = ({ stats, repositories }) => {
  if (!stats) return null;

  // Get top languages
  const topLanguages = Object.entries(stats.languages)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([language, bytes]) => ({
      name: language,
      bytes,
      percentage: calculatePercentage(bytes, Object.values(stats.languages).reduce((sum, b) => sum + b, 0))
    }));

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            GitHub Statistics
          </h2>
          <p className="text-lg text-gray-600">
            A comprehensive overview of my development activity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Stars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200"
          >
            <div className="flex items-center justify-between mb-4">
              <FiStar className="w-8 h-8 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-700">Total Stars</span>
            </div>
            <div className="text-2xl font-bold text-yellow-800">
              {formatNumber(stats.totalStars)}
            </div>
          </motion.div>

          {/* Total Forks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200"
          >
            <div className="flex items-center justify-between mb-4">
              <FiGitBranch className="w-8 h-8 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Total Forks</span>
            </div>
            <div className="text-2xl font-bold text-blue-800">
              {formatNumber(stats.totalForks)}
            </div>
          </motion.div>

          {/* Repositories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200"
          >
            <div className="flex items-center justify-between mb-4">
              <FiCode className="w-8 h-8 text-green-600" />
              <span className="text-sm font-medium text-green-700">Repositories</span>
            </div>
            <div className="text-2xl font-bold text-green-800">
              {formatNumber(stats.totalRepos)}
            </div>
          </motion.div>

          {/* Followers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200"
          >
            <div className="flex items-center justify-between mb-4">
              <FiEye className="w-8 h-8 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Followers</span>
            </div>
            <div className="text-2xl font-bold text-purple-800">
              {formatNumber(stats.followers)}
            </div>
          </motion.div>
        </div>

        {/* Languages Chart */}
        {topLanguages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-gray-50 rounded-xl p-8 border border-gray-200"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Top Languages
            </h3>
            
            <div className="space-y-4">
              {topLanguages.map((language, index) => (
                <motion.div
                  key={language.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  className="flex items-center space-x-4"
                >
                  <div className="flex items-center space-x-2 w-24">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: getLanguageColor(language.name) }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {language.name}
                    </span>
                  </div>
                  
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${language.percentage}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                      className="h-2 rounded-full"
                      style={{ backgroundColor: getLanguageColor(language.name) }}
                    />
                  </div>
                  
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {language.percentage}%
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recent Activity Summary */}
        {repositories && repositories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Most Starred
              </h4>
              {repositories
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 3)
                .map((repo, index) => (
                  <div key={repo.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">
                        {index + 1}.
                      </span>
                      <span className="text-sm text-gray-900 truncate">
                        {repo.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-600">
                      <FiStar className="w-3 h-3" />
                      <span className="text-sm">{repo.stargazers_count}</span>
                    </div>
                  </div>
                ))}
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Most Forked
              </h4>
              {repositories
                .sort((a, b) => b.forks_count - a.forks_count)
                .slice(0, 3)
                .map((repo, index) => (
                  <div key={repo.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">
                        {index + 1}.
                      </span>
                      <span className="text-sm text-gray-900 truncate">
                        {repo.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-blue-600">
                      <FiGitBranch className="w-3 h-3" />
                      <span className="text-sm">{repo.forks_count}</span>
                    </div>
                  </div>
                ))}
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Recently Updated
              </h4>
              {repositories
                .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                .slice(0, 3)
                .map((repo, index) => (
                  <div key={repo.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">
                        {index + 1}.
                      </span>
                      <span className="text-sm text-gray-900 truncate">
                        {repo.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(repo.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GitHubStats;