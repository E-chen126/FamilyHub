import React, { useState } from 'react';
import { Plus, CheckCircle, Circle, Trash2 } from 'lucide-react';

const Shopping = ({ items, setItems }) => {
  const [inputValue, setInputValue] = useState('');

  const addItem = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newItem = { id: Date.now(), text: inputValue, purchased: false };
    setItems([newItem, ...items]);
    setInputValue('');
  };

  const togglePurchased = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const clearPurchased = () => {
    setItems(items.filter(item => !item.purchased));
  };

  const activeItems = items.filter(i => !i.purchased);
  const purchasedItems = items.filter(i => i.purchased);

  return (
    <div className="content">
      <header className="main-header">
        <div>
          <h1>Shopping List</h1>
          <p className="date-text">{activeItems.length} items to buy</p>
        </div>
      </header>

      {/* input area */}
      <div className="column-section" style={{ padding: '20px', marginBottom: '32px', minHeight: 'auto' }}>
        <form onSubmit={addItem} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Add an item..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              flex: 1, 
              padding: '12px 16px', 
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              fontSize: '15px', 
              outline: 'none',
              height: '48px'
            }}
          />
          <button 
           type="submit" 
            className="btn-shopping-add"
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#6366f1', 
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0 
            }}>
            <Plus size={24} />
          </button>
        </form>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <button onClick={clearPurchased} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '13px', cursor: 'pointer' }}>
          Clear purchased
        </button>
      </div>

      {/* shopping list*/}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {activeItems.map(item => (
          <div key={item.id} className="column-section" style={{ padding: '20px', minHeight: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div onClick={() => togglePurchased(item.id)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <Circle color="#cbd5e1" size={24} />
            </div>
            <span style={{ flex: 1, fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>{item.text}</span>
          </div>
        ))}
      </div>

      {/* purchased list */}
      {purchasedItems.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            PURCHASED ({purchasedItems.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', opacity: 0.7 }}>
            {purchasedItems.map(item => (
              <div key={item.id} className="column-section" style={{
                padding: '16px 20px', minHeight: 'auto', display: 'flex', alignItems: 'center', gap: '16px',
                background: '#f8fafc', border: 'none'
              }}>
                <div onClick={() => togglePurchased(item.id)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <CheckCircle color="#10b981" size={24} />
                </div>
                <span style={{
                  flex: 1, fontSize: '15px', fontWeight: '600', color: '#64748b',
                  textDecoration: 'line-through'
                }}>
                  {item.text}
                </span>
                <button onClick={() => setItems(items.filter(i => i.id !== item.id))} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <Trash2 size={16} color="#cbd5e1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shopping;