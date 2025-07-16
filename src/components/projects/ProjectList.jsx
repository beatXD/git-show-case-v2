import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import FilterBar from './FilterBar';
import { EmptyState, SkeletonRepositoryList } from '../common/Loading';
import { filterRepositories, sortRepositories } from '../../utils/formatters';

const ProjectList = ({ 
  repositories, 
  pinnedRepos, 
  loading, 
  error, 
  showPinned = true 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [sortBy, setSortBy] = useState('updated');

  // Filter and sort repositories
  const filteredAndSortedRepos = useMemo(() => {
    if (!repositories) return [];
    
    const filtered = filterRepositories(repositories, searchTerm, selectedLanguage);
    return sortRepositories(filtered, sortBy);
  }, [repositories, searchTerm, selectedLanguage, sortBy]);

  // Filter and sort pinned repositories
  const filteredPinnedRepos = useMemo(() => {
    if (!pinnedRepos) return [];
    
    const filtered = filterRepositories(pinnedRepos, searchTerm, selectedLanguage);
    return sortRepositories(filtered, sortBy);
  }, [pinnedRepos, searchTerm, selectedLanguage, sortBy]);

  if (loading) {
    return (
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-96 animate-pulse"></div>
          </div>
          <SkeletonRepositoryList count={9} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyState 
            title="Failed to load repositories"
            description={error}
            icon="😞"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My Projects
          </h1>
          <p className="text-lg text-gray-600">
            A collection of my open source projects and contributions
          </p>
        </motion.div>

        {/* Filter Bar */}
        <FilterBar
          repositories={repositories}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Pinned Repositories */}
        {showPinned && filteredPinnedRepos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center space-x-2 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Pinned Repositories</h2>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {filteredPinnedRepos.length}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPinnedRepos.map((repo) => (
                <ProjectCard key={repo.id} repository={repo} isPinned={true} />
              ))}
            </div>
          </motion.div>
        )}

        {/* All Repositories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {showPinned ? 'All Repositories' : 'Repositories'}
              </h2>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {filteredAndSortedRepos.length}
              </span>
            </div>
            
            {filteredAndSortedRepos.length > 0 && (
              <div className="text-sm text-gray-600">
                {searchTerm && (
                  <span>
                    {filteredAndSortedRepos.length} result{filteredAndSortedRepos.length !== 1 ? 's' : ''} for "{searchTerm}"
                  </span>
                )}
                {selectedLanguage && (
                  <span>
                    {searchTerm ? ' in ' : ''}{selectedLanguage}
                  </span>
                )}
              </div>
            )}
          </div>

          {filteredAndSortedRepos.length === 0 ? (
            <EmptyState
              title="No repositories found"
              description={
                searchTerm || selectedLanguage
                  ? "Try adjusting your search or filter criteria"
                  : "No repositories available"
              }
              icon="🔍"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedRepos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                >
                  <ProjectCard repository={repo} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Load More Button (if needed) */}
        {filteredAndSortedRepos.length > 0 && filteredAndSortedRepos.length % 30 === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center mt-12"
          >
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Load More Repositories
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;