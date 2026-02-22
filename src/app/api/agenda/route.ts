import { NextResponse } from 'next/server';
import { getHolidays } from '@/lib/calendar-utils';

export async function GET() {
  const year = new Date().getFullYear();
  const holidays = getHolidays(year);
  const sessions = [];
  
  // On parcourt tous les jours de l'année
  let date = new Date(year, 0, 1);
  while (date.getFullYear() === year) {
    if (date.getDay() === 2) { // C'est un Mardi
      let currentSession = new Date(date);
      let dateStr = currentSession.toISOString().split('T')[0];

      // Règle de décalage : si férié/réveillon -> Mercredi, si encore férié -> Jeudi
      while (holidays[dateStr]) {
        currentSession.setDate(currentSession.getDate() + 1);
        dateStr = currentSession.toISOString().split('T')[0];
      }

      sessions.push({
        date: dateStr,
        originalDay: "Mardi",
        finalDay: currentSession.toLocaleDateString('fr-FR', { weekday: 'long' }),
        isShifted: currentSession.getDay() !== 2
      });
    }
    date.setDate(date.getDate() + 1);
  }

  return NextResponse.json(sessions);
}