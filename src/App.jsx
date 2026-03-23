import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

// shopping items state with localStorage persistence
  const [shoppingItems, setShoppingItems] = useState(() => {
    const saved = localStorage.getItem('familyhub_shopping');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: "Eggs", purchased: false },
      { id: 2, text: "Bread", purchased: false },
      { id: 3, text: "Laundry detergent", purchased: false },
      { id: 4, text: "Toothpaste", purchased: true },
      { id: 5, text: "Milk", purchased: true }
    ];
  });

  useEffect(() => {
    localStorage.setItem('familyhub_shopping', JSON.stringify(shoppingItems));
  }, [shoppingItems]);

  // family members state with localStorage persistence
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('familyhub_members');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Emma', role: 'Child', birthdate: '2016-09-09', color: '#fbbf24', avatar: 'E' },
      { id: 2, name: 'Max', role: 'Child', birthdate: '2018-03-15', color: '#8e53ff', avatar: 'M' },
      { id: 3, name: 'Sarah', role: 'Parent', birthdate: '1980-07-22', color: '#10b981', avatar: 'S' },
      { id: 4, name: 'John', role: 'Parent', birthdate: '1978-12-05', color: '#0ea5e9', avatar: 'J' }
    ];
  });

  // localStorage 
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('familyhub_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('familyhub_events');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('familyhub_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('familyhub_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('familyhub_events', JSON.stringify(events));
  }, [events]);


  // toggle task 
  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // delete task
  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };


  // add task with color based on assigned member
  const addTask = (newTask) => {
    const memberData = members.find(m => m.name === newTask.member);
    const taskWithColor = {
      ...newTask,
      id: Date.now(),
      completed: false,
      color: memberData ? memberData.color : '#94a3b8' // default color if member not found
    };
    setTasks(prev => [...prev, taskWithColor]);
  };



  return (
    <div className={`app-container ${isMenuOpen ? 'menu-open' : ''}`}>

      {/* Mobile top */}
    
      <div className="mobile-top-bar">
        <div className="mobile-logo">
          {/* new sublogo*/}
          <img src={subLogoUrl} alt="FH" className="mobile-logo-icon" />
          <span className="mobile-logo-text">FamilyHub</span>
        </div>
        <button className="mobile-hamburger-trigger" onClick={() => setIsMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsMenuOpen(false);
        }}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* menu background overlay */}
      {isMenuOpen && (
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}

      {/* homepage content */}
      <main className="content">
        {activeTab === 'Home' && (
          <Home
            tasks={tasks}
            setTasks={setTasks}
            events={events}
            setEvents={setEvents}
            setActiveTab={setActiveTab}
            members={members}
            shoppingItems={shoppingItems}
          />
        )}

        {activeTab === 'Activities' && (
          <Activities
            tasks={tasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            addTask={addTask}
            members={members}
          />
        )}

        {activeTab === 'Calendar' && (
          <Calendar
            events={events}
            setEvents={setEvents}
            members={members}
          />
        )}

        {activeTab === 'Shopping' && (
          <Shopping
            items={shoppingItems}
            setItems={setShoppingItems}
          />
        )}


        {activeTab === 'Family' && (
          <Family
            members={members}
            setMembers={setMembers}
          />
        )}
      </main>
    </div>
  );
}

export default App