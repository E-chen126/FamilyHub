import React from 'react';
import { X } from 'lucide-react';

const TaskModal = ({ isOpen, onClose, onCreate, type = 'activity', members = [] }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selectedMemberName = formData.get('member');

    // color based on member
    const memberData = members.find(m => m.name === selectedMemberName);

    const newItem = {
      id: Date.now(),
      title: formData.get('title'),
      date: formData.get('date'),
      startTime: formData.get('startTime') || "All day",
      endTime: formData.get('endTime') || null,
      member: selectedMemberName,
      color: memberData ? memberData.color : '#94a3b8',
      completed: false
    };

    onCreate(newItem, type); 
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          {/* Modal Title*/}
          <h2>{type === 'event' ? 'Add New Event' : 'Add New Activity'}</h2>
          <X className="close-icon" onClick={onClose} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Title</label>
            <input name="title" required placeholder={type === 'event' ? "Event name" : "Activity name"} />
          </div>

          <div className="input-group">
            <label>Date</label>
            <input type="date" name="date" defaultValue={new Date().toISOString().split('T')[0]} required />
          </div>

          <div className="input-row" style={{ display: 'flex', gap: '15px' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Start Time</label>
              <input type="time" name="startTime" />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
                <label>End Time</label>
                <input type="time" name="endTime" />
            </div> 
          </div>

          <div className="input-group">
            <label>Assigned To</label>
            <select name="member">
              {members.map(m => (
                <option key={m.id} value={m.name}>{m.name}</option>
              ))}
            </select>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-create" style={{ flex: 1 }}>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;