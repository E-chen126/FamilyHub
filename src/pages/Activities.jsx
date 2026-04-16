import React, { useState } from 'react';
import { Plus, CheckCircle, Circle, Trash2, Clock, User } from 'lucide-react';
import TaskModal from '../components/TaskModal'; 

const Activities = ({ tasks, toggleTask, deleteTask, addTask, members }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pendingTasks = tasks.filter(t => !t.completed).length;
  const completedTasks = tasks.filter(t => t.completed).length;

  return (
    <div className="activities-page">
      <header className="main-header">
        <div>
          <h1>Children Activities</h1>
          <p className="date-text">{pendingTasks} pending · {completedTasks} completed</p>
        </div>
        <button id="special-add-btn" className="btn-create" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          <span>New Activity</span>
        </button>
      </header>

      <div className="activity-list" style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {tasks.map((task) => (
          <div key={task.id} className={`activity-card ${task.completed ? 'completed' : ''}`}>
            <div className="activity-main" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div className="check-wrapper" onClick={() => toggleTask(task.id)} style={{ cursor: 'pointer' }}>
                {task.completed ? <CheckCircle color="#10b981" size={24} /> : <Circle color="#cbd5e1" size={24} />}
              </div>

              <div className="activity-details">
                <h4 style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#94a3b8' : '#1e293b' }}>
                  {task.title}
                </h4>
                <div className="activity-meta" style={{ display: 'flex', gap: '16px', color: '#64748b', fontSize: '13px', marginTop: '4px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} />
                    {task.date} {task.startTime ? `@ ${task.startTime}` : ''} {/* time*/}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={14} /> {task.member}</span>
                </div>
              </div>
            </div>
            <button className="action-btn delete" onClick={() => deleteTask(task.id)} style={{ border: 'none', background: 'none' }}>
              <Trash2 size={16} color="#ef4444" />
            </button>
          </div>
        ))}
      </div>

      
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={addTask}
        type="activity"
        members={members}
      />
    </div>
  );
};

export default Activities;