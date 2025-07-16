import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';
const username = import.meta.env.VITE_GITHUB_USERNAME;
const token = import.meta.env.VITE_GITHUB_TOKEN;

const githubApi = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    ...(token && { 'Authorization': `token ${token}` })
  }
});

// User profile information
export const getUserProfile = async (user = username) => {
  try {
    const response = await githubApi.get(`/users/${user}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// User repositories
export const getUserRepositories = async (user = username, options = {}) => {
  try {
    const params = {
      sort: options.sort || 'updated',
      direction: options.direction || 'desc',
      per_page: options.per_page || 30,
      page: options.page || 1,
      type: options.type || 'owner'
    };

    const response = await githubApi.get(`/users/${user}/repos`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};

// Pinned repositories
export const getPinnedRepositories = async (user = username) => {
  try {
    // GraphQL requires authentication token
    if (!token) {
      console.warn('GitHub token required for pinned repositories');
      return [];
    }

    // GitHub GraphQL API for pinned repos
    const query = `
      query($login: String!) {
        user(login: $login) {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                id
                name
                description
                url
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                  color
                }
                updatedAt
                isPrivate
                owner {
                  login
                }
                topics(first: 10) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await axios.post('https://api.github.com/graphql', {
      query,
      variables: { login: user }
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Transform GraphQL response to match REST API format
    const pinnedRepos = response.data.data.user.pinnedItems.nodes.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.url,
      stargazers_count: repo.stargazerCount,
      forks_count: repo.forkCount,
      language: repo.primaryLanguage?.name || null,
      updated_at: repo.updatedAt,
      private: repo.isPrivate,
      owner: repo.owner,
      topics: repo.topics?.nodes?.map(t => t.topic.name) || []
    }));

    return pinnedRepos;
  } catch (error) {
    console.error('Error fetching pinned repositories:', error);
    // Fallback to regular repos if GraphQL fails
    return [];
  }
};

// Repository details
export const getRepositoryDetails = async (user = username, repo) => {
  try {
    const response = await githubApi.get(`/repos/${user}/${repo}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching repository details:', error);
    throw error;
  }
};

// Repository README
export const getRepositoryReadme = async (user = username, repo) => {
  try {
    const response = await githubApi.get(`/repos/${user}/${repo}/readme`);
    // Decode base64 content
    const content = atob(response.data.content);
    return content;
  } catch (error) {
    console.error('Error fetching README:', error);
    return null;
  }
};

// Repository languages
export const getRepositoryLanguages = async (user = username, repo) => {
  try {
    const response = await githubApi.get(`/repos/${user}/${repo}/languages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching repository languages:', error);
    return {};
  }
};

// Repository contributors
export const getRepositoryContributors = async (user = username, repo) => {
  try {
    const response = await githubApi.get(`/repos/${user}/${repo}/contributors`);
    return response.data;
  } catch (error) {
    console.error('Error fetching contributors:', error);
    return [];
  }
};

// User events (activity)
export const getUserEvents = async (user = username, options = {}) => {
  try {
    const params = {
      per_page: options.per_page || 30,
      page: options.page || 1
    };

    const response = await githubApi.get(`/users/${user}/events`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching user events:', error);
    throw error;
  }
};

// User stats aggregation
export const getUserStats = async (user = username) => {
  try {
    const [profile, repos] = await Promise.all([
      getUserProfile(user),
      getUserRepositories(user, { per_page: 100 })
    ]);

    const stats = {
      totalRepos: profile.public_repos,
      totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
      followers: profile.followers,
      following: profile.following,
      languages: {}
    };

    // Calculate language usage
    const languagePromises = repos.map(repo => 
      getRepositoryLanguages(user, repo.name)
    );
    
    const languageResults = await Promise.all(languagePromises);
    languageResults.forEach(languages => {
      Object.entries(languages).forEach(([lang, bytes]) => {
        stats.languages[lang] = (stats.languages[lang] || 0) + bytes;
      });
    });

    return stats;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
};

export default githubApi;