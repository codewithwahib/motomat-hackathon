// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Header from '../../app/components/header';
// import Footer from '../../app/components/footer'; // Ensure the correct path to the Footer component
// import DropdownMenu from '../dropdown';
// import { client } from '@/sanity/lib/client';

// const MenuItemPage: React.FC = () => {
//   const [policeItems, setPoliceItems] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const { menuItem } = router.query;

//   useEffect(() => {
//     const fetchPoliceItems = async () => {
//       try {
//         const data = await client.fetch(`
//           *[_type == "police"]{
//             name,
//             description,
//             price,
//             discountedPrice,
//             "imageUrl": image.asset->url,
//             "slug": slug.current
//           }
//         `);

//         setPoliceItems(data);
//       } catch (error) {
//         console.error('Error fetching police items:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPoliceItems();
//   }, []);

//   if (loading) return <p className="text-center mt-10 text-xl">Loading...</p>;

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <DropdownMenu />
//       <main className="flex-grow bg-gray-100 py-8">
//         <div className="container mx-auto px-4">
//           <h1 className="text-4xl font-bold text-red-600 capitalize text-center mb-8">
//             {menuItem}
//           </h1>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//             {policeItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="border border-gray-200 rounded-lg p-4 shadow-lg bg-white transform transition duration-300 hover:scale-105"
//               >
//                 {item.imageUrl && (
//                   <a href={`/product/${item.slug}`} className="block">
//                     <img
//                       src={item.imageUrl}
//                       alt={item.name}
//                       className="w-full h-64 object-cover rounded-t-lg mb-4"
//                     />
//                   </a>
//                 )}
//                 <h2 className="text-lg font-semibold mb-2">
//                   <a href={`/product/${item.slug}`} className="text-black hover:no-underline">
//                     {item.name}
//                   </a>
//                 </h2>
//                 <p className="text-gray-600 mb-4">{item.description}</p>
//                 <div className="flex justify-between items-center">
//                   <p className="text-lg font-bold text-red-600">
//                     {typeof item.price === 'number'
//                       ? `$${item.price.toFixed(2)}`
//                       : item.price || 'N/A'}
//                   </p>
//                   {item.discountedPrice !== null && item.discountedPrice < item.price ? (
//                     <p className="text-lg font-semibold text-green-600 line-through">
//                       ${item.discountedPrice.toFixed(2)}
//                     </p>
//                   ) : null}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default MenuItemPage;
