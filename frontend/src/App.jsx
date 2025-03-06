import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarEng from './componentsEng/NavbarEng';
import NavbarTech from './componentsTech/NavbarTech';
import DashboardEng from './pagesEng/DashboardEng';
import CreateEventEng from './pagesEng/CreateEventEng';
import EventListEng from './pagesEng/EventListEng';
import DepartmentEventsEng from './pagesEng/DepartmentEventsEng';
import DashboardTech from './pagesTech/DashboardTech';
import CreateEventTech from './pagesTech/CreateEventTech';
import EventListTech from './pagesTech/EventListTech';
import DepartmentEventsTech from './pagesTech/DepartmentEventsTech';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import MainDashboard from './pages/MainDashboard';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

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
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;