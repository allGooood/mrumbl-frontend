import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/stores/useAuthStore';
import { useCartStore } from '../../features/cart/stores/useCartStore';
import Button from '../ui/Button';
import Logo from './Logo';
import ProfileMenu from './ProfileMenu';
import { OrderNowButton } from './OrderNowButton';
import ViewBagButton from './ViewBagButton';

const Header = () => {
  const user = useAuthStore((state) => state.user);

  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();
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
              <ViewBagButton totalItems={totalItems} />
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
