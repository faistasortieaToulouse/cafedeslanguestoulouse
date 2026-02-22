export function getHolidays(year: number) {
  // Calcul de Pâques (Algorithme de Butcher)
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  const easter = new Date(year, month - 1, day);

  const addDays = (date: Date, days: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  const holidays: Record<string, string> = {
    [`${year}-01-01`]: "Jour de l'An",
    [`${year}-05-01`]: "Fête du Travail",
    [`${year}-05-08`]: "Victoire 1945",
    [`${year}-07-14`]: "Fête Nationale",
    [`${year}-08-15`]: "Assomption",
    [`${year}-11-01`]: "Toussaint",
    [`${year}-11-11`]: "Armistice 1918",
    [`${year}-12-24`]: "Réveillon Noël",
    [`${year}-12-25`]: "Noël",
    [`${year}-12-31`]: "Réveillon Nouvel An",
    [addDays(easter, 1).toISOString().split('T')[0]]: "Lundi de Pâques",
    [addDays(easter, 39).toISOString().split('T')[0]]: "Ascension",
    [addDays(easter, 50).toISOString().split('T')[0]]: "Lundi de Pentecôte",
  };

  return holidays;
}