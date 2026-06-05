import React from 'react';
import { User, ShieldCheck, BadgeCheck, KeyRound } from 'lucide-react';

export function ProfilePage() {
  const customer = JSON.parse(localStorage.getItem('customer') || 'null');

  if (!customer) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Mi perfil</h1>
          <p className="text-slate-500 mt-1">
            Información principal del cliente autenticado.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
          <p className="text-slate-600">
            No se encontró información del cliente en sesión.
          </p>
        </div>
      </div>
    );
  }

  const items = [
    {
      label: 'Nombre completo',
      value: customer.fullName || '-',
      Icon: User,
    },
    {
      label: 'Usuario',
      value: customer.username || '-',
      Icon: KeyRound,
    },
    {
      label: 'Tipo de cliente',
      value: customer.customerType || '-',
      Icon: BadgeCheck,
    },
    {
      label: 'Estado del cliente',
      value: customer.customerStatus || '-',
      Icon: ShieldCheck,
      highlight: true,
    },
    {
      label: 'Estado de credencial',
      value: customer.credentialStatus || '-',
      Icon: ShieldCheck,
      highlight: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Mi perfil
        </h1>

        <p className="text-slate-500 mt-1">
          Información principal del cliente autenticado.
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-800 to-green-950 rounded-2xl p-8 text-white shadow-sm">
        <p className="text-green-100 text-sm">Cliente BanQuito</p>
        <h2 className="text-3xl font-bold mt-1">
          {customer.fullName}
        </h2>
        <p className="text-green-100 mt-2">
          Usuario: {customer.username}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-5">
          Datos de sesión
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map(({ label, value, Icon, highlight }) => (
            <div
              key={label}
              className="border border-slate-100 rounded-xl p-4 bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <Icon size={20} className="text-green-800" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">{label}</p>
                  <p className={`font-semibold ${highlight ? 'text-green-700' : 'text-slate-800'}`}>
                    {value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-blue-800">
        <p className="font-semibold">Información protegida</p>
        <p className="text-sm mt-1">
          Estos datos corresponden al cliente autenticado en BanQuito Web Personas.
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;