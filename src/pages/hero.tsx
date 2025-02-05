import { useState, useEffect } from 'react';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';  // Adjust the path if needed

export default function Hero() {
  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "hero"][0]{ "imageUrl": image.asset->url }`)
      .then((data) => {
        if (data?.imageUrl) {
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
      <Image
        src={heroImage}
        alt="Hero Banner"
        layout="responsive"
        width={1200}  // Adjust width
        height={600}  // Adjust height
        className="object-cover"
        priority  // Ensures this image loads quickly for better LCP
      />
    </div>
  );
}
