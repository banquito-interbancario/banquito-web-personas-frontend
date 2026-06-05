import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Topbar = () => {
  const navigate = useNavigate();
  const auth = useAuth() || {};
  const { user = {}, logout } = auth;
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const displayName = user?.fullName || user?.username || 'Cliente';
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return (
    <header
      className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center justify-between px-8 z-50"
      style={{
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid #e9ecef',
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
          style={{
            background: 'linear-gradient(135deg, #166534 0%, #052e16 100%)',
          }}
        >
          B
        </div>

        <div>
          <h1 className="text-lg font-bold text-gray-900 m-0">
            BanQuito
          </h1>
          <p className="text-xs text-gray-500 m-0" style={{ letterSpacing: '1px' }}>
            WEB PERSONAS
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div style={{ width: '1px', height: '24px', backgroundColor: '#e9ecef' }} />

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg transition duration-200"
            onMouseEnter={(event) => {
              event.currentTarget.style.backgroundColor = '#f8f9fa';
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900 m-0">
                {displayName}
              </p>
              <p className="text-xs text-gray-500 m-0">
                {user?.customerType || 'CLIENTE'}
              </p>
            </div>

            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm"
              style={{
                background: 'linear-gradient(135deg, #166534 0%, #052e16 100%)',
              }}
            >
              {initials || 'C'}
            </div>
          </button>

          {showUserMenu && (
            <div
              className="absolute right-0 mt-2 w-52 rounded-lg shadow-lg py-2 z-10"
              style={{
                backgroundColor: '#ffffff',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
                border: '1px solid #e9ecef',
              }}
            >
              <Link
                to="/perfil"
                onClick={() => setShowUserMenu(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Mi perfil
              </Link>

              <div style={{ height: '1px', backgroundColor: '#e9ecef', margin: '0.5rem 0' }} />

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;