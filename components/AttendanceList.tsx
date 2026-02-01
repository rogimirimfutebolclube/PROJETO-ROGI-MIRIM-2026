
import React, { useState, useMemo } from 'react';
import { Athlete, SubCategory } from '../types';
import { getSubCategory } from '../utils/helpers';
import { ChevronDown, CheckCircle } from 'lucide-react';

interface AttendanceListProps {
  athletes: Athlete[];
  markAttendance: (athleteId: string) => void;
}

const AccordionItem: React.FC<{ title: string; count: number; children: React.ReactNode }> = ({ title, count, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-surface rounded-lg shadow-md overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 text-left font-semibold text-primary"
            >
                <span>{title} ({count} atletas)</span>
                <ChevronDown className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <div className="p-4 border-t border-gray-600">{children}</div>}
        </div>
    );
};

export const AttendanceList: React.FC<AttendanceListProps> = ({ athletes, markAttendance }) => {
  const groupedAthletes = useMemo(() => {
    return athletes.reduce((acc, athlete) => {
      const category = getSubCategory(athlete.dob);
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(athlete);
      return acc;
    }, {} as Record<SubCategory, Athlete[]>);
  }, [athletes]);

  const today = new Date().toISOString().split('T')[0];
  const orderedCategories: SubCategory[] = ['NÚCLEO', 'SUB 11', 'SUB 13', 'SUB 15', 'SUB 17', 'INDEFINIDO'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary text-center">Lista de Chamada</h1>
      <p className="text-center text-textSecondary">Data: {new Date().toLocaleDateString('pt-BR')}</p>
      
      {athletes.length === 0 && (
          <div className="text-center py-10 px-4 bg-surface rounded-lg shadow-md">
              <p className="text-textSecondary">Nenhum atleta inscrito ainda.</p>
              <p className="text-sm text-gray-400 mt-2">Vá para a aba 'Inscrição' para adicionar o primeiro atleta.</p>
          </div>
      )}

      <div className="space-y-4">
        {orderedCategories.map(category => {
          const categoryAthletes = groupedAthletes[category];
          if (!categoryAthletes || categoryAthletes.length === 0) return null;
          
          return (
            <AccordionItem key={category} title={category} count={categoryAthletes.length}>
                <ul className="space-y-3">
                    {categoryAthletes.map(athlete => {
                        const hasAttendedToday = athlete.attendance.some(date => date.startsWith(today));
                        return (
                            <li key={athlete.id} className="flex items-center justify-between p-3 bg-background rounded-md">
                                <div>
                                    <p className="font-medium text-textPrimary">{athlete.fullName}</p>
                                    <p className="text-sm text-textSecondary">Dias de treino: {athlete.attendance.length}</p>
                                </div>
                                <button
                                    onClick={() => markAttendance(athlete.id)}
                                    disabled={hasAttendedToday}
                                    className={`px-3 py-1.5 text-sm font-semibold rounded-md flex items-center gap-1.5 transition-colors duration-200 ${
                                        hasAttendedToday
                                        ? 'bg-green-800 text-green-200 cursor-not-allowed'
                                        : 'bg-secondary text-white hover:bg-green-600'
                                    }`}
                                >
                                    {hasAttendedToday ? <><CheckCircle size={16}/> Presente</> : 'Marcar Presença'}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </AccordionItem>
          );
        })}
      </div>
    </div>
  );
};