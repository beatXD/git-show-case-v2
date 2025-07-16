import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

// Format number with K, M suffixes
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Format date as relative time
export const formatRelativeTime = (date) => {
  return dayjs(date).fromNow();
};

// Format date as readable string
export const formatDate = (date, format = 'MMM DD, YYYY') => {
  return dayjs(date).format(format);
};

// Format bytes to readable size
export const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Get language color mapping
export const getLanguageColor = (language) => {
  const colors = {
    JavaScript: '#f7df1e',
    TypeScript: '#007acc',
    Python: '#3572a5',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    React: '#61dafb',
    Vue: '#4fc08d',
    Angular: '#dd0031',
    Node: '#339933',
    Go: '#00add8',
    Rust: '#dea584',
    PHP: '#777bb4',
    Ruby: '#701516',
    Swift: '#fa7343',
    Kotlin: '#7f52ff',
    Dart: '#00b4ab',
    Shell: '#89e051',
    Dockerfile: '#384d54',
    YAML: '#cb171e',
    JSON: '#292929',
    Markdown: '#083fa1'
  };
  
  return colors[language] || '#586069';
};

// Calculate percentage from total
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Sort repositories by different criteria
export const sortRepositories = (repositories, sortBy) => {
  const sorted = [...repositories];
  
  switch (sortBy) {
    case 'stars':
      return sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
    case 'forks':
      return sorted.sort((a, b) => b.forks_count - a.forks_count);
    case 'updated':
      return sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    case 'created':
      return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
};

// Filter repositories by search term and language
export const filterRepositories = (repositories, searchTerm, selectedLanguage) => {
  return repositories.filter(repo => {
    const matchesSearch = !searchTerm || 
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLanguage = !selectedLanguage || 
      repo.language === selectedLanguage;
    
    return matchesSearch && matchesLanguage;
  });
};

// Get unique languages from repositories
export const getUniqueLanguages = (repositories) => {
  const languages = repositories
    .filter(repo => repo.language)
    .map(repo => repo.language);
  
  return [...new Set(languages)].sort();
};

// Format GitHub event types
export const formatEventType = (type) => {
  const eventTypes = {
    PushEvent: 'Pushed to',
    CreateEvent: 'Created',
    DeleteEvent: 'Deleted',
    ForkEvent: 'Forked',
    WatchEvent: 'Starred',
    IssuesEvent: 'Issue',
    PullRequestEvent: 'Pull Request',
    ReleaseEvent: 'Released'
  };
  
  return eventTypes[type] || type;
};

// Extract repository name from full name
export const getRepoName = (fullName) => {
  return fullName.split('/')[1];
};

// Check if repository is recently updated (within last month)
export const isRecentlyUpdated = (updatedAt) => {
  const oneMonthAgo = dayjs().subtract(1, 'month');
  return dayjs(updatedAt).isAfter(oneMonthAgo);
};

// Generate GitHub URL for repository
export const getGitHubUrl = (username, repoName) => {
  return `https://github.com/${username}/${repoName}`;
};

// Generate demo URL from repository (common patterns)
export const getDemoUrl = (repo) => {
  const { homepage, name, owner } = repo;
  
  // Check if homepage exists
  if (homepage && homepage.startsWith('http')) {
    return homepage;
  }
  
  // Check for GitHub Pages pattern (only if owner exists)
  const githubPagesUrl = owner ? `https://${owner.login}.github.io/${name}` : `https://github.io/${name}`;
  
  // Check for Netlify/Vercel deployment info in description
  if (repo.description) {
    const netlifyMatch = repo.description.match(/https:\/\/.*\.netlify\.app/);
    const vercelMatch = repo.description.match(/https:\/\/.*\.vercel\.app/);
    
    if (netlifyMatch) return netlifyMatch[0];
    if (vercelMatch) return vercelMatch[0];
  }
  
  return githubPagesUrl;
};