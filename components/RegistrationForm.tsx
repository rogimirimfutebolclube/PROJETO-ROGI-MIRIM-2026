
import React, { useState } from 'react';
import { Athlete, Guardian, POSITIONS } from '../types';

interface RegistrationFormProps {
  addAthlete: (athlete: Omit<Athlete, 'id' | 'registrationDate' | 'attendance'>) => void;
}

const initialGuardianState: Guardian = {
    fullName: '',
    address: '',
    rg: '',
    cpf: '',
    workersInHouse: 0,
    residentsInHouse: 1,
};

const initialAthleteState: Omit<Athlete, 'id' | 'registrationDate' | 'attendance' | 'guardian'> = {
    fullName: '',
    dob: '',
    address: '',
    position: '',
    whatsapp: '',
};

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ addAthlete }) => {
  const [athleteData, setAthleteData] = useState(initialAthleteState);
  const [guardianData, setGuardianData] = useState(initialGuardianState);
  
  const handleAthleteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAthleteData({ ...athleteData, [e.target.name]: e.target.value });
  };
  
  const handleGuardianChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value;
    setGuardianData({ ...guardianData, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAthlete({ ...athleteData, guardian: guardianData });
    alert('Atleta inscrito com sucesso!');
    setAthleteData(initialAthleteState);
    setGuardianData(initialGuardianState);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary text-center">Formulário de Inscrição</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Athlete Section */}
        <div className="p-6 bg-surface rounded-lg shadow-md space-y-4">
          <h2 className="text-2xl font-semibold text-textPrimary border-b pb-2 border-gray-600">Dados do Atleta</h2>
          <InputField label="Nome Completo" name="fullName" value={athleteData.fullName} onChange={handleAthleteChange} required />
          <InputField label="Data de Nascimento" name="dob" type="date" value={athleteData.dob} onChange={handleAthleteChange} required />
          <InputField label="Endereço Completo" name="address" value={athleteData.address} onChange={handleAthleteChange} required />
          <SelectField label="Posição que joga" name="position" value={athleteData.position} onChange={handleAthleteChange} options={POSITIONS} required />
          <InputField label="WhatsApp" name="whatsapp" type="tel" value={athleteData.whatsapp} onChange={handleAthleteChange} placeholder="(00) 00000-0000" required />
        </div>

        {/* Guardian Section */}
        <div className="p-6 bg-surface rounded-lg shadow-md space-y-4">
          <h2 className="text-2xl font-semibold text-textPrimary border-b pb-2 border-gray-600">Dados do Responsável</h2>
          <InputField label="Nome Completo" name="fullName" value={guardianData.fullName} onChange={handleGuardianChange} required />
          <InputField label="Endereço" name="address" value={guardianData.address} onChange={handleGuardianChange} required />
          <InputField label="RG" name="rg" value={guardianData.rg} onChange={handleGuardianChange} required />
          <InputField label="CPF" name="cpf" value={guardianData.cpf} onChange={handleGuardianChange} required />
          <InputField label="Pessoas que trabalham na casa" name="workersInHouse" type="number" min="0" value={guardianData.workersInHouse.toString()} onChange={handleGuardianChange} required />
          <InputField label="Pessoas que moram na casa" name="residentsInHouse" type="number" min="1" value={guardianData.residentsInHouse.toString()} onChange={handleGuardianChange} required />
        </div>
        
        <button type="submit" className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-lg">
          Inscrever Atleta
        </button>
      </form>
    </div>
  );
};

// Reusable Input Component
interface InputFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    required?: boolean;
    placeholder?: string;
    min?: string;
}
const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, type = 'text', required = false, placeholder, min }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-textSecondary">{label}</label>
        <input 
            type={type} 
            id={name} 
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder || label}
            min={min}
            className="mt-1 block w-full px-3 py-2 bg-background border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
    </div>
);

// Reusable Select Component
interface SelectFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    required?: boolean;
}
const SelectField: React.FC<SelectFieldProps> = ({ label, name, value, onChange, options, required = false }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-textSecondary">{label}</label>
        <select 
            id={name} 
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-background border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
        >
            <option value="" disabled>Selecione uma posição</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);