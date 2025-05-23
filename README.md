# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/e36a9bed-11eb-46d2-bb70-331f7dd9ba1e

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/e36a9bed-11eb-46d2-bb70-331f7dd9ba1e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e36a9bed-11eb-46d2-bb70-331f7dd9ba1e) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# CodeScribe AI Mentor

A practice platform for Data Structures and Algorithms with an AI assistant to help students learn to code.

## Features

- Authentication system (login/register)
- DSA problems with examples and test cases
- Monaco code editor for writing solutions
- Real-time code evaluation
- AI Assistant powered by Google's Gemini API
- Admin dashboard for monitoring user progress

## MongoDB Atlas Integration

The application uses MongoDB Atlas for data storage:

- User data: accounts, submissions, and progress
- Problem data: DSA problems, test cases, and solutions
- AI Conversation history: stored per user/problem

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- MongoDB Atlas account

### Installation

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Create a MongoDB Atlas account and cluster:
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free account
   - Create a new cluster (free tier is sufficient)
   - Create a database user
   - Add your IP address to the IP whitelist
   - Get your connection string

4. Create a `.env` file and configure:
   ```
   # MongoDB Atlas Connection
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   # JWT Secret
   JWT_SECRET=your_jwt_secret_here
   # Admin credentials
   ADMIN_EMAIL=your_admin_email@example.com
   ADMIN_PASSWORD=your_admin_password
   # Server port
   PORT=5000
   # Gemini API Key
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

5. Import initial data:
   ```
   # Import users
   npm run import-users
   
   # Import problems
   npm run import-problems
   
   # Verify the migration
   npm run verify-migration
   ```

6. Start the development servers
   ```
   npm run dev:full
   ```

## Backend API

The application provides the following API endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `PUT /api/users/:id/tab-switch` - Increment tab switch count
- `GET /api/users/:id/submissions` - Get user submissions

### Problems
- `GET /api/problems` - Get all problems
- `GET /api/problems/:id` - Get problem by ID
- `POST /api/problems` - Create a new problem (admin only)
- `PUT /api/problems/:id` - Update a problem (admin only)
- `DELETE /api/problems/:id` - Delete a problem (admin only)

### Submissions
- `POST /api/submissions` - Create or update a submission
- `GET /api/submissions/:id` - Get a submission by ID
- `PUT /api/submissions/:problemId/prompt-history` - Update prompt history for a submission

## License

MIT
#   p r o p m t - w a r s  
 #   p r o p m t - w a r s  
 