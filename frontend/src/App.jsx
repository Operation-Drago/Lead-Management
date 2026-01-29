import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import LeadList from './components/LeadList';
import LeadForm from './components/LeadForm';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/leads"
            element={
              <ProtectedRoute>
                <LeadList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads/new"
            element={
              <ProtectedRoute>
                <LeadForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads/edit/:id"
            element={
              <ProtectedRoute>
                <LeadForm />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/leads" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
