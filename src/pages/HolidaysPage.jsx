import React from 'react';
import { CalendarDays } from 'lucide-react';
import { getHolidays } from '../api/partyApi';

export function HolidaysPage() {
  const [holidays, setHolidays] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const loadHolidays = async () => {
      try {
        const response = await getHolidays();
        setHolidays(response.data || []);
        setError('');
      } catch (err) {
        setError('No se pudieron cargar los feriados.');
      } finally {
        setLoading(false);
      }
    };

    loadHolidays();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-slate-500">Cargando feriados...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Feriados bancarios
        </h1>
        <p className="text-slate-500 mt-1">
          Consulta los feriados registrados para operaciones bancarias.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left p-4 text-sm font-semibold text-slate-600">
                Fecha
              </th>
              <th className="text-left p-4 text-sm font-semibold text-slate-600">
                Nombre
              </th>
              <th className="text-left p-4 text-sm font-semibold text-slate-600">
                Fin de semana
              </th>
            </tr>
          </thead>

          <tbody>
            {holidays.map((holiday) => (
              <tr key={holiday.holidayDate} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-4 text-slate-700">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={18} className="text-green-800" />
                    {holiday.holidayDate}
                  </div>
                </td>
                <td className="p-4 text-slate-700">
                  {holiday.name}
                </td>
                <td className="p-4 text-slate-700">
                  {holiday.isWeekend ? 'Sí' : 'No'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {holidays.length === 0 && !error && (
          <div className="p-8 text-center text-slate-500">
            No hay feriados registrados.
          </div>
        )}
      </div>
    </div>
  );
}

export default HolidaysPage;