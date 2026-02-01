
import React, { useState, useMemo } from 'react';
import { Athlete } from '../types';
import { getSubCategory, getAge, formatDate } from '../utils/helpers';
import { ChevronDown, Trash2, Search } from 'lucide-react';

interface AthleteRosterProps {
  athletes: Athlete[];
  deleteAthlete: (athleteId: string) => void;
}

const AthleteDetail: React.FC<{ label: string; value: string | number | undefined }> = ({ label, value }) => (
    <div className="text-sm">
        <span className="font-semibold text-textSecondary">{label}:</span>
        <span className="ml-2 text-textPrimary">{value || 'N/A'}</span>
    </div>
);

const AthleteCard: React.FC<{ athlete: Athlete; onDelete: (id: string) => void }> = ({ athlete, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-surface rounded-lg shadow-md transition-shadow hover:shadow-lg">
            <div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <div>
                    <h3 className="font-bold text-lg text-primary">{athlete.fullName}</h3>
                    <p className="text-sm text-textSecondary">{getSubCategory(athlete.dob)} - {getAge(athlete.dob)} anos</p>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(athlete.id); }} 
                        className="text-red-500 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-500/20"
                        aria-label="Deletar atleta"
                    >
                        <Trash2 size={20} />
                    </button>
                    <ChevronDown className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
            </div>
            {isExpanded && (
                <div className="border-t border-gray-600 p-4 space-y-4">
                    <div>
                        <h4 className="font-semibold text-md text-textPrimary mb-2">Dados do Atleta</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <AthleteDetail label="Posição" value={athlete.position} />
                            <AthleteDetail label="WhatsApp" value={athlete.whatsapp} />
                            <AthleteDetail label="Endereço" value={athlete.address} />
                            <AthleteDetail label="Data de Nasc." value={formatDate(athlete.dob)} />
                            <AthleteDetail label="Data de Inscrição" value={formatDate(athlete.registrationDate)} />
                             <AthleteDetail label="Treinos" value={`${athlete.attendance.length} dias`} />
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-md text-textPrimary mb-2">Dados do Responsável</h4>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <AthleteDetail label="Nome" value={athlete.guardian.fullName} />
                            <AthleteDetail label="CPF" value={athlete.guardian.cpf} />
                            <AthleteDetail label="RG" value={athlete.guardian.rg} />
                            <AthleteDetail label="Endereço" value={athlete.guardian.address} />
                            <AthleteDetail label="Trabalham" value={`${athlete.guardian.workersInHouse} pessoa(s)`} />
                            <AthleteDetail label="Moram" value={`${athlete.guardian.residentsInHouse} pessoa(s)`} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const AthleteRoster: React.FC<AthleteRosterProps> = ({ athletes, deleteAthlete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAthletes = useMemo(() => {
    return athletes
      .filter(athlete => 
        athlete.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.fullName.localeCompare(b.fullName));
  }, [athletes, searchTerm]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary text-center">Atletas Inscritos</h1>
      <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
              type="text"
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-gray-600 rounded-lg text-textPrimary placeholder-gray-500 focus:ring-primary focus:border-primary"
          />
      </div>
      
      {athletes.length === 0 ? (
          <div className="text-center py-10 px-4 bg-surface rounded-lg shadow-md">
              <p className="text-textSecondary">Nenhum atleta inscrito ainda.</p>
          </div>
      ) : filteredAthletes.length === 0 ? (
          <div className="text-center py-10 px-4 bg-surface rounded-lg shadow-md">
              <p className="text-textSecondary">Nenhum atleta encontrado com o nome "{searchTerm}".</p>
          </div>
      ) : (
        <div className="space-y-4">
          {filteredAthletes.map(athlete => (
            <AthleteCard key={athlete.id} athlete={athlete} onDelete={deleteAthlete} />
          ))}
        </div>
      )}
    </div>
  );
};