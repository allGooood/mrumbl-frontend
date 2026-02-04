import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useAuthActions } from '../api/authService';

const ProfileMenu = () => {
  const user = useAuthStore((state) => state.user);
  const { signout } = useAuthActions();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMyPage = () => {
    setOpen(false);
    navigate('/dashboard');
  };

  const handleOrderList = () => {
    setOpen(false);
    navigate('/orders');
  };

  const handleSignOut = async () => {
    setOpen(false);
    await signout();
    navigate('/login');
  };

  if (!user) return null;

  const initial = user.username?.charAt(0)?.toUpperCase()
    || user.email?.charAt(0)?.toUpperCase()
    || '?';

  const menuItemBase =
    'w-full px-4 py-3 text-left text-sm font-medium transition-colors flex items-center gap-3 rounded-lg cursor-pointer';

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger: pill with avatar + email + chevron */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-3 rounded-full pl-1 pr-3 py-1 min-w-0 border transition-all duration-200 shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary ${
          open
            ? 'bg-white border-gray-200 shadow-md'
            : 'bg-white/80 border-gray-200/80 hover:bg-white hover:border-gray-300 hover:shadow-sm'
        }`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Profile menu"
      >
        <span className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-pink-300 flex items-center justify-center text-gray-800 font-bold text-base shadow-inner ring-2 ring-white/80 shrink-0">
          {initial}
        </span>
        <span className="text-sm text-gray-700 truncate max-w-[160px] font-medium" title={user.email}>
          {user.email}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown card */}
      <div
        className={`absolute left-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden transition-all duration-200 ease-out ${
          open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-[0.98] pointer-events-none'
        }`}
      >
        {/* User summary header */}
        <div className="px-4 py-3 bg-gradient-to-br from-gray-50 to-gray-50/50 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-pink-300 flex items-center justify-center text-gray-800 font-bold text-base shadow-inner ring-2 ring-white shrink-0">
              {initial}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.username || user.email.split('@')[0]}</p>
              <p className="text-xs text-gray-500 truncate" title={user.email}>{user.email}</p>
            </div>
          </div>
        </div>

        {/* Menu items */}
        <div className="p-2">
          <button
            type="button"
            onClick={handleMyPage}
            className={`${menuItemBase} text-gray-700 hover:bg-gray-100 active:bg-gray-200`}
          >
            <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            My Page
          </button>
          <button
            type="button"
            onClick={handleOrderList}
            className={`${menuItemBase} text-gray-700 hover:bg-gray-100 active:bg-gray-200`}
          >
            <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
            Order List
          </button>
        </div>

        <div className="border-t border-gray-100" />
        <div className="p-2">
          <button
            type="button"
            onClick={handleSignOut}
            className={`${menuItemBase} text-red-600 hover:bg-red-50 active:bg-red-100`}
          >
            <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </span>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
