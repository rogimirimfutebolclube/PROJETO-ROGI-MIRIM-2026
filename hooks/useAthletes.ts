
import { useState, useEffect, useCallback } from 'react';
import { Athlete } from '../types';

const STORAGE_KEY = 'soccer_school_athletes';

export const useAthletes = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedAthletes = localStorage.getItem(STORAGE_KEY);
      if (storedAthletes) {
        setAthletes(JSON.parse(storedAthletes));
      }
    } catch (error) {
      console.error("Failed to load athletes from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(athletes));
      } catch (error) {
        console.error("Failed to save athletes to localStorage", error);
      }
    }
  }, [athletes, isLoaded]);

  const addAthlete = useCallback((athlete: Omit<Athlete, 'id' | 'registrationDate' | 'attendance'>) => {
    const newAthlete: Athlete = {
      ...athlete,
      id: new Date().toISOString(),
      registrationDate: new Date().toISOString(),
      attendance: [],
    };
    setAthletes(prev => [...prev, newAthlete]);
  }, []);
  
  const deleteAthlete = useCallback((athleteId: string) => {
    if(window.confirm("Tem certeza que deseja remover este atleta? Esta ação não pode ser desfeita.")){
        setAthletes(prev => prev.filter(athlete => athlete.id !== athleteId));
    }
  }, []);

  const markAttendance = useCallback((athleteId: string) => {
    const today = new Date().toISOString().split('T')[0];
    setAthletes(prev => 
      prev.map(athlete => {
        if (athlete.id === athleteId) {
          const hasAttendedToday = athlete.attendance.some(date => date.startsWith(today));
          if (!hasAttendedToday) {
            return { ...athlete, attendance: [...athlete.attendance, new Date().toISOString()] };
          }
        }
        return athlete;
      })
    );
  }, []);

  return { athletes, addAthlete, markAttendance, deleteAthlete };
};
