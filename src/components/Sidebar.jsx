import { Home, Calendar, CheckSquare, ShoppingCart, Users } from 'lucide-react';

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
        {/* Logo */}
        <div className="brand">💜 FamilyHub</div>

        <nav className="nav-list">
          {menuItems.map((item) => {
            const Icon = item.icon; 
            return (
              <button
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon size={20} className="nav-icon" />
                <span className="nav-text">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        © 2026 FamilyHub
      </div>
    </aside>
  );
}

export default Sidebar;