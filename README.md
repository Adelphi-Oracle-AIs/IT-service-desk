# IT Service Desk

A full-featured IT service desk application with GitHub OAuth authentication, ticket management system, and a modern React frontend.

![IT Service Desk Screenshot](docs/screenshot.png)

## Features

- **User Authentication**: GitHub OAuth integration for seamless login
- **Ticket Management**: Create, update, and track support tickets 
- **Role-Based Permissions**: Different access levels for users, agents, and admins
- **Real-time Updates**: Track ticket status changes and new comments
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean and user-friendly interface with Playfair font and custom yellow/blue theme

## Technology Stack

### Backend
- Node.js + Express
- MongoDB with Mongoose
- Passport.js for authentication
- Express Session for session management

### Frontend
- React with React Router
- Material-UI components library
- Axios for API requests
- Context API for state management

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- MongoDB
- GitHub OAuth application credentials

### Environment Setup

1. Clone the repository
   ```bash
   git clone https://github.com/Adelphi-Oracle-AIs/IT-service-desk.git
   cd IT-service-desk
   ```

2. Create a GitHub OAuth application
   - Go to your GitHub account settings
   - Navigate to Developer settings > OAuth Apps > New OAuth App
   - Set the Authorization callback URL to `http://localhost:5000/api/auth/github/callback`
   - Note the Client ID and Client Secret

3. Create environment variables
   - Copy the `.env.example` file to `.env`
   - Update with your GitHub credentials and other settings:
     ```
     GITHUB_CLIENT_ID=your_client_id
     GITHUB_CLIENT_SECRET=your_client_secret
     ```

### Installation

#### Method 1: Local Installation

1. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```

2. Install frontend dependencies
   ```bash
   cd ../frontend
   npm install
   ```

3. Start the development servers
   
   In the backend directory:
   ```bash
   npm run dev
   ```
   
   In the frontend directory:
   ```bash
   npm start
   ```

4. Access the application at `http://localhost:3000`

#### Method 2: Using Docker Compose

1. Start all services
   ```bash
   docker-compose up
   ```

2. Access the application at `http://localhost:3000`

## Deployment

### Building for Production

1. Build the frontend
   ```bash
   cd frontend
   npm run build
   ```

2. The built files will be copied to the backend's public directory

3. Start the production server
   ```bash
   cd ../backend
   npm start
   ```

### Docker Deployment

You can also build and deploy using the provided Dockerfile:

```bash
docker build -t it-service-desk .
docker run -p 5000:5000 -e MONGODB_URI=your_mongodb_uri -e GITHUB_CLIENT_ID=your_client_id -e GITHUB_CLIENT_SECRET=your_client_secret it-service-desk
```

## Project Structure

```
IT-service-desk/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── services/
│       └── styles/
├── docker-compose.yml
└── Dockerfile
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Developed by Adelphi University Oracle AIS team
- Design inspired by modern help desk solutions
- Built with open source tools and libraries

# IT Service Desk Software

## Overview

This IT Service Desk software is a game-changing solution designed for easy deployment and use. It offers a powerful set of features while maintaining simplicity, making it accessible to organizations of all sizes.

## Key Features

1. **Cloud-based Architecture**
   - Easy deployment with minimal on-premises infrastructure
   - Automatic updates and scalability

2. **Intuitive User Interface**
   - Clean, modern design
   - Customizable dashboards for different user roles
   - Mobile-responsive for access on any device

3. **Smart Ticketing System**
   - AI-powered ticket categorization and routing
   - Natural language processing for ticket creation and searching
   - Automated suggestions for common issues

4. **Knowledge Base Integration**
   - Self-service portal with searchable solutions
   - AI-driven content recommendations
   - Easy content creation and management

5. **Automation and Workflows**
   - Visual workflow designer for non-technical users
   - Preset templates for common IT processes
   - Integration with popular tools (e.g., Microsoft 365, Google Workspace)

6. **Asset Management**
   - Automated discovery and inventory
   - License tracking and compliance monitoring
   - Integration with ticketing for quick issue resolution

7. **Reporting and Analytics**
   - Real-time dashboards and KPIs
   - Customizable reports
   - Predictive analytics for proactive issue management

8. **Multi-channel Support**
   - Email, chat, phone, and social media integration
   - Chatbot for 24/7 initial support

9. **User-friendly Admin Panel**
   - Easy configuration and customization
   - Role-based access control
   - Single sign-on (SSO) support

10. **API and Integration Capabilities**
    - Open API for custom integrations
    - Pre-built connectors for popular business tools

## Technical Stack

- Backend: Python with Flask
- Frontend: React
- Database: SQLAlchemy (compatible with various SQL databases)
- API: RESTful API

## Project Structure
Certainly! I'll create a README.md file based on the initial outline and the code structure I've provided. This README will give an overview of the project, its features, and basic setup instructions.
markdownCopy# IT Service Desk Software

## Overview

This IT Service Desk software is a game-changing solution designed for easy deployment and use. It offers a powerful set of features while maintaining simplicity, making it accessible to organizations of all sizes.

## Key Features

1. **Cloud-based Architecture**
   - Easy deployment with minimal on-premises infrastructure
   - Automatic updates and scalability

2. **Intuitive User Interface**
   - Clean, modern design
   - Customizable dashboards for different user roles
   - Mobile-responsive for access on any device

3. **Smart Ticketing System**
   - AI-powered ticket categorization and routing
   - Natural language processing for ticket creation and searching
   - Automated suggestions for common issues

4. **Knowledge Base Integration**
   - Self-service portal with searchable solutions
   - AI-driven content recommendations
   - Easy content creation and management

5. **Automation and Workflows**
   - Visual workflow designer for non-technical users
   - Preset templates for common IT processes
   - Integration with popular tools (e.g., Microsoft 365, Google Workspace)

6. **Asset Management**
   - Automated discovery and inventory
   - License tracking and compliance monitoring
   - Integration with ticketing for quick issue resolution

7. **Reporting and Analytics**
   - Real-time dashboards and KPIs
   - Customizable reports
   - Predictive analytics for proactive issue management

8. **Multi-channel Support**
   - Email, chat, phone, and social media integration
   - Chatbot for 24/7 initial support

9. **User-friendly Admin Panel**
   - Easy configuration and customization
   - Role-based access control
   - Single sign-on (SSO) support

10. **API and Integration Capabilities**
    - Open API for custom integrations
    - Pre-built connectors for popular business tools

## Technical Stack

- Backend: Python with Flask
- Frontend: React
- Database: SQLAlchemy (compatible with various SQL databases)
- API: RESTful API

## Project Structure

/backend
/app
init.py
models.py
routes.py
/config
init.py
config.py
requirements.txt
run.py
/frontend
/public
index.html
/src
/components
Dashboard.js
TicketList.js
TicketForm.js
App.js
index.js
package.json## Setup and Installation

### Backend

1. Navigate to the `/backend` directory
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Unix or MacOS: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Set up environment variables for database connection and secret key
6. Run the application: `python run.py`

### Frontend

1. Navigate to the `/frontend` directory
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Deployment

This application is designed to be compatible with various cloud platforms including AWS, Google Cloud, and Oracle Cloud. Specific deployment instructions will vary based on the chosen platform.

For demonstration purposes, the frontend can be deployed to GitHub Pages:

1. Add `"homepage": "https://<username>.github.io/<repository-name>"` to `package.json`
2. Install gh-pages: `npm install gh-pages --save-dev`
3. Add deployment scripts to `package.json`
4. Deploy using `npm run deploy`

## Future Enhancements

- Implement user authentication and authorization
- Expand asset management capabilities
- Develop the knowledge base system
- Create more advanced reporting and analytics features
- Implement AI-driven ticket routing and suggestions

## Contributing

We welcome contributions to this project. Please fork the repository and submit a pull request with your proposed changes.

## License

[MIT License](https://opensource.org/licenses/MIT)
