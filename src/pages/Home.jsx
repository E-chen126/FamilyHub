import { useState } from 'react'
import { Calendar, CheckSquare, ShoppingCart, Users, Plus} from 'lucide-react'
import TaskModal from '../components/TaskModal'

// four stat card component
function StatCard({ title, count, bgColor, icon: Icon, iconColor }) {
  return (
    <div className="stat-card">
      <div className="stat-info">
        <h3>{title}</h3>
        <p className="stat-number">{count}</p>
      </div>
      <div className="stat-icon-wrapper" style={{ backgroundColor: bgColor }}>
        {Icon && <Icon size={20} color={iconColor} />}
      </div>
    </div>
  );
}

// 
export default function Home({ tasks, setTasks, events, setEvents, setActiveTab, members, shoppingItems }) {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('activity');

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  
 
  const handleItemCreated = (newItem) => {
    if (modalType === 'event') {
      setEvents([...events, newItem]);
    } else {
      setTasks([...tasks, newItem]);
    }
    setShowModal(false);
  };

  const pendingShoppingCount = shoppingItems ? shoppingItems.filter(i => !i.purchased).length : 0;



  return (
    <div className="p-8">
      <header className="main-header">
        <h1>{greeting}!</h1>
        <p className="date-text">{today}</p>
      </header>

      {/* cards */}
      <section className="stat-grid">
        <StatCard title="Upcoming Events" count={events.length} bgColor="#f3f0ff" icon={Calendar} iconColor="#a855f7" />
        <StatCard title="Activities" count={tasks.length} bgColor="#e0f2fe" icon={CheckSquare} iconColor="#0ea5e9" />
        <StatCard title="Shopping Items" count={pendingShoppingCount} bgColor="#fef9c3" icon={ShoppingCart} iconColor="#eab308" />
        <StatCard title="Family Members" count={members ? members.length : 0} bgColor="#dcfce7" icon={Users} iconColor="#22c55e" />
      </section>

      <div className="dashboard-main-grid">
        {/* Upcoming lists */}
        <section className="column-section">
          <div className="section-header">
            <h2 className="clickable-title" onClick={() => setActiveTab('Calendar')}>Upcoming Events</h2>
            <button className="add-btn-small" onClick={() => { setModalType('event'); setShowModal(true); }}>
              <Plus size={14} /> Add
            </button>
          </div>
          <div className="item-list">
            {events.length === 0 ? (
              <div className="empty-state"><Calendar size={48} /><p>No upcoming events</p></div>
            ) : (
              events.map(item => (
                <div key={item.id} className="task-card" style={{ borderLeft: `5px solid ${item.color}` }}>
                  <div className="check-circle" onClick={() => setEvents(events.filter(e => e.id !== item.id))}></div>
                  <div className="task-details">
                    <h4>{item.title}</h4>
                    <p>
                      <Calendar size={14} className="sub-icon" />
                      <span>{item.date}</span>
                      {item.startTime && (
                        <>
                          <span className="separator"> @ </span>
                          <span>{item.startTime}</span>
                        </>
                      )}
                      <span className="separator"> • </span>
                      <Users size={14} className="sub-icon" />
                      <span>{item.member}</span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Activities Lists */}
        <section className="column-section">
          <div className="section-header">
            <h2 className="clickable-title" onClick={() => setActiveTab('Activities')}>Children Activities</h2>
            <button className="add-btn-small" onClick={() => { setModalType('activity'); setShowModal(true); }}>
              <Plus size={14} /> Add
            </button>
          </div>

          <div className="item-list">
            {tasks.length === 0 ? (
              <div className="empty-state">
                <CheckSquare size={48} />
                <p>No activities planned for kids</p>
              </div>
            ) : (
              tasks.map(item => (
                <div key={item.id} className="task-card" style={{ borderLeft: `5px solid ${item.color}` }}>
                  <div className="check-circle" onClick={() => setTasks(tasks.filter(t => t.id !== item.id))}></div>
                 
                  <div className="task-details">
                    <h4>{item.title}</h4>
                    <p>
                      <Calendar size={14} className="sub-icon" />
                      <span>{item.date}</span>

                     
                      {item.startTime && (
                        <>
                          <span className="separator"> @ </span>
                          <span>{item.startTime} {item.endTime ? `- ${item.endTime}` : ''}</span>
                        </>
                      )}

                      <span className="separator"> • </span>
                      <Users size={14} className="sub-icon" />
                      <span>{item.member}</span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Add*/}
      <TaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleItemCreated}
        type={modalType}
        members={members}
      />
    </div>
  )
}