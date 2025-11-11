// import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";

// const Testimonials = () => {
//   return (
//     // Testimonials Section
//     <div className="px-4 py-8">
//       <SectionTitle
//         sectionTitle={"What Our Customers Say"}
//         sectionSubTitle={
//           "Hear from people who’ve experienced fast and reliable delivery."
//         }
//       ></SectionTitle>
//       <div className="grid md:grid-cols-3 gap-6">
//         {/* Testimonial 1 */}
//         <div className="p-6 bg-indigo-950 rounded-xl shadow-md">
//           <div className="flex items-center mb-4">
//             <span className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</span>
//           </div>
//           <p className="text-gray-400 mb-4">
//             "Great service! My parcel arrived on time and in perfect condition.
//             Highly recommend!"
//           </p>
//           <p className="font-bold text-white">— Sarah Ahmed</p>
//         </div>

//         {/* Testimonial 2 */}
//         <div className="p-6 bg-indigo-950 rounded-xl shadow-md">
//           <div className="flex items-center mb-4">
//             <span className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</span>
//           </div>
//           <p className="text-gray-400 mb-4">
//             "Easy ordering and reliable delivery. Truly a hassle-free
//             experience."
//           </p>
//           <p className="font-bold text-white">— Rafiq Hossain</p>
//         </div>

//         {/* Testimonial 3 */}
//         <div className="p-6 bg-indigo-950 rounded-xl shadow-md">
//           <div className="flex items-center mb-4">
//             <span className="text-yellow-400 text-xl">⭐⭐⭐⭐</span>
//           </div>
//           <p className="text-gray-400 mb-4">
//             "Affordable rates and quick support. I’m very satisfied with their
//             service."
//           </p>
//           <p className="font-bold text-white">— Mina Chowdhury</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonials;

// // 6. Testimonials / User Feedback

// // ২–৩টা কাস্টমার রিভিউ/সেলার রিভিউ দেখাও।

// // Rating + ছোট টেক্সট।

import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const testimonialData = [
  {
    id: 1,
    name: "Sarah Ahmed",
    rating: 5,
    text: "Great service! My parcel arrived on time and in perfect condition. Highly recommend!",
  },
  {
    id: 2,
    name: "Rafiq Hossain",
    rating: 5,
    text: "Easy ordering and reliable delivery. Truly a hassle-free experience.",
  },
  {
    id: 3,
    name: "Mina Chowdhury",
    rating: 4,
    text: "Affordable rates and quick support. I’m very satisfied with their service.",
  },
];

// ⭐ Helper function to render stars
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) stars.push(<FaStar key={i} className="text-yellow-400" />);
    else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
  }
  return stars;
};

const Testimonials = () => {
  return (
    <section className="px-4 py-12">
      <div className="max-w-7xl mx-auto text-center">
        <SectionTitle
          sectionTitle="What Our Customers Say"
          sectionSubTitle="Hear from people who’ve experienced fast and reliable delivery."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {testimonialData.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-linear-to-br from-indigo-400 via-violet-300 to-indigo-400 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4 space-x-1">
                {renderStars(item.rating)}
              </div>
              <p className="text-gray-700 mb-4">{item.text}</p>
              <p className="font-bold text-white">— {item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
