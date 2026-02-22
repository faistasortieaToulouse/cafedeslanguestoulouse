"use client";
import { useEffect, useState } from 'react';

export default function AgendaPage() {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    fetch('/api/agenda')
      .then(res => res.json())
      .then(data => setDates(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Agenda du Café des Langues</h1>
      <ul className="space-y-2">
        {dates.map((s: any) => (
          <li key={s.date} className={`p-2 border-l-4 ${s.isShifted ? 'border-orange-500 bg-orange-50' : 'border-green-500'}`}>
            <span className="font-semibold">{s.finalDay} {new Date(s.date).toLocaleDateString('fr-FR')}</span>
            {s.isShifted && <span className="ml-2 text-sm italic text-orange-600">(Décalé cause jour férié/réveillon)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}