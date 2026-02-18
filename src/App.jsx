import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react' // 🌟 引入汉堡菜单图标
import Sidebar from './components/Sidebar'
import logoUrl from './assets/logo.svg';
import subLogoUrl from './assets/sublogo.svg';
import Home from './pages/Home'
import Activities from './pages/Activities'
import Calendar from './pages/Calendar'
import Shopping from './pages/Shopping'
import Family from './pages/Family'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  // 🌟 新增：控制移动端下拉菜单的开关状态
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // localStorage 数据持久化逻辑
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('familyhub_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "Clean bedroom", member: "Emma", date: "2026-01-09", startTime: "14:00", endTime: "15:00", color: "#fbbf24" }
    ];
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('familyhub_events');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('familyhub_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('familyhub_events', JSON.stringify(events));
  }, [events]);

  return (
    <div className={`app-container ${isMenuOpen ? 'menu-open' : ''}`}>

      {/* 🌟 1. 移动端专用顶部条 */}
      {/* 修正：确保这里的 img 标签样式和桌面端 Logo 比例一致，防止关闭菜单后显示错误 */}
      <div className="mobile-top-bar">
        <div className="mobile-logo">
          {/* 🌟 使用新的方形图标 */}
          <img src={subLogoUrl} alt="FH" className="mobile-logo-icon" />
          {/* 🌟 增加文字标识 */}
          <span className="mobile-logo-text">FamilyHub</span>
        </div>
        <button className="mobile-hamburger-trigger" onClick={() => setIsMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* 🌟 2. 侧边栏组件 */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsMenuOpen(false); // 切换页面时自动收起
        }}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen} // 传给 Sidebar 内部的 X 按钮使用
      />

      {/* 🌟 3. 背景遮罩 */}
      {isMenuOpen && (
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}

      {/* 4. 主内容区域 */}
      <main className="content">
        {activeTab === 'Home' && (
          <Home
            tasks={tasks}
            setTasks={setTasks}
            events={events}
            setEvents={setEvents}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'Activities' && (
          <Activities tasks={tasks} setTasks={setTasks} />
        )}

        {activeTab === 'Calendar' && (
          <Calendar
            events={events}
            setEvents={setEvents}
          />
        )}

        {activeTab === 'Shopping' && <Shopping />}
        {activeTab === 'Family' && <Family />}
      </main>
    </div>
  );
}

export default App