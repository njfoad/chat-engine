import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../ChatProvider';

// --- FALLBACK BRANDING CONSTANTS ---
// (These can be swapped for theme properties later)
const ALT_PRIMARY = '#0033A0';    
const ALT_BORDER = '#D9E2EC';     
const ALT_TEXT = '#102A43';       

const renderMessageWithLinks = (text: string) => {
  const urlRegex = /(https?\\?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) => {
    if (part.match(urlRegex)) {
      const cleanURL = part.replace(/\\/g, '');
      return (
        <a key={i} href={cleanURL} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', fontWeight: '500' }}>
          {cleanURL}
        </a>
      );
    }
    return part;
  });
};

interface CustomMessageProps { payload: string; onAction: (tag: string) => void; theme?: any; }

const CustomMessageRenderer: React.FC<CustomMessageProps> = ({ payload, onAction, theme }) => {
  if (!payload.startsWith("RICH! ")) return <div>{payload}</div>;
  const sections = payload.replace("RICH! ", "").split("|");
  
  // Grab the primary color for the custom buttons
  const primaryBg = theme?.bubbles?.userBackground || ALT_PRIMARY;

  return (
    <div style={{ backgroundColor: '#fff', padding: '14px', borderRadius: '4px', maxWidth: '100%', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: `1px solid ${ALT_BORDER}` }}>
      {sections.map((section, idx) => {
        if (section.startsWith("text:")) {
          return <p key={idx} style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#111', lineHeight: '1.4' }}>{section.replace("text:", "").trim().replace(/^'|'$/g, "")}</p>;
        }
        if (section.startsWith("address:")) {
          const pairs = section.replace("address:", "").trim().split(",");
          return (
            <table key={idx} style={{ width: '100%', fontSize: '12px', marginBottom: '12px' }}>
              <tbody>
                {pairs.map((pair, pIdx) => {
                  const [key, val] = pair.split(":");
                  return (
                    <tr key={pIdx}>
                      <td style={{ padding: '3px 0', fontWeight: '600', color: '#666', width: '80px' }}>{key.trim()}:</td>
                      <td style={{ padding: '3px 0', color: '#111' }}>{val.trim().replace(/^'|'$/g, "")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        }
        if (section.startsWith("responseBox:")) {
          const match = section.match(/\[(.*?)\]/);
          if (!match) return null;
          return (
            <div key={idx} style={{ display: 'flex', gap: '8px' }}>
              {match[1].split(";").map((btnStr, bIdx) => {
                const labelMatch = btnStr.match(/label:\s*'(.*?)'/);
                const tagMatch = btnStr.match(/tag:\s*'(.*?)'/);
                if (!labelMatch || !tagMatch) return null;
                return (
                  <button key={bIdx} onClick={() => onAction(tagMatch[1])} style={{ flex: 1, padding: '10px', backgroundColor: primaryBg, color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                    {labelMatch[1]}
                  </button>
                );
              })}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export function ChatWindow({ closeChat, theme }: { closeChat: () => void, theme?: any }) {
  const { messages, isConnecting, connectionError, sendMessage, notifyTyping, sendAttachment, isChatClosed, sendReply, typingParticipants } = useChat();
  
  // --- EXTRACT ALL THEME VARIABLES ---
  const headerBg = theme?.header?.backgroundColor || ALT_PRIMARY;
  const headerText = theme?.header?.textColor || 'white';
  const headerTitle = theme?.header?.title || 'Altamino Assistant';
  const logoText = theme?.header?.logoText || 'ALT';
  
  const userBubbleBg = theme?.bubbles?.userBackground || ALT_PRIMARY;
  const userBubbleText = theme?.bubbles?.userText || 'white';
  const agentBubbleBg = theme?.bubbles?.agentBackground || '#fff';
  const agentBubbleText = theme?.bubbles?.agentText || ALT_TEXT;
  
  const rmBg = theme?.bubbles?.richMediaBackground || '#e8eaf6';
  const rmBtnBg = theme?.bubbles?.richMediaButtonColor || '#958fd6';
  
  const placeholderTxt = theme?.input?.placeholderText || "Type message to Altamino...";
  const sendBtnBg = theme?.input?.sendButtonBackground || ALT_PRIMARY;
  const sendBtnTxt = theme?.input?.sendButtonText || 'white';
  // -----------------------------------

  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try { await sendAttachment(file); } 
    catch (error) { console.error("Failed to send file:", error); } 
    finally { if (fileInputRef.current) fileInputRef.current.value = ''; }
  };
  
  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = (textOverride?: string) => {
    const val = textOverride || inputValue;
    if (!val.trim()) return;
    sendMessage(val);
    if (!textOverride) setInputValue('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#F8FAFC' }}>
      
      {/* HEADER */}
      <div style={{ padding: '16px', background: headerBg, color: headerText, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: headerText, color: headerBg, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>{logoText}</div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{headerTitle}</div>
            <div style={{ fontSize: '11px', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isConnecting ? '#ccc' : '#10B981' }}></span>
              {isConnecting ? 'Connecting...' : (connectionError ? 'Error' : 'Online')}
            </div>
          </div>
        </div>
        <button onClick={closeChat} style={{ background: 'none', border: 'none', color: headerText, fontSize: '24px', cursor: 'pointer', lineHeight: '1' }}>×</button>
      </div>

      {/* MESSAGES AREA */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {connectionError && <div style={{color: 'red', fontSize: '12px', textAlign: 'center'}}>{connectionError}</div>}
        
        {messages.map((msg, index) => {
          const textStr = msg.body?.elementText?.text || msg.text || '';
          const attachments = msg.attachments || [];
          const richMediaActions = msg.body?.richMediaPayload?.actions || [];
          const isCode = typeof textStr === 'string' && textStr.startsWith("RICH! ");
          const isMe = msg.senderParticipant?.participantType === 'CUSTOMER' || msg.isLocal;
          const hasActions = richMediaActions.length > 0;

          return (
            <div key={msg.messageId || index} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '85%', display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start', marginBottom: '12px' }}>
              
              {attachments.map((att: any) => (
                <div key={att.attachmentId} style={{ marginBottom: (textStr || hasActions) ? '6px' : '0' }}>
                  {att.contentType?.startsWith('image/') ? (
                    <img src={att.attachmentUrl} alt={att.attachmentName} style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '6px', objectFit: 'contain', border: isMe ? 'none' : `1px solid ${ALT_BORDER}` }} />
                  ) : (
                    <a href={att.attachmentUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '8px', backgroundColor: isMe ? 'rgba(255,255,255,0.2)' : '#f0f0f0', borderRadius: '6px', color: isMe ? userBubbleText : '#0056b3', textDecoration: 'none', fontSize: '13px', border: isMe ? 'none' : `1px solid ${ALT_BORDER}` }}>
                      📎 {att.attachmentName}
                    </a>
                  )}
                </div>
              ))}

              {(textStr || hasActions) && (
                <div style={{ 
                  backgroundColor: isMe ? userBubbleBg : (hasActions ? rmBg : agentBubbleBg), // <-- Applied Bubble Bg Theme
                  color: isMe ? userBubbleText : agentBubbleText,                             // <-- Applied Bubble Text Theme
                  padding: '12px', borderRadius: '6px', fontSize: '13px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: isMe ? 'none' : `1px solid ${ALT_BORDER}`, lineHeight: '1.45', minWidth: hasActions ? '200px' : 'auto' 
                }}>
                  
                  {textStr && !isCode && (
                    <div style={{ marginBottom: hasActions ? '12px' : '0' }}>
                      {renderMessageWithLinks(textStr)}
                    </div>
                  )}
                  
                  {textStr && isCode && (
                    <CustomMessageRenderer payload={textStr} onAction={(tag) => handleSend(tag)} theme={theme} /> // <-- Passed Theme
                  )}

                  {hasActions && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {richMediaActions.map((action: any, i: number) => (
                        <button 
                          key={i} onClick={() => sendReply(action.payload, action.text)} disabled={isChatClosed}
                          style={{
                            backgroundColor: rmBtnBg, // <-- Applied Rich Media Button Theme
                            color: 'white', border: 'none', borderRadius: '4px', padding: '10px 16px', cursor: isChatClosed ? 'not-allowed' : 'pointer', fontWeight: '500', width: '100%', transition: 'opacity 0.2s'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                        >
                          {action.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* TYPING INDICATOR */}
      {typingParticipants.length > 0 && !isChatClosed && (
        <div style={{ padding: '8px 16px', fontSize: '12px', color: '#888', fontStyle: 'italic', backgroundColor: '#f9f9f9', borderTop: `1px solid ${ALT_BORDER}` }}>
          {typingParticipants.join(', ')} {typingParticipants.length > 1 ? 'are' : 'is'} typing...
        </div>
      )}

      {isChatClosed && (
        <div style={{ padding: '10px', textAlign: 'center', backgroundColor: '#f8f9fa', color: '#6c757d', fontSize: '12px', borderTop: `1px solid ${ALT_BORDER}` }}>
          Chat ended by agent.
        </div>
      )}

      {/* INPUT AREA */}
      <div style={{ display: 'flex', padding: '12px', borderTop: isChatClosed ? 'none' : `1px solid ${ALT_BORDER}`, backgroundColor: isChatClosed ? '#f8f9fa' : '#fff', alignItems: 'center' }}>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} disabled={isChatClosed} />
        <button 
          onClick={() => fileInputRef.current?.click()} disabled={isConnecting || isChatClosed}
          style={{ background: 'none', border: 'none', cursor: (isConnecting || isChatClosed) ? 'not-allowed' : 'pointer', padding: '8px 12px', fontSize: '18px', 
            color: (isConnecting || isChatClosed) ? '#ccc' : sendBtnBg // <-- Applied Input Send Theme to icon
          }}
          title="Attach a file"
        >
          📎
        </button>
        <input 
          type="text" value={inputValue}
          onChange={(e) => { setInputValue(e.target.value); notifyTyping(); }}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          placeholder={isChatClosed ? "Chat has ended" : placeholderTxt} // <-- Applied Input Placeholder Theme
          disabled={isConnecting || isChatClosed}
          style={{ flex: 1, padding: '10px', border: `1px solid ${ALT_BORDER}`, borderRadius: '4px', outline: 'none', fontSize: '14px', backgroundColor: isChatClosed ? '#e9ecef' : '#fff', fontFamily: 'inherit' }}
        />
        <button 
          onClick={() => handleSend()} disabled={!inputValue.trim() || isConnecting || isChatClosed}
          style={{ 
            marginLeft: '12px', padding: '10px 16px', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontFamily: 'inherit',
            cursor: (isConnecting || isChatClosed || !inputValue.trim()) ? 'not-allowed' : 'pointer', 
            backgroundColor: (isConnecting || isChatClosed || !inputValue.trim()) ? '#ccc' : sendBtnBg, // <-- Applied Input Send Theme
            color: sendBtnTxt 
          }}
        >
          SEND
        </button>
      </div>
    </div>
  );
}