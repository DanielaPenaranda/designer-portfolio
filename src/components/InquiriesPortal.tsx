import { Inquiry } from '../types';
import { Mail, Trash2, Reply, MessageSquare, Clock, ArrowRight } from 'lucide-react';
import { useState, FormEvent } from 'react';

interface InquiriesPortalProps {
  inquiries: Inquiry[];
  onDelete: (id: string) => void;
}

export default function InquiriesPortal({ inquiries, onDelete }: InquiriesPortalProps) {
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>('');
  const [sentReply, setSentReply] = useState<boolean>(false);

  const selectedInquiry = inquiries.find(i => i.id === selectedInquiryId);

  const handleSendReply = (e: FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setSentReply(true);
    setTimeout(() => {
      setSentReply(false);
      setReplyText('');
      setSelectedInquiryId(null);
    }, 2000);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 text-white text-left grid grid-cols-1 lg:grid-cols-12 gap-8" id="inquiries-panel">
      {/* List section */}
      <div className="lg:col-span-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <MessageSquare size={16} className="text-primary" />
            <h3 className="font-display text-sm font-extrabold uppercase tracking-widest">Inquiries Inbox</h3>
          </div>
          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5">{inquiries.length} Messages</span>
        </div>

        {inquiries.length === 0 ? (
          <div className="py-12 text-center text-zinc-500 font-sans space-y-2">
            <Mail size={32} className="mx-auto text-zinc-700" />
            <p className="text-xs font-bold uppercase tracking-widest">Inbox is Empty</p>
            <p className="text-[11px]">Submit the form below to populate dynamic content.</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[350px] overflow-y-auto no-scrollbar pr-1">
            {inquiries.map((inq) => (
              <button
                key={inq.id}
                onClick={() => {
                  setSelectedInquiryId(inq.id);
                  setSentReply(false);
                  setReplyText('');
                }}
                className={`w-full p-4 border transition-all text-left block cursor-pointer ${
                  selectedInquiryId === inq.id
                    ? 'bg-primary/10 border-primary text-white'
                    : 'bg-zinc-950 border-zinc-900 hover:border-zinc-800 text-zinc-300'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold font-display truncate max-w-[150px]">{inq.name}</span>
                  <span className="text-[9px] font-mono text-zinc-500">{inq.createdAt}</span>
                </div>
                <p className="text-xs font-bold text-zinc-200 truncate">{inq.subject}</p>
                <p className="text-[10px] text-zinc-500 truncate mt-1">{inq.message}</p>
                <div className="mt-3 flex gap-2 items-center text-[9px] text-zinc-400 font-bold uppercase">
                  <span className="bg-zinc-900 px-2 py-0.5 text-primary border border-zinc-800">{inq.scope}</span>
                  <span>{inq.budget}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Reader section */}
      <div className="lg:col-span-7 bg-zinc-950 p-6 border border-zinc-900 flex flex-col justify-between min-h-[300px]">
        {selectedInquiry ? (
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div className="space-y-4">
              {/* Reader Header */}
              <div className="flex justify-between items-start pb-4 border-b border-zinc-900">
                <div>
                  <h4 className="font-display text-lg font-black">{selectedInquiry.subject}</h4>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-400 mt-1 font-sans">
                    <span className="font-bold text-white font-mono">{selectedInquiry.name}</span>
                    <span className="text-zinc-600">|</span>
                    <span className="text-primary font-bold">{selectedInquiry.email}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onDelete(selectedInquiry.id);
                    setSelectedInquiryId(null);
                  }}
                  className="p-2 bg-zinc-900 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                  title="Delete message"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Message Content */}
              <div className="p-4 bg-zinc-900 border border-zinc-800/50">
                <p className="text-xs text-zinc-300 font-sans leading-relaxed whitespace-pre-wrap">{selectedInquiry.message}</p>
              </div>

              <div className="flex gap-4 text-[10px] text-zinc-500 font-mono">
                <span className="flex items-center gap-1">
                  <Clock size={10} />
                  Tier: {selectedInquiry.budget}
                </span>
                <span>/</span>
                <span>Scope: {selectedInquiry.scope}</span>
              </div>
            </div>

            {/* Quick Reply Form */}
            <div className="pt-4 border-t border-zinc-900">
              {sentReply ? (
                <div className="bg-primary/10 border border-primary p-4 text-center">
                  <span className="text-xs uppercase font-bold text-primary tracking-wider flex items-center justify-center gap-2">
                    ✓ Reply Dispatched Successfully
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSendReply} className="space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block font-display">Draft Quick Reply</span>
                  <div className="relative">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Draft standard response to ${selectedInquiry.name}...`}
                      rows={2}
                      className="w-full bg-zinc-900 border border-zinc-800 p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-primary font-sans resize-none rounded-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-zinc-900 font-display text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-1.5 ml-auto"
                  >
                    Send Reply
                    <Reply size={10} />
                  </button>
                </form>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 space-y-3 py-16">
            <Mail size={40} className="text-zinc-800" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest">No Message Selected</p>
              <p className="text-[11px] max-w-[280px] mx-auto mt-1 leading-relaxed">
                Click on any received message in your left panel to view high-fidelity details and compose instant drafts.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
