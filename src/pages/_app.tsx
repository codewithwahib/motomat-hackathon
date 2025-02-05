import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { createClient } from 'next-sanity';
import { CartProvider } from '@/app/contexts/cartcontext';

// Conditionally import BrowserRouter
import dynamic from 'next/dynamic';
const BrowserRouter = dynamic(() => import('react-router-dom').then((mod) => mod.BrowserRouter), {
  ssr: false, // Avoid SSR for BrowserRouter
});

// Sanity Client Configuration
const sanityClient = createClient({
  projectId: 'or2z98sf', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your dataset name
  apiVersion: '2023-01-01',
  useCdn: true, // Use CDN for faster fetching in production
});

// AttentionBar Component
interface AttentionBarProps {
  message: string;
  url?: string;
  backgroundColor: string;
  textColor: string;
}

const AttentionBar: React.FC<AttentionBarProps> = ({ message, url, backgroundColor, textColor }) => {
  if (!message) return null;

  return (
    <div
      className={`flex items-center justify-center px-4 py-5 ${backgroundColor} ${textColor} overflow-hidden relative`}
    >
      <div
        className="absolute whitespace-nowrap animate-slideRightToLeft font-bold font-sans text-xl" // Increased text size to text-xl
        style={{ animationDuration: '10s', animationIterationCount: 'infinite' }}
      >
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="underline pr-8">
            {message}
          </a>
        ) : (
          <p className="pr-8">{message}</p>
        )}
      </div>
    </div>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  const [attentionBar, setAttentionBar] = useState<{
    message: string;
    url?: string;
    backgroundColor: string;
    textColor: string;
  } | null>(null);

  useEffect(() => {
    const fetchAttentionBar = async () => {
      const query = `*[_type == "attentionBar" && isVisible == true][0] {
        message,
        url,
        backgroundColor,
        textColor
      }`;

      const data = await sanityClient.fetch(query);
      setAttentionBar(data);
    };

    fetchAttentionBar();
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        {/* Display Attention Bar if data is fetched */}
        {attentionBar && (
          <AttentionBar
            message={attentionBar.message}
            url={attentionBar.url}
            backgroundColor={attentionBar.backgroundColor}
            textColor={attentionBar.textColor}
          />
        )}
        <Component {...pageProps} />
      </BrowserRouter>
    </CartProvider>
  );
}

