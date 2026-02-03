import { useState } from 'react'
import { Calendar, CheckSquare, ShoppingCart, Users, Plus, X } from 'lucide-react'

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
export default function Home({ tasks, setTasks, events, setEvents, setActiveTab }) {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('activity');

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  // create new event or activity
  const handleCreate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      id: Date.now(),
      title: formData.get('title'),
      date: formData.get('date'),
      startTime: formData.get('startTime'),
      endTime: modalType === 'activity' ? formData.get('endTime') : null,
      member: formData.get('member'),
      color: modalType === 'event' ? "#a855f7" : "#6366f1"
    };

    if (modalType === 'event') {
      setEvents([...events, newItem]); 
    } else {
      setTasks([...tasks, newItem]);
    }
    setShowModal(false);
  };

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
        <StatCard title="Shopping Items" count="3" bgColor="#fef9c3" icon={ShoppingCart} iconColor="#eab308" />
        <StatCard title="Family Members" count="4" bgColor="#dcfce7" icon={Users} iconColor="#22c55e" />
      </section>

      <div className="dashboard-main-grid">
        {/* Upcoming lists */}
        <section className="column-section">
          <div className="section-header">
            <h2 className="clickable-title" onClick={() => setActiveTab('Calendar')}>Upcoming Events</h2>
            <button className="add-btn-small" onClick={() => { setModalType('event'); setShowModal(true); }}><Plus size={14} /> Add</button>
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
                    <p>📅 {item.date} • ⏰ {item.startTime} • 👤 {item.member}</p>
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
            <button className="add-btn-small" onClick={() => { setModalType('activity'); setShowModal(true); }}><Plus size={14} /> Add</button>
          </div>
          <div className="item-list">
            {tasks.map(item => (
              <div key={item.id} className="task-card" style={{ borderLeft: `5px solid ${item.color}` }}>
                <div className="check-circle" onClick={() => setTasks(tasks.filter(t => t.id !== item.id))}></div>
                <div className="task-details">
                  <h4>{item.title}</h4>
                  <p>📅 {item.date} • ⏰ {item.startTime} - {item.endTime} • 👤 {item.member}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Add/Create */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>New {modalType === 'event' ? 'Event' : 'Activity'}</h2>
              <X className="close-icon" onClick={() => setShowModal(false)} />
            </div>
            <form onSubmit={handleCreate}>
              <div className="input-group"><label>Title</label><input name="title" required /></div>
              <div className="input-group"><label>Date</label><input type="date" name="date" required /></div>
              <div className="input-row">
                <div className="input-group"><label>Start Time</label><input type="time" name="startTime" required /></div>
                {modalType === 'activity' && <div className="input-group"><label>End Time</label><input type="time" name="endTime" required /></div>}
              </div>
              <div className="input-group">
                <label>Assigned To</label>
                <select name="member"><option>Emma</option><option>Max</option></select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-create">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}