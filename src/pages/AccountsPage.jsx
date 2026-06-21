import React, { useState, useEffect } from 'react';
import { CreditCard, AlertCircle, RefreshCw } from 'lucide-react';
import { getAccountsByCustomerId } from '../api/accountApi';
import { useAuth } from '../hooks/useAuth';

export function AccountsPage() {
const { user } = useAuth();
const [accounts, setAccounts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

const fetchAccounts = async () => {
try {
setLoading(true);
setError('');
const customerId = user?.customerId || JSON.parse(localStorage.getItem('customer'))?.customerId

  if (!customerId) {
    throw new Error('No se pudo identificar al cliente.');
  }

  const response = await getAccountsByCustomerId(customerId);
  setAccounts(response.data || []);
} catch (err) {
  setError(err.response?.data?.message || err.message || 'Error al cargar las cuentas');
} finally {
  setLoading(false);
}


};

useEffect(() => {
fetchAccounts();
}, []);

const renderAccountsContent = () => {
if (loading) {
return ( <div className="flex justify-center items-center py-12"> <RefreshCw className="animate-spin text-green-600" size={32} /> </div>
);
}


if (accounts.length === 0) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
      <CreditCard size={48} className="mx-auto text-slate-300 mb-4" />
      <p className="text-slate-600 font-medium text-lg">No tienes cuentas disponibles.</p>
      <p className="text-slate-400 mt-2">Acércate a una agencia para aperturar una cuenta.</p>
    </div>
  );
}

return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {accounts.map((account) => (
      <div
        key={account.accountId}
        className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -z-10 opacity-50"></div>

        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              CUENTA DE {account.type || 'AHORRO'}
            </p>
            <p className="text-xl font-bold text-slate-800 tracking-tight mt-1">
              {account.accountNumber}
            </p>
          </div>

          <div
            className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              account.status === 'ACTIVA'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {account.status}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <p className="text-sm text-slate-500 mb-1">Saldo Disponible</p>
          <p className="text-3xl font-bold text-slate-800">
            <span className="text-xl text-slate-400 mr-1">$</span>
            {account.availableBalance?.toLocaleString('en-US', {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    ))}
  </div>
);


};

return ( <div className="space-y-6"> <div> <h1 className="text-3xl font-bold text-slate-800">Mis Cuentas</h1> <p className="text-slate-500 mt-1">Consulta el saldo y estado de tus cuentas.</p> </div>

```
  {error && (
    <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-3">
      <AlertCircle size={20} />
      <p className="font-medium">{error}</p>
    </div>
  )}

  {renderAccountsContent()}
</div>

);
}
