
export interface Guardian {
  fullName: string;
  address: string;
  rg: string;
  cpf: string;
  workersInHouse: number;
  residentsInHouse: number;
}

export interface Athlete {
  id: string;
  fullName: string;
  dob: string;
  address: string;
  position: string;
  whatsapp: string;
  guardian: Guardian;
  registrationDate: string;
  attendance: string[]; // Array of dates in ISO format
}

export type Page = 'registration' | 'attendance' | 'roster';

export type SubCategory = 'NÚCLEO' | 'SUB 11' | 'SUB 13' | 'SUB 15' | 'SUB 17' | 'INDEFINIDO';

export const POSITIONS = [
  'Goleiro', 'Zagueiro', 'Lateral Direito', 'Lateral Esquerdo', 
  'Volante', 'Meia', 'Atacante', 'Ponta Direita', 'Ponta Esquerda'
];
