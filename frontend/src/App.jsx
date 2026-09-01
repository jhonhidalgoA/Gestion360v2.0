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
import AssessmentPage from "./pages/teacher/assesment/AssessmentPage";
import AttendancePage from "./pages/teacher/attendance/AttendancePage";
import PlanningPage from "./pages/teacher/planning/PlanningPage";
import ClassworkPage from "./pages/teacher/classwork/ClassworkPage";
import ReportPage from "./pages/teacher/reportPage/ReportPage";
import ComunicationPage from "./pages/teacher/comunication/ComunicationPage"
import ObserverStudentPage from "./pages/teacher/observerStudent/ObserverStudentPage";
import LessonPlanPage from "./pages/teacher/planning/components/LessonPlanPage"




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
        <Route path="/attendancePage" element={<AttendancePage />} />
        <Route path="/planningPage" element={<PlanningPage />} />               
        <Route path="/classworkPage" element={<ClassworkPage />} />
        <Route path="/reportPage" element={<ReportPage />} />
        <Route path="/comunicationPage" element={<ComunicationPage />}/>
        <Route path="/observerStudentPage" element={<ObserverStudentPage />}/>
        <Route path="/LessonPlanPage" element={<LessonPlanPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
