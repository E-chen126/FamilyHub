import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, Users, X } from 'lucide-react';

export default function CalendarPage({ events = [], setEvents }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today);

  // 🌟 控制弹窗的状态
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

  // 格式化日期为 YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-CA'); // 输出 YYYY-MM-DD
  };

  const dayEvents = events.filter(e => e.date === formatDate(selectedDate));

  // 🌟 处理创建新事件
  const handleCreateEvent = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newEvent = {
      id: Date.now(),
      title: formData.get('title'),
      date: formData.get('date'),
      startTime: formData.get('startTime') || "All day",
      member: formData.get('member'),
      color: "#8e53ff" // 日历默认紫色
    };

    setEvents([...events, newEvent]); // 🌟 更新全局数据
    setShowModal(false);
  };

  return (
    <div className="calendar-page-unique">
      <header className="page-header-unique">
        <div className="header-left-unique">
          <h1>Calendar</h1>
          <p className="subtitle-unique">Manage family events and activities</p>
        </div>
        {/* 🌟 顶部按钮点击工作 */}
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
              const isSelected = isSameDay(dateObj, selectedDate);
              const isToday = isSameDay(dateObj, today);

              return (
                <div
                  key={day}
                  className={`day-cell-unique ${isSelected ? 'is-selected' : (isToday ? 'is-today' : '')}`}
                  onClick={() => setSelectedDate(dateObj)}
                >
                  <span className="day-number-unique">{day}</span>
                  {/* 🌟 渲染小圆点提示该天有事件 */}
                  {events.some(e => e.date === formatDate(dateObj)) && <div className="event-dot-unique"></div>}
                </div>
              );
            })}
          </div>
        </section>

        <section className="events-panel-unique">
          <div className="panel-header-unique">
            <h3>{selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</h3>
            {/* 🌟 面板小加号点击工作 */}
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

      {/* 🌟 弹窗代码：复用 Home 风格 */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>New Calendar Event</h2>
              <X className="close-icon" onClick={() => setShowModal(false)} />
            </div>
            <form onSubmit={handleCreateEvent}>
              <div className="input-group">
                <label>Title</label>
                <input name="title" required placeholder="Event name" />
              </div>
              <div className="input-group">
                <label>Date</label>
                {/* 🌟 默认填入选中的日期 */}
                <input type="date" name="date" defaultValue={formatDate(selectedDate)} required />
              </div>
              <div className="input-group">
                <label>Start Time</label>
                <input type="time" name="startTime" />
              </div>
              <div className="input-group">
                <label>Assigned To</label>
                <select name="member">
                  <option>Emma</option>
                  <option>Max</option>
                  <option>Family</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-create">Create Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}