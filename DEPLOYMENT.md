# GitHub Pages Deployment Instructions

## Setup Instructions

1. **Create GitHub Repository**
   - Go to [GitHub](https://github.com) and create a new repository named `gitshowcase`
   - Make it public
   - Don't initialize with README (since we already have one)

2. **Add Remote and Push**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/gitshowcase.git
   git branch -M main
   git push -u origin main
   ```

3. **Configure Environment Variables**
   - Go to your repository settings
   - Navigate to "Secrets and variables" > "Actions"
   - Add a new secret: `VITE_GITHUB_USERNAME` with your GitHub username

4. **Enable GitHub Pages**
   - Go to repository "Settings" > "Pages"
   - Source: "Deploy from a branch"
   - Branch: `gh-pages` (will be created automatically by GitHub Actions)
   - Click "Save"

5. **Access Your Site**
   - Your site will be available at: `https://YOUR_USERNAME.github.io/gitshowcase/`
   - It may take a few minutes for the first deployment

## Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
npm run deploy
```

This will build the project and push to the `gh-pages` branch.

## Configuration Files

- **vite.config.js**: Configured with base path `/gitshowcase/`
- **GitHub Actions**: `.github/workflows/deploy.yml` for automatic deployment
- **package.json**: Added deploy script and gh-pages dependency

## Troubleshooting

1. **Build fails**: Check that `VITE_GITHUB_USERNAME` is set in repository secrets
2. **404 Error**: Ensure the base path in `vite.config.js` matches your repository name
3. **GitHub Pages not updating**: Check the Actions tab for deployment status

## Environment Variables

Create a `.env` file in the project root:
```
VITE_GITHUB_USERNAME=your-github-username
```

This is required for the GitHub API to fetch your profile and repositories.