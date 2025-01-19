import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';  // Adjust import path if necessary

export default function Hero() {
  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "hero"][0]{ "imageUrl": image.asset->url }`)
      .then((data) => {
        if (data.imageUrl) {
          setHeroImage(data.imageUrl);
        }
      })
      .catch((error) => {
        console.error('Error fetching hero image:', error);
      });
  }, []);

  if (!heroImage) {
    return <p className="text-center mt-10 text-xl">Loading Hero Image...</p>;
  }

  return (
    <div className="hero">
      <img src={heroImage} alt="Hero Banner" className="w-full h-auto object-cover" />
    </div>
  );
}
