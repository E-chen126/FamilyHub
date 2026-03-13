import React, { useState } from 'react';
import { UserPlus, Edit2, Trash2, Gift, Calendar, X } from 'lucide-react';

const Family = ({ members, setMembers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#8e53ff');

  const colors = ['#8e53ff', '#3b82f6', '#10b981', '#f43f5e', '#f59e0b', '#14b8a6'];

 
  const calculateAge = (birthdate) => {
    if (!birthdate) return 0;
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age < 0 ? 0 : age;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
    setSelectedColor('#8e53ff');
  };

  const handleAddOrEdit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');

    const memberData = {
      id: editingMember ? editingMember.id : Date.now(),
      name: name,
      role: formData.get('role'),
      birthdate: formData.get('birthdate'),
      color: selectedColor,
      avatar: name.charAt(0).toUpperCase()
    };

    if (editingMember) {
      setMembers(members.map(m => m.id === editingMember.id ? memberData : m));
    } else {
      setMembers([...members, memberData]);
    }
    closeModal();
  };

  const renderMemberCard = (m) => (
    <div key={m.id} className="column-section" style={{
      padding: '24px',
      minHeight: 'auto', 
      display: 'block'
    }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        
        <div style={{
          width: '64px', height: '64px', borderRadius: '16px', backgroundColor: m.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          color: 'white', fontSize: '24px', fontWeight: 'bold',
          boxShadow: `0 8px 16px ${m.color}33`, flexShrink: 0
        }}>
          {m.avatar}
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '2px' }}>{m.name}</h3>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '10px' }}>{m.role}</p>

          <div style={{ display: 'flex', gap: '15px', color: '#94a3b8', fontSize: '13px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Gift size={14} /> {m.birthdate ? m.birthdate.split('-').slice(1).join('/') : '--'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={14} /> {calculateAge(m.birthdate)} years
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-start' }}>
          <button onClick={() => { setEditingMember(m); setSelectedColor(m.color); setIsModalOpen(true); }}
            style={{ border: 'none', background: '#f1f5f9', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
            <Edit2 size={16} color="#64748b" />
          </button>
          <button onClick={() => setMembers(members.filter(mem => mem.id !== m.id))}
            style={{ border: 'none', background: '#fff1f2', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
            <Trash2 size={16} color="#f43f5e" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="familyPage">
      <header className="main-header">
        <div>
          <h1>Family Members</h1>
          
          <p className="date-text">{members.length} members</p>
        </div>
        <button id="special-add-btn" className="btn-create" onClick={() => setIsModalOpen(true)}>
          <UserPlus size={18} /> <span>Add Member</span>
        </button>
      </header>

      
      <div style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Parents</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px',justifyContent: 'center' }}>
          {members.filter(m => m.role === 'Parent').map(renderMemberCard)}
        </div>

        <h2 style={{ fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', margin: '40px 0 16px' }}>Children</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {members.filter(m => m.role === 'Child').map(renderMemberCard)}
        </div>
      </div>

      {/* Modal ... */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <h2>{editingMember ? 'Edit Member' : 'Add Family Member'}</h2>
              <X className="close-icon" onClick={closeModal} />
            </div>
            <form onSubmit={handleAddOrEdit}>
              <div className="input-group">
                <label>Name</label>
                <input name="name" defaultValue={editingMember?.name} required placeholder="Full name" />
              </div>
              <div className="input-group">
                <label>Role</label>
                <select name="role" defaultValue={editingMember?.role || 'Parent'}>
                  <option value="Parent">Parent</option>
                  <option value="Child">Child</option>
                </select>
              </div>
              <div className="input-group">
                <label>Birthdate</label>
                <input type="date" name="birthdate" defaultValue={editingMember?.birthdate} required />
              </div>
              <div className="input-group">
                <label>Avatar Color</label>
                <div style={{ display: 'flex', gap: '14px', marginTop: '10px' }}>
                  {colors.map(c => (
                    <div key={c} onClick={() => setSelectedColor(c)} style={{
                      width: '32px', height: '32px', borderRadius: '50%', backgroundColor: c, cursor: 'pointer',
                      border: selectedColor === c ? '3px solid #6366f1' : 'none',
                      boxShadow: selectedColor === c ? '0 0 0 2px white' : 'none'
                    }} />
                  ))}
                </div>
              </div>
              <div className="modal-footer" style={{ marginTop: '32px' }}>
                <button type="button" className="btn-cancel" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-create" style={{ flex: 1 }}>{editingMember ? 'Save Changes' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Family;