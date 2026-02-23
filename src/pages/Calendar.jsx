import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, Users, X } from 'lucide-react';
import TaskModal from '../components/TaskModal';

export default function CalendarPage({ events = [], setEvents,members }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today);

  // modal state
  const [showModal, setShowModal] = useState(false);

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const changeMonth = (offset) => setViewDate(new Date(viewYear, viewMonth + offset, 1));

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // yyyymmdd
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-CA'); 
  };

  const dayEvents = events.filter(e => e.date === formatDate(selectedDate));

  // add event handler
  const handleCreateEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setShowModal(false);
  };

  return (
    <div className="calendar-page-unique">
      <header className="page-header-unique">
        <div className="header-left-unique">
          <h1>Calendar</h1>
          <p className="subtitle-unique">Manage family events and activities</p>
        </div>
        
        <button className="btn-create-unique" onClick={() => setShowModal(true)}>
          <Plus size={18} /> New Event
        </button>
      </header>

      <div className="calendar-main-grid-unique">
        <section className="calendar-container-unique">
          <div className="calendar-nav-unique">
            <button className="nav-btn-unique" onClick={() => changeMonth(-1)}><ChevronLeft size={20} /></button>
            <h2>{viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
            <button className="nav-btn-unique" onClick={() => changeMonth(1)}><ChevronRight size={20} /></button>
          </div>

          <div className="calendar-weekday-row-unique">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="weekday-item-unique">{d}</div>
            ))}
          </div>

          <div className="calendar-days-grid-unique">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="day-cell-unique empty"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateObj = new Date(viewYear, viewMonth, day);
              const dateStr = formatDate(dateObj); //yyyy-mm-dd
              const isSelected = isSameDay(dateObj, selectedDate);
              const isToday = isSameDay(dateObj, today);

              const dayEventsForDot = events.filter(e => e.date === dateStr);

              return (
                <div
                  key={day}
                  className={`day-cell-unique ${isSelected ? 'is-selected' : (isToday ? 'is-today' : '')}`}
                  onClick={() => setSelectedDate(dateObj)}
                >
                  <span className="day-number-unique">{day}</span>
                  
                  <div className="event-dots-container-unique">
                    {dayEventsForDot.map((e) => (
                      <div
                        key={e.id}
                        className="event-dot-unique"
                        style={{ backgroundColor: e.color }}
                      ></div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="events-panel-unique">
          <div className="panel-header-unique">
            <h3>{selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</h3>
            
            <button className="add-icon-btn-unique" onClick={() => setShowModal(true)}><Plus size={16} /></button>
          </div>
          <div className="event-list-unique">
            {dayEvents.length === 0 ? (
              <div className="empty-state-unique"><p>No events scheduled</p></div>
            ) : (
              dayEvents.map(e => (
                <div key={e.id} className="event-item-card-unique" style={{ borderLeft: `4px solid ${e.color}` }}>
                  <h4>{e.title}</h4>
                  <div className="event-meta-unique">
                    <Clock size={12} /> {e.startTime} • <Users size={12} /> {e.member}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* modal */}
      <TaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreateEvent}
        type="event"
        members={members}
      />
    </div>
  );
}