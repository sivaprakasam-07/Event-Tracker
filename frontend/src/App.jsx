import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarEng from './componentsEng/NavbarEng';
import NavbarTech from './componentsTech/NavbarTech';
import DashboardEng from './pagesEng/DashboardEng';
import CreateEventEng from './pagesEng/CreateEventEng';
import EventListEng from './pagesEng/EventListEng';
import DepartmentEventsEng from './pagesEng/DepartmentEventsEng';
import DashboardTech from './pagesTech/DashboardTech';
import CreateEventTech from './pagesTech/CreateEventtech';
import EventListTech from './pagesTech/EventListTech';
import DepartmentEventsTech from './pagesTech/DepartmentEventsTech';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import MainDashboard from './pages/MainDashboard';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ExternalEvents from './pages/ExternalEvents';
import ChatbotPopup from './components/ChatbotPopup';

// Helper component to conditionally render ChatbotPopup
const LayoutWithChatbot = () => {
  const location = useLocation();
  const hideChatbotOnPaths = ['/', '/login']; // Paths to hide chatbot

  const shouldShowChatbot = !hideChatbotOnPaths.includes(location.pathname);

  return (
    <>
      {shouldShowChatbot && <ChatbotPopup />}
      <ToastContainer />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/main-dashboard"
              element={
                <PrivateRoute>
                  <MainDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/engineering"
              element={
                <PrivateRoute>
                  <>
                    <NavbarEng />
                    <DashboardEng />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/technology"
              element={
                <PrivateRoute>
                  <>
                    <NavbarTech />
                    <DashboardTech />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/engineering/create-event"
              element={
                <PrivateRoute>
                  <>
                    <NavbarEng />
                    <CreateEventEng />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/engineering/events"
              element={
                <PrivateRoute>
                  <>
                    <NavbarEng />
                    <EventListEng />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/engineering/department-events/:department"
              element={
                <PrivateRoute>
                  <>
                    <NavbarEng />
                    <DepartmentEventsEng />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/technology/create-event"
              element={
                <PrivateRoute>
                  <>
                    <NavbarTech />
                    <CreateEventTech />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/technology/events"
              element={
                <PrivateRoute>
                  <>
                    <NavbarTech />
                    <EventListTech />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/technology/department-events/:department"
              element={
                <PrivateRoute>
                  <>
                    <NavbarTech />
                    <DepartmentEventsTech />
                  </>
                </PrivateRoute>
              }
            />
            <Route path="/external-events" element={<ExternalEvents />} />
          </Routes>
          <LayoutWithChatbot /> {/* Replace direct ChatbotPopup and ToastContainer with LayoutWithChatbot */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;