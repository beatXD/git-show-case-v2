import { useMemo } from 'react';
import ProjectList from '../components/projects/ProjectList';
import { useGitHubRepositories, useGitHubPinnedRepos } from '../hooks/useGitHubData';

const Projects = () => {
  const username = import.meta.env.VITE_GITHUB_USERNAME;
  
  // Use default options to avoid re-render issues
  const defaultOptions = useMemo(() => ({}), []);
  
  const { repositories, loading: reposLoading, error: reposError } = useGitHubRepositories(username, defaultOptions);
  const { pinnedRepos, loading: pinnedLoading, error: pinnedError } = useGitHubPinnedRepos(username);

  const loading = reposLoading || pinnedLoading;
  const error = reposError || pinnedError;

  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectList
        repositories={repositories}
        pinnedRepos={pinnedRepos}
        loading={loading}
        error={error}
        showPinned={true}
      />
    </div>
  );
};

export default Projects;