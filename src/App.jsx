import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Activities from './pages/Activities'
import Calendar from './pages/Calendar'
import Shopping from './pages/Shopping'
import Family from './pages/Family'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('Home');

  // localStorage
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

  // sync to localStorage
  useEffect(() => {
    localStorage.setItem('familyhub_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('familyhub_events', JSON.stringify(events));
  }, [events]);

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

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

        
        {activeTab === 'Activities' && <Activities tasks={tasks} setTasks={setTasks} />}

        {/* structure */}
        {activeTab === 'Calendar' && <Calendar />}
        {activeTab === 'Shopping' && <Shopping />}
        {activeTab === 'Family' && <Family />}
      </main>
    </div>
  )
}

export default App