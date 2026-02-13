import { Home, Calendar, CheckSquare, ShoppingCart, Users } from 'lucide-react';
// 确保这里 import 的名字和下面 src 使用的一致
import logoUrl from '../assets/logo.svg';

function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'Home', name: 'Home', icon: Home },
    { id: 'Calendar', name: 'Calendar', icon: Calendar },
    { id: 'Activities', name: 'Activities', icon: CheckSquare },
    { id: 'Shopping', name: 'Shopping', icon: ShoppingCart },
    { id: 'Family', name: 'Family', icon: Users },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand" style={{
          padding: '40px,10px', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginBottom: '10px'
        }}>
          <img
            src={logoUrl}
            alt="FamilyHub Logo"
            style={{
              width: '200px',  
              height: 'auto',
              // opacity: '0.9',
              objectFit: 'contain',     
            }}
          />
        </div>

        <nav className="nav-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab && setActiveTab(item.id)}
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