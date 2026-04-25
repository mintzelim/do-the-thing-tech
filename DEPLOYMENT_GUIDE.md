# Deployment Guide for DoTheThing

## Vercel Deployment to www.dothething.tech

### Prerequisites
- GitHub repository connected to Vercel
- Domain www.dothething.tech configured in Vercel
- All environment variables configured in Vercel project settings

### Required Environment Variables

The following environment variables must be set in Vercel project settings:

1. **Database**
   - `DATABASE_URL` - MySQL/TiDB connection string

2. **Authentication**
   - `JWT_SECRET` - Session cookie signing secret
   - `VITE_APP_ID` - Manus OAuth application ID
   - `OAUTH_SERVER_URL` - Manus OAuth backend URL
   - `VITE_OAUTH_PORTAL_URL` - Manus login portal URL

3. **APIs**
   - `BUILT_IN_FORGE_API_URL` - Manus built-in APIs URL
   - `BUILT_IN_FORGE_API_KEY` - Manus built-in APIs key (server-side)
   - `VITE_FRONTEND_FORGE_API_KEY` - Frontend access token
   - `VITE_FRONTEND_FORGE_API_URL` - Frontend APIs URL
   - `GOOGLE_GEMINI_API_KEY` - Google Gemini API key for AI task breakdown

4. **Owner Information**
   - `OWNER_OPEN_ID` - Owner's Manus OpenID
   - `OWNER_NAME` - Owner's name

5. **Analytics (Optional)**
   - `VITE_ANALYTICS_ENDPOINT` - Analytics service endpoint
   - `VITE_ANALYTICS_WEBSITE_ID` - Analytics website ID

6. **App Configuration**
   - `VITE_APP_TITLE` - "DoTheThing"
   - `VITE_APP_LOGO` - Logo URL

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Vercel Automatic Deployment**
   - Vercel automatically detects the push
   - Reads `vercel.json` configuration
   - Runs `npm run build` command
   - Deploys to www.dothething.tech

3. **Verify Deployment**
   - Visit https://www.dothething.tech
   - Check that the React app loads (not raw JavaScript)
   - Test the task breakdown feature
   - Verify blog posts load from JSON

### Build Process

The build command runs:
1. `node scripts/generate-blog-posts.mjs` - Generates blog-posts.json from Markdown files
2. `vite build` - Builds React frontend
3. `esbuild` - Bundles Express server

Output:
- `dist/index.js` - Express server
- `dist/public/` - React app and static files

### Production Behavior

- Server listens on port specified by `PORT` environment variable (default: 3000)
- Serves static files from `dist/public/`
- Routes all non-static requests to Express server
- Handles tRPC API calls at `/api/trpc`

### Troubleshooting

**Issue: Site shows raw JavaScript**
- Verify `vercel.json` is in root directory
- Check that build completed successfully
- Ensure environment variables are set

**Issue: Blog posts not loading**
- Verify `blog-posts.json` exists in `dist/public/`
- Check browser console for fetch errors
- Ensure blog Markdown files are in `/blog/` directory

**Issue: API calls failing**
- Verify database connection string is correct
- Check that all API keys are set in environment variables
- Look at Vercel function logs for errors

### Database Migrations

If database schema changes are needed:
1. Update `drizzle/schema.ts`
2. Run `pnpm drizzle-kit generate` locally
3. Review generated SQL migration
4. Apply migration to production database
5. Deploy updated code

### Monitoring

- Check Vercel dashboard for deployment status
- Review function logs for errors
- Monitor database connection health
- Track API response times

### Rollback

If deployment has issues:
1. Go to Vercel dashboard
2. Select previous deployment
3. Click "Promote to Production"
4. Verify site is working

### Blog Post Updates

To add new blog posts:
1. Create new Markdown file in `/blog/` directory
2. Follow the template format with YAML frontmatter
3. Push to GitHub
4. Vercel automatically regenerates blog-posts.json on deploy

Example filename: `/blog/16-your-post-title.md`

### Performance Optimization

Current metrics:
- JavaScript bundle: 205.06 kB (gzip)
- HTML: 105.81 kB (gzip)
- Total: ~310 kB gzipped

For further optimization:
- Consider code splitting for large components
- Implement lazy loading for blog posts
- Cache static assets aggressively
