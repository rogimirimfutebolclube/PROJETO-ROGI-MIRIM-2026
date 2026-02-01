
import { SubCategory } from '../types';

export const getSubCategory = (dob: string): SubCategory => {
  if (!dob) return 'INDEFINIDO';
  const birthYear = new Date(dob).getFullYear();
  if (birthYear >= 2017 && birthYear <= 2021) return 'NÚCLEO';
  if (birthYear >= 2015 && birthYear <= 2016) return 'SUB 11';
  if (birthYear >= 2013 && birthYear <= 2014) return 'SUB 13';
  if (birthYear >= 2011 && birthYear <= 2012) return 'SUB 15';
  if (birthYear >= 2009 && birthYear <= 2010) return 'SUB 17';
  return 'INDEFINIDO';
};

export const getAge = (dob: string): number => {
    if (!dob) return 0;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
}
