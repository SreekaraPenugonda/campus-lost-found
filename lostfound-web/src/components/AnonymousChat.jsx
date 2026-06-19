import { useState, useEffect, useRef } from 'react';
import api from '../services/api';

export default function AnonymousChat({ matchId, userId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 5000); // Poll for new messages
    return () => clearInterval(interval);
  }, [matchId]);

  const loadMessages = async () => {
    try {
      const res = await api.get(`/chat/?match=${matchId}`);
      setMessages(res.data.results || res.data);
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || loading) return;

    setLoading(true);
    try {
      await api.post('/chat/', {
        match_id: matchId,
        message: newMessage,
        sender_id: userId
      });
      setNewMessage('');
      loadMessages();
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="anonymous-chat">
      <div className="chat-header">
        <span className="chat-icon">🔒</span>
        <div className="chat-title">
          <h3>Secure Chat</h3>
          <p className="chat-subtitle">Your identity is protected</p>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="no-messages">
            <p>💬 Start the conversation</p>
            <p className="hint">Ask about the item to verify ownership</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === userId ? 'sent' : 'received'}`}
            >
              <div className="message-bubble">
                <p>{msg.message}</p>
                <span className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="chat-input-form">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !newMessage.trim()}>
          Send
        </button>
      </form>

      <style>{`
        .anonymous-chat {
          background: white;
          border-radius: 12px;
          border: 1px solid #eaeef2;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 500px;
        }
        .chat-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: linear-gradient(135deg, #1a365d, #2d5a8e);
          color: white;
        }
        .chat-icon {
          font-size: 24px;
        }
        .chat-title h3 {
          margin: 0;
          font-size: 16px;
        }
        .chat-subtitle {
          margin: 2px 0 0;
          font-size: 12px;
          opacity: 0.85;
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          background: #f8f9fa;
        }
        .no-messages {
          text-align: center;
          padding: 40px 20px;
          color: #6b7280;
        }
        .no-messages p {
          margin: 0;
        }
        .no-messages .hint {
          font-size: 13px;
          color: #9ca3af;
          margin-top: 4px;
        }
        .message {
          display: flex;
          margin-bottom: 12px;
        }
        .message.sent {
          justify-content: flex-end;
        }
        .message.received {
          justify-content: flex-start;
        }
        .message-bubble {
          max-width: 70%;
          padding: 10px 14px;
          border-radius: 12px;
          position: relative;
        }
        .message.sent .message-bubble {
          background: #7FFF00;
          color: #1a365d;
          border-bottom-right-radius: 4px;
        }
        .message.received .message-bubble {
          background: white;
          color: #1a365d;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        .message-bubble p {
          margin: 0;
          font-size: 14px;
          line-height: 1.4;
        }
        .message-time {
          display: block;
          font-size: 10px;
          opacity: 0.7;
          margin-top: 4px;
        }
        .chat-input-form {
          display: flex;
          gap: 8px;
          padding: 12px;
          background: white;
          border-top: 1px solid #eaeef2;
        }
        .chat-input-form input {
          flex: 1;
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
        }
        .chat-input-form input:focus {
          outline: none;
          border-color: #7FFF00;
        }
        .chat-input-form button {
          padding: 10px 20px;
          background: #7FFF00;
          color: #1a365d;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }
        .chat-input-form button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}