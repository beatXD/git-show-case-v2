import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { useDebounce } from '../../hooks/useDebounce';
import { getUniqueLanguages } from '../../utils/formatters';

const FilterBar = ({ 
  repositories,
  searchTerm,
  onSearchChange,
  selectedLanguage,
  onLanguageChange,
  sortBy,
  onSortChange
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  
  // Debounce search input
  const debouncedSearchTerm = useDebounce(localSearchTerm, 300);
  
  // Update parent component when debounced value changes
  useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearchChange]);

  const languages = getUniqueLanguages(repositories || []);
  
  const sortOptions = [
    { value: 'updated', label: 'Recently Updated' },
    { value: 'created', label: 'Recently Created' },
    { value: 'stars', label: 'Most Stars' },
    { value: 'forks', label: 'Most Forks' },
    { value: 'name', label: 'Name (A-Z)' }
  ];

  const handleClearFilters = () => {
    setLocalSearchTerm('');
    onSearchChange('');
    onLanguageChange('');
    onSortChange('updated');
  };

  const hasActiveFilters = searchTerm || selectedLanguage || sortBy !== 'updated';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              placeholder="Search repositories..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filter Toggle and Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isFilterOpen || hasActiveFilters
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              <FiFilter className="w-4 h-4" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                  {[searchTerm, selectedLanguage, sortBy !== 'updated'].filter(Boolean).length}
                </span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FiX className="w-4 h-4" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Options */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isFilterOpen ? 'auto' : 0,
            opacity: isFilterOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 mt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Language Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => onLanguageChange(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Languages</option>
                  {languages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="mt-4 flex flex-wrap gap-2"
        >
          {searchTerm && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              <span>Search: "{searchTerm}"</span>
              <button
                onClick={() => {
                  setLocalSearchTerm('');
                  onSearchChange('');
                }}
                className="hover:text-blue-900"
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          )}
          
          {selectedLanguage && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              <span>Language: {selectedLanguage}</span>
              <button
                onClick={() => onLanguageChange('')}
                className="hover:text-green-900"
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          )}
          
          {sortBy !== 'updated' && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
              <span>Sort: {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
              <button
                onClick={() => onSortChange('updated')}
                className="hover:text-purple-900"
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default FilterBar;