import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useCartStore } from '../stores/useCartStore';
import Button from './atom/Button';
import Logo from './Logo';
import ProfileMenu from './ProfileMenu';
import { OrderNowButton } from './OrderNowButton';

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const openCart = useCartStore((state) => state.openCart);
  const hasItems = totalItems > 0;
  const navigate = useNavigate();
  const location = useLocation();
  const isOrderPage = location.pathname.startsWith('/order');

  /** 로그인한 사용자만 View Bag 사용 가능 */
  const showViewBag = user && hasItems;

  const handleSignInButton = () => {
    navigate('/login');
  };

  return (
    <header className="w-full">
      <div className="bg-brand-primary py-3 flex items-center justify-between px-30">
        {/* Left */}
        <div className="flex-1 min-w-0 flex justify-start">
          {user ? (
            <ProfileMenu />
          ) : (
            <Button variant="outline" onClick={handleSignInButton}>
              <span>Sign In</span>
            </Button>
          )}
        </div>

        {/* Center: Logo */}
        <div className="flex-1 min-w-0 flex justify-center shrink-0">
          <Logo />
        </div>

        {/* Right */}
        <div className="flex-1 min-w-0 flex justify-end">
          {showViewBag ? (
              <Button 
              type="button" 
              onClick={openCart}
              className="flex items-center gap-3">
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
                  <span className="absolute -top-1 -left-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                </div>
                View Bag
              </Button>
          ) : (
            !isOrderPage && (
              <OrderNowButton />
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
