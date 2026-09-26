import React, { useState } from 'react';
import { Post, Comment } from '../../types';

interface ThreadDetailModalProps {
  post: Post | null;
  onClose: () => void;
  onAddComment: (postId: string, commentText: string) => void;
  onVotePost: (postId: string, dir: 'up' | 'down') => void;
}

export const ThreadDetailModal: React.FC<ThreadDetailModalProps> = ({
  post,
  onClose,
  onAddComment,
  onVotePost,
}) => {
  const [commentText, setCommentText] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!post) return null;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText);
    setCommentText('');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-[#e5eeff] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#eff4ff] border-b border-[#e5eeff] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[12px] font-semibold">
            <span className="bg-[#4059aa]/10 text-[#4059aa] px-2.5 py-0.5 rounded-full font-bold">
              {post.tagCategory}
            </span>
            <span className="text-[#a20513]">{post.tagCategoryType}</span>
            <span className="text-[#5b403d]">•</span>
            <span className="text-[#425064]">{post.authorCampus}</span>
            <span className="text-[#5b403d]">•</span>
            <span className="text-[#5b403d]">{post.timeAgo}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#5b403d] hover:bg-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex flex-col gap-5">
          {/* Post Header */}
          <div className="flex items-start gap-4">
            {/* Voting Pill */}
            <div className="flex flex-col items-center bg-[#eff4ff] rounded-full px-2 py-2 shrink-0">
              <button
                onClick={() => onVotePost(post.id, 'up')}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  post.userVote === 'up'
                    ? 'text-[#a20513] bg-[#ffdad6]'
                    : 'text-[#5b403d] hover:text-[#a20513]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">keyboard_arrow_up</span>
              </button>
              <span className="font-bold text-[14px] text-[#a20513] my-0.5">
                {post.upvotes}
              </span>
              <button
                onClick={() => onVotePost(post.id, 'down')}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  post.userVote === 'down'
                    ? 'text-[#4059aa] bg-[#dce1ff]'
                    : 'text-[#5b403d] hover:text-[#4059aa]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">keyboard_arrow_down</span>
              </button>
            </div>

            <div className="flex-1">
              <h2 className="text-[20px] font-bold text-[#0b1c30] leading-snug mb-2">
                {post.title}
              </h2>
              <div className="flex items-center gap-2 mb-3 text-[12px] text-[#5b403d]">
                <span className="font-medium text-[#0b1c30]">{post.authorName}</span>
                <span>({post.authorEmail})</span>
                {post.isVerified && (
                  <span className="inline-flex items-center text-[#4059aa] gap-0.5 text-[11px] font-bold">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    VERIFICADO
                  </span>
                )}
              </div>
              <p className="text-[14px] text-[#0b1c30] leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>
          </div>

          {/* Code snippet if any */}
          {post.codeSnippet && (
            <div className="bg-[#213145] rounded-xl p-4 text-[#eaf1ff] font-mono text-[13px] overflow-x-auto relative">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[11px] text-white/70 font-sans">
                <span>{post.codeSnippet.filename}</span>
                <button
                  onClick={() => handleCopyCode(post.codeSnippet!.code)}
                  className="text-[#8fa7fe] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedCode ? 'check' : 'content_copy'}
                  </span>
                  {copiedCode ? 'Copiado!' : 'Copiar código'}
                </button>
              </div>
              <pre className="overflow-x-auto whitespace-pre">
                <code>{post.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Image if any */}
          {post.imageUrl && (
            <div className="rounded-xl overflow-hidden max-h-80 bg-[#eff4ff] border border-[#e5eeff] relative">
              <img
                src={post.imageUrl}
                alt={post.imageAlt || post.title}
                className="w-full h-72 object-cover"
                referrerPolicy="no-referrer"
              />
              {post.imageCaption && (
                <div className="absolute bottom-2 left-2 bg-[#213145]/85 backdrop-blur-xs text-[#eaf1ff] px-3 py-1 rounded-md text-[11px] font-semibold">
                  {post.imageCaption}
                </div>
              )}
            </div>
          )}

          {/* Moderation Tip */}
          {post.moderationTip && (
            <div className="bg-[#eff4ff] border border-[#dce9ff] rounded-xl p-3.5 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#a20513] text-[20px] shrink-0">
                lightbulb
              </span>
              <div className="text-[13px] text-[#0b1c30]">
                {post.moderationTip}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="pt-4 border-t border-[#e5eeff]">
            <h3 className="font-bold text-[15px] text-[#0b1c30] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#4059aa]">
                chat_bubble
              </span>
              Respostas ({post.commentsList?.length || 0})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-5 flex flex-col gap-2">
              <textarea
                rows={2}
                required
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Escreva uma resposta construtiva ou solução para o colega..."
                className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#dce9ff] rounded-xl text-[13px] text-[#0b1c30] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#a20513]/20 resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#a20513] hover:bg-[#c62828] text-white text-[12px] font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  Responder
                </button>
              </div>
            </form>

            {/* List of comments */}
            <div className="flex flex-col gap-3">
              {post.commentsList && post.commentsList.length > 0 ? (
                post.commentsList.map((c) => (
                  <div
                    key={c.id}
                    className="p-3.5 rounded-xl bg-[#f8f9ff] border border-[#e5eeff] flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between text-[12px]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0b1c30]">{c.author}</span>
                        <span className="text-[#5b403d] text-[11px]">{c.email}</span>
                      </div>
                      <span className="text-[#5b403d] text-[11px]">{c.timeAgo}</span>
                    </div>
                    <p className="text-[13px] text-[#0b1c30] leading-relaxed">{c.text}</p>
                    <div className="flex items-center gap-3 pt-1 text-[11px] text-[#5b403d]">
                      <button className="flex items-center gap-1 hover:text-[#a20513] transition-colors">
                        <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                        <span>{c.upvotes}</span>
                      </button>
                      <button className="hover:text-[#0b1c30] transition-colors">
                        Responder
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-[#5b403d] text-[13px] bg-[#f8f9ff] rounded-xl">
                  Seja o primeiro a responder a esta discussão acadêmica!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
