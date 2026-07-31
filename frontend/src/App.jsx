import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@pages/HomePage";
import Login from "@pages/login/Login";
import ResetEmail from "@pages/login/ResetEmail";
import EnrollmentPage from "@/pages/enrollment/EnrollmentPage";
import SchoolEvents from "@pages/SchoolEvents";
import NewPage from "@pages/NewPage";
import ScrollToTop from "@/components/common/ScrollToTop";
import EnrollmentWizardPage from '@pages/enrollment/EnrollmentWizardPage';
import ConfirmationPage from '@pages/ConfirmationPage'
import ApplicationStatusPage from '@pages/ApplicationStatusPage';
import TeacherPage from "./pages/teacher/TeacherPage";
import AssessmentPage from "./pages/teacher/AssessmentPage";


function App() {
  const [playState, setPlayState] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage playState={playState} setPlayState={setPlayState} />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetEmail />} />
        <Route path="/enrollment" element={<EnrollmentPage />} />
        <Route path="/school-events" element={<SchoolEvents />} />
        <Route path="/news" element={<NewPage />} />
        <Route path="/matricula/nueva" element={<EnrollmentWizardPage />} />
        <Route path="/matricula/confirmacion" element={<ConfirmationPage />} />
        <Route path="/matricula/seguimiento" element={<ApplicationStatusPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/assessmentPage" element={<AssessmentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
