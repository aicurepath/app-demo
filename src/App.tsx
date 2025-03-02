import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import PractitionersPage from './pages/PractitionersPage';
import PractitionerDetailPage from './pages/PractitionerDetailPage';
import ClinicDetailPage from './pages/ClinicDetailPage';
import HealthScorePage from './pages/HealthScorePage';
import HealthAssessmentPage from './pages/HealthAssessmentPage';
import ProfilePage from './pages/ProfilePage';
import HealthInsightsPage from './pages/HealthInsightsPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ConsultationHistoryPage from './pages/ConsultationHistoryPage';
import ConsultationChatPage from './pages/ConsultationChatPage';
import ClinicsPage from './pages/ClinicsPage';
import NotificationsPage from './pages/NotificationsPage';
import TransactionsPage from './pages/TransactionsPage';
import AuthSelectionPage from './pages/AuthSelectionPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PractitionerLoginPage from './pages/PractitionerLoginPage';
import PractitionerSignupPage from './pages/PractitionerSignupPage';
import ProfessionProfilePage from './pages/ProfessionProfilePage';
import BankCardPage from './pages/BankCardPage';
import HealthReportPage from './pages/HealthReportPage';
import InsuranceMarketPage from './pages/InsuranceMarketPage';
import InsuranceDetailPage from './pages/InsuranceDetailPage';
import MyInsurancePage from './pages/MyInsurancePage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import AppointmentsListPage from './pages/AppointmentsListPage';
import AppointmentDetailPage from './pages/AppointmentDetailPage';
import AuthGuard from './components/auth/AuthGuard';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { user } = useAuth();
  const isPractitioner = user?.role === 'practitioner';

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="practitioners" element={<PractitionersPage />} />
        <Route path="practitioners/:id" element={<PractitionerDetailPage />} />
        <Route path="clinics" element={<ClinicsPage />} />
        <Route path="clinics/:id" element={<ClinicDetailPage />} />
        <Route path="insights" element={<HealthInsightsPage />} />
        <Route path="insights/:id" element={<ArticleDetailPage />} />
        <Route path="auth" element={<AuthSelectionPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="practitioner/login" element={<PractitionerLoginPage />} />
        <Route path="practitioner/signup" element={<PractitionerSignupPage />} />
        
        {/* Protected Routes */}
        {!isPractitioner && (
          <>
            <Route path="health-score" element={
              <AuthGuard>
                <HealthScorePage />
              </AuthGuard>
            } />
            <Route path="health-score/assessment" element={
              <AuthGuard>
                <HealthAssessmentPage />
              </AuthGuard>
            } />
            <Route path="insurance/market" element={
              <AuthGuard>
                <InsuranceMarketPage />
              </AuthGuard>
            } />
            <Route path="insurance/products/:id" element={
              <AuthGuard>
                <InsuranceDetailPage />
              </AuthGuard>
            } />
            <Route path="insurance/my" element={
              <AuthGuard>
                <MyInsurancePage />
              </AuthGuard>
            } />
          </>
        )}
        
        <Route path="consultation-history" element={
          <AuthGuard>
            <ConsultationHistoryPage />
          </AuthGuard>
        } />
        <Route path="consultation-history/:id" element={
          <AuthGuard>
            <ConsultationChatPage />
          </AuthGuard>
        } />
        <Route path="health-report/:id" element={
          <AuthGuard>
            <HealthReportPage />
          </AuthGuard>
        } />
        <Route path="profile" element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        } />
        <Route path="notifications" element={
          <AuthGuard>
            <NotificationsPage />
          </AuthGuard>
        } />
        <Route path="transactions" element={
          <AuthGuard>
            <TransactionsPage />
          </AuthGuard>
        } />
        
        {/* Appointment Routes */}
        <Route path="appointments" element={
          <AuthGuard>
            <AppointmentsListPage />
          </AuthGuard>
        } />
        <Route path="appointments/:id" element={
          <AuthGuard>
            <AppointmentDetailPage />
          </AuthGuard>
        } />
        <Route path="appointments/book/:practitionerId" element={
          <AuthGuard>
            <BookAppointmentPage />
          </AuthGuard>
        } />
        
        {isPractitioner && (
          <>
            <Route path="profession-profile" element={
              <AuthGuard>
                <ProfessionProfilePage />
              </AuthGuard>
            } />
            <Route path="profile/bank-cards" element={
              <AuthGuard>
                <BankCardPage />
              </AuthGuard>
            } />
          </>
        )}
      </Route>
    </Routes>
  );
}