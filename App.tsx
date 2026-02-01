
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { RegistrationForm } from './components/RegistrationForm';
import { AttendanceList } from './components/AttendanceList';
import { AthleteRoster } from './components/AthleteRoster';
import { useAthletes } from './hooks/useAthletes';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('registration');
  const { athletes, addAthlete, markAttendance, deleteAthlete } = useAthletes();

  const renderPage = () => {
    switch (currentPage) {
      case 'registration':
        return <RegistrationForm addAthlete={addAthlete} />;
      case 'attendance':
        return <AttendanceList athletes={athletes} markAttendance={markAttendance} />;
      case 'roster':
        return <AthleteRoster athletes={athletes} deleteAthlete={deleteAthlete} />;
      default:
        return <RegistrationForm addAthlete={addAthlete} />;
    }
  };

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;
