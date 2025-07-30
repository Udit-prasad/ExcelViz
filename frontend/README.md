# Excel Vista Insights Hub - Frontend

A modern React.js application for uploading, analyzing, and visualizing Excel data with AI-powered insights.

## 🚀 Features

- **File Upload**: Drag & drop Excel files (.xls, .xlsx)
- **Data Visualization**: 2D charts (Bar, Line, Pie, Doughnut) and 3D charts
- **AI Insights**: Smart analysis and recommendations
- **User Management**: Authentication, profiles, and admin panel
- **History Tracking**: View and manage previous analyses
- **Responsive Design**: Modern UI with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React.js 18
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Charts**: Chart.js (2D) + Three.js (3D)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Build Tool**: Create React App

## 📦 Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   # Create .env file
   echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── app/
│   │   └── store.js              # Redux store configuration
│   ├── components/
│   │   ├── Navbar.jsx            # Navigation bar
│   │   ├── Sidebar.jsx           # Sidebar navigation
│   │   ├── FileUpload.jsx        # Excel file upload component
│   │   ├── Chart2D.jsx           # 2D chart component
│   │   ├── Chart3D.jsx           # 3D chart component
│   │   ├── HistoryTable.jsx      # Analysis history table
│   │   ├── ProfileCard.jsx       # User profile card
│   │   ├── InsightCard.jsx       # AI insights card
│   │   └── ProtectedRoute.jsx    # Authentication guard
│   ├── features/
│   │   ├── auth/
│   │   │   └── authSlice.js      # Authentication Redux slice
│   │   ├── analysis/
│   │   │   └── analysisSlice.js  # Analysis Redux slice
│   │   ├── history/
│   │   │   └── historySlice.js   # History Redux slice
│   │   └── ui/
│   │       └── uiSlice.js        # UI state Redux slice
│   ├── pages/
│   │   ├── Dashboard.jsx         # Main dashboard
│   │   ├── Analysis.jsx          # Data analysis page
│   │   ├── History.jsx           # Analysis history
│   │   ├── Profile.jsx           # User profile
│   │   ├── About.jsx             # About page
│   │   ├── Login.jsx             # Login page
│   │   ├── Register.jsx          # Registration page
│   │   └── Admin.jsx             # Admin panel
│   ├── App.jsx                   # Main app component
│   ├── index.js                  # Entry point
│   └── index.css                 # Global styles
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Tailwind CSS

The project uses Tailwind CSS for styling. Configuration is in `tailwind.config.js`.

## 📱 Pages & Features

### 1. **Dashboard** (`/dashboard`)
- Overview of user statistics
- Recent activity feed
- AI insights panel
- Quick access to features

### 2. **Analysis** (`/analysis`)
- Excel file upload with drag & drop
- Chart type selection (2D/3D)
- Axis configuration
- Real-time chart generation

### 3. **History** (`/history`)
- List of all analyses
- Download charts
- Delete analyses
- Filter and search

### 4. **Profile** (`/profile`)
- User information
- Account statistics
- Profile editing

### 5. **Admin Panel** (`/admin`)
- User management
- System analytics
- Data usage monitoring

## 🔐 Authentication

The app uses JWT tokens for authentication:

- **Login**: Email/password authentication
- **Register**: New user registration
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Token Storage**: Local storage with automatic refresh

## 📊 Chart Types

### 2D Charts (Chart.js)
- **Bar Charts**: For categorical data comparison
- **Line Charts**: For time-series data
- **Pie Charts**: For proportion visualization
- **Doughnut Charts**: For proportion with center space

### 3D Charts (Three.js)
- **3D Bar Charts**: Interactive 3D visualization
- **Customizable**: Colors, lighting, and camera controls

## 🤖 AI Features

- **Data Trend Detection**: Automatic pattern recognition
- **Anomaly Detection**: Identify unusual data points
- **Chart Recommendations**: Suggest optimal chart types
- **Smart Insights**: Contextual data analysis

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: Theme switching capability
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages
- **Accessibility**: WCAG compliant components

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Code Style

- Use functional components with hooks
- Follow Redux Toolkit patterns
- Use Tailwind CSS for styling
- Implement proper error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

---

**Happy coding! 🎉** 