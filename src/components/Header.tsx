import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useCartStore } from '../stores/useCartStore';
import Button from './atom/Button';
import Logo from './Logo';
import ProfileMenu from './ProfileMenu';

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const hasItems = totalItems > 0;
  const navigate = useNavigate();

  const handleOrderButton = () => {
    console.log("handle order");
  };

  const handleSignInButton = () => {
    navigate('/login');
  };

  return (
    <header className="w-full">
      <div className="bg-brand-primary py-4 flex items-center justify-between px-30">
        {/* Left: equal width for centering */}
        <div className="flex-1 min-w-0 flex justify-start">
          {user ? (
            <ProfileMenu />
          ) : (
            <Button variant="outline" onClick={handleSignInButton}>
              <span>Sign In</span>
            </Button>
          )}
        </div>

        {/* Center: Logo (truly centered) */}
        <div className="flex-1 min-w-0 flex justify-center shrink-0">
          <Logo />
        </div>

        {/* Right: equal width for centering */}
        <div className="flex-1 min-w-0 flex justify-end">
          {hasItems ? (
            <Link
              to="/cart"
              className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <div className="relative">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              </div>
              <span>View Bag</span>
            </Link>
          ) : (
            <Button onClick={handleOrderButton}>
              <span>Order Now</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
