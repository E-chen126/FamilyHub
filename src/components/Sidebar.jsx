
import { Home, Calendar, CheckSquare, ShoppingCart, Users, X } from 'lucide-react';
import logoUrl from '../assets/logo.svg';
import subLogoUrl from '../assets/sublogo.svg';

function Sidebar({ activeTab, setActiveTab, isMenuOpen, setIsMenuOpen }) {
  const menuItems = [
    { id: 'Home', name: 'Home', icon: Home },
    { id: 'Calendar', name: 'Calendar', icon: Calendar },
    { id: 'Activities', name: 'Activities', icon: CheckSquare },
    { id: 'Shopping', name: 'Shopping', icon: ShoppingCart },
    { id: 'Family', name: 'Family', icon: Users },
  ];

  return (
    <aside className={`sidebar ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="sidebar-top">

        {/* 🌟 修正：移除内联样式，改用 class 控制响应式切换 */}
        <div className="brand">

          {/* 1. 桌面端显示的大 Logo */}
          <img
            src={logoUrl}
            alt="FamilyHub Logo"
            className="desktop-only-logo"
          />

          {/* 2. 移动端显示的图标 + 文字组合 */}
          <div className="mobile-only-brand">
            <img src={subLogoUrl} alt="FH" className="sidebar-logo-icon" />
            <span className="brand-name">FamilyHub</span>
          </div>

          {/* 3. 移动端关闭按钮 */}
          <button
            className="mobile-close-btn"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="nav-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab && setActiveTab(item.id);
                  if (window.innerWidth <= 1024) setIsMenuOpen(false);
                }}
              >
                <Icon size={20} className="nav-icon" />
                <span className="nav-text">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        © 2026 FamilyHub
      </div>
    </aside>
  );
}

export default Sidebar;