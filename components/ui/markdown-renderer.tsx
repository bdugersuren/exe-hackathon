"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4 text-white" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-3 text-white" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2 text-white" {...props} />,
          p: ({node, ...props}) => <p className="mb-4 last:mb-0 leading-relaxed" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1" {...props} />,
          ol: ({node, ...props}) => <ol className="list-numeric pl-5 mb-4 space-y-1" {...props} />,
          li: ({node, ...props}) => <li className="mb-1" {...props} />,
          strong: ({node, ...props}) => <strong className="font-bold text-[#00f5ff]" {...props} />,
          em: ({node, ...props}) => <em className="italic" {...props} />,
          code: ({node, ...props}) => <code className="bg-white/10 px-1 border border-white/10 rounded font-mono text-sm" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#b05cfd] pl-4 italic my-4" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
      <style jsx global>{`
        .prose strong {
          color: #00f5ff !important;
        }
        .prose ul > li::marker {
          color: #b05cfd !important;
        }
      `}</style>
    </div>
  );
}
