import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./Dashboard/Student";
import MyCourses from "./Dashboard/Mycourses";
import Assignments from "./Dashboard/Assignment";
import QuizPage from "./Dashboard/Quiz";
import Certificates from "./Dashboard/Certificates";
import Profile from "./Dashboard/Profile";
import CourseDetails from "./Dashboard/Coursedetails";
import ExplorePage from "./Dashboard/Explore";

import PurchasePage from "./Dashboard/Purchase";
import MyLearning from "./Dashboard/Mylearning";
import Resources from "./Dashboard/Resources";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected — all student routes */}
        <Route path="/student"      element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
        <Route path="/mycourses"    element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
        <Route path="/assignments"  element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
        <Route path="/quiz"         element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
        <Route path="/certificates" element={<ProtectedRoute><Certificates /></ProtectedRoute>} />
        <Route path="/profile"      element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/course/:id"   element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
        <Route path="/mylearning"   element={<ProtectedRoute><MyLearning /></ProtectedRoute>} />        
        <Route path="/resources"    element={<ProtectedRoute><Resources /></ProtectedRoute>} />
        {/* Direct-student only pages (ProtectedRoute handles auth; Sidebar hides them from institute) */}
        <Route path="/explore"          element={<ProtectedRoute><ExplorePage /></ProtectedRoute>} />
        <Route path="/purchase/:id"     element={<ProtectedRoute><PurchasePage /></ProtectedRoute>} />
        <Route path="/purchase/plan/:id" element={<ProtectedRoute><PurchasePage /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
