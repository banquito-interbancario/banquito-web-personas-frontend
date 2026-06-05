import React from 'react';
import { Send, Search, AlertCircle, CheckCircle2 } from 'lucide-react';

export function TransferPage() {
  const [destinationAccount, setDestinationAccount] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleValidateOwner = () => {
    if (!destinationAccount.trim()) {
      setMessage('Ingrese una cuenta destino para validar el titular.');
      return;
    }

    setMessage(
      'La validación del titular quedará conectada al endpoint by-account cuando esté disponible el gRPC de account-core-service.'
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!destinationAccount.trim()) {
      setMessage('Ingrese la cuenta destino.');
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setMessage('Ingrese un monto válido para la transferencia.');
      return;
    }

    setMessage(
      'La pantalla de transferencia está lista. El envío real se conectará con account-core-service cuando Oscar entregue el servicio correspondiente.'
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Transferencia P2P
        </h1>
        <p className="text-slate-500 mt-1">
          Registra una transferencia hacia otra cuenta BanQuito.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-blue-800">
        <div className="flex items-start gap-3">
          <AlertCircle size={22} className="mt-0.5" />
          <div>
            <p className="font-semibold">Integración pendiente</p>
            <p className="text-sm mt-1">
              La validación del titular de la cuenta destino se conectará con el
              party-service cuando esté integrado el gRPC del account-core-service.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5 max-w-3xl"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Cuenta destino
          </label>

          <div className="flex gap-3">
            <input
              type="text"
              value={destinationAccount}
              onChange={(event) => setDestinationAccount(event.target.value)}
              placeholder="Ejemplo: 2200000002"
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700"
            />

            <button
              type="button"
              onClick={handleValidateOwner}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold px-5 py-3 rounded-xl transition"
            >
              <Search size={18} />
              Validar
            </button>
          </div>

          <p className="text-xs text-slate-500 mt-2">
            Este campo permitirá consultar el nombre del titular antes de continuar.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Monto
          </label>

          <input
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Descripción
          </label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Ejemplo: Pago personal"
            rows={3}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700 resize-none"
          />
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-slate-700 mb-2">
            Resumen
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600">
            <p>
              <span className="font-medium">Cuenta destino:</span>{' '}
              {destinationAccount || '-'}
            </p>
            <p>
              <span className="font-medium">Monto:</span>{' '}
              {amount ? `$${Number(amount).toFixed(2)}` : '-'}
            </p>
            <p className="md:col-span-2">
              <span className="font-medium">Descripción:</span>{' '}
              {description || '-'}
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-5 py-3 rounded-xl transition"
        >
          <Send size={18} />
          Continuar transferencia
        </button>

        {message && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle2 size={20} className="mt-0.5" />
            <span>{message}</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default TransferPage;