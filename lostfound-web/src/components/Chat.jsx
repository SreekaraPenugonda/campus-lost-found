import { useState, useEffect, useRef } from 'react';
import api from '../services/api';

export default function Chat({ itemId, otherUserId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentUserId = JSON.parse(localStorage.getItem('user') || '{}')?.id;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (itemId && otherUserId) {
      fetchMessages();
    } else {
      setLoading(false);
    }
  }, [itemId, otherUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/chat/conversation/?item=${itemId}&user=${otherUserId}`);
      setMessages(response.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !itemId || !otherUserId) return;
    
    try {
      const response = await api.post('/chat/', {
        item: itemId,
        receiver: otherUserId,
        message: newMessage.trim()
      });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return <div className="chat-loading">Loading chat...</div>;
  }

  if (!itemId || !otherUserId) {
    return (
      <div className="chat-container">
        <div className="chat-header">
          <h3>💬 Chat</h3>
          <span className="chat-status">Select an item to start chatting</span>
        </div>
        <div className="chat-placeholder">
          <p>Select an item and user to start a conversation</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>💬 Chat</h3>
        <span className="chat-status">Secure Messaging</span>
      </div>

      {error && <div className="chat-error">{error}</div>}

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-placeholder">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`chat-message ${msg.sender === currentUserId ? 'sent' : 'received'}`}>
              <p>{msg.message}</p>
              <span className="chat-time">
                {msg.created_at ? new Date(msg.created_at).toLocaleTimeString() : 'Just now'}
              </span>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="btn-primary">Send</button>
      </div>

      <style>{`
        .chat-container {
          background: white;
          border-radius: 8px;
          border: 1px solid #eaeef2;
          display: flex;
          flex-direction: column;
          height: 400px;
        }

        .chat-header {
          padding: 16px 20px;
          border-bottom: 1px solid #eaeef2;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-header h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1a365d;
          margin: 0;
        }

        .chat-status {
          font-size: 13px;
          color: #16a34a;
        }

        .chat-error {
          background: #fee2e2;
          color: #991b1b;
          padding: 8px 16px;
          font-size: 13px;
        }

        .chat-messages {
          flex: 1;
          padding: 16px 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .chat-placeholder {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          font-size: 14px;
        }

        .chat-message {
          max-width: 70%;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 14px;
        }

        .chat-message.sent {
          align-self: flex-end;
          background: #7FFF00;
          color: #1a365d;
        }

        .chat-message.received {
          align-self: flex-start;
          background: #f3f4f6;
          color: #1a1a1a;
        }

        .chat-time {
          font-size: 11px;
          opacity: 0.6;
          display: block;
          margin-top: 2px;
        }

        .chat-input {
          padding: 12px 16px;
          border-top: 1px solid #eaeef2;
          display: flex;
          gap: 12px;
        }

        .chat-input input {
          flex: 1;
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
        }

        .chat-input input:focus {
          border-color: #7FFF00;
        }

        .chat-loading {
          text-align: center;
          padding: 40px;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}