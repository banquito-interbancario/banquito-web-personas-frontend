import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import {
  User,
  Send,
  Building2,
  CalendarDays,
  ArrowRight,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

const modules = [
  {
    title: 'Mi perfil',
    description: 'Consulta tus datos principales como cliente BanQuito.',
    path: '/perfil',
    Icon: User,
  },
  {
    title: 'Transferencia P2P',
    description: 'Realiza transferencias hacia otras cuentas BanQuito.',
    path: '/transferencia',
    Icon: Send,
  },
  {
    title: 'Sucursales',
    description: 'Consulta las sucursales disponibles del banco.',
    path: '/sucursales',
    Icon: Building2,
  },
  {
    title: 'Feriados bancarios',
    description: 'Revisa los días no laborables registrados para operaciones.',
    path: '/feriados',
    Icon: CalendarDays,
  },
];

export function DashboardPage() {
  const auth = useAuth() || {};
  const { user = {} } = auth;

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-800 to-green-950 rounded-2xl p-8 text-white shadow-sm">
        <h1 className="text-3xl font-bold">
          Bienvenido, {user?.fullName || 'Cliente'}
        </h1>

        <p className="text-green-100 mt-2">
          Accede a tus servicios digitales de BanQuito Web Personas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <User size={22} className="text-green-800" />
            </div>
            <h3 className="font-bold text-slate-800">Cliente</h3>
          </div>

          <p className="text-sm text-slate-500">Usuario</p>
          <p className="text-lg font-semibold text-slate-800">
            {user?.username || '-'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <CreditCard size={22} className="text-green-800" />
            </div>
            <h3 className="font-bold text-slate-800">Tipo de cliente</h3>
          </div>

          <p className="text-sm text-slate-500">Clasificación</p>
          <p className="text-lg font-semibold text-slate-800">
            {user?.customerType || '-'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <ShieldCheck size={22} className="text-green-800" />
            </div>
            <h3 className="font-bold text-slate-800">Estado</h3>
          </div>

          <p className="text-sm text-slate-500">Cuenta digital</p>
          <p className="text-lg font-semibold text-green-700">
            {user?.customerStatus || 'ACTIVO'}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Accesos rápidos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {modules.map(({ path, title, description, Icon }) => (
            <div
              key={path}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                <Icon size={22} className="text-green-800" />
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-slate-800">{title}</h3>
                <p className="text-sm text-slate-500 mt-1">{description}</p>
              </div>

              <Link
                to={path}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-800 hover:text-green-950 transition-colors"
              >
                Acceder
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;