import { Home, Calendar, CheckSquare, ShoppingCart, Users } from 'lucide-react';

function Sidebar({ activeTab, setActiveTab }) {
  // 定义菜单项，每个项目包含 ID、名称和对应的图标组件
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
        {/* 应用品牌 Logo 区域 */}
        <div className="brand">💜 FamilyHub</div>

        <nav className="nav-list">
          {menuItems.map((item) => {
            const Icon = item.icon; // 动态获取图标组件
            return (
              <button
                key={item.id}
                // 如果当前 Tab 匹配，则添加 'active' 类名实现高亮
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

      {/* 侧边栏底部版权信息 */}
      <div className="sidebar-footer">
        © 2026 FamilyHub
      </div>
    </aside>
  );
}

export default Sidebar;