import React from 'react';

interface AttentionBarProps {
  primaryMessage: string;
  secondaryMessage?: string;
  tertiaryMessage?: string;
  url?: string;
  backgroundColor: string;
  textColor: string;
}

const AttentionBar: React.FC<AttentionBarProps> = ({
  primaryMessage,
  secondaryMessage,
  tertiaryMessage,
  url,
  backgroundColor,
  textColor,
}) => {
  if (!primaryMessage) return null;

  return (
    <div
      className={`flex items-center justify-center px-4 py-2 ${backgroundColor} ${textColor} overflow-hidden relative`}
    >
      <div
        className="absolute whitespace-nowrap animate-slideRightToLeft font-bold font-sans"
        style={{ animationDuration: '10s', animationIterationCount: 'infinite' }}
      >
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline pr-8"
          >
            {primaryMessage}
          </a>
        ) : (
          <p className="pr-8">{primaryMessage}</p>
        )}
        {secondaryMessage && (
          <span className="ml-4 italic font-light">{secondaryMessage}</span>
        )}
        {tertiaryMessage && (
          <span className="ml-4 text-sm font-thin">{tertiaryMessage}</span>
        )}
      </div>
    </div>
  );
};

export default AttentionBar;
