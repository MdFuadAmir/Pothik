import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";

const Testimonials = () => {
  return (
    // Testimonials Section
    <div className="px-4 py-8">
      <SectionTitle sectionTitle={"What Our Customers Say"} sectionSubTitle={'Hear from people who’ve experienced fast and reliable delivery.'}></SectionTitle>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Testimonial 1 */}
        <div className="p-6 bg-indigo-950 rounded-xl shadow-md">
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</span>
          </div>
          <p className="text-gray-400 mb-4">
            "Great service! My parcel arrived on time and in perfect condition.
            Highly recommend!"
          </p>
          <p className="font-bold text-white">— Sarah Ahmed</p>
        </div>

        {/* Testimonial 2 */}
        <div className="p-6 bg-indigo-950 rounded-xl shadow-md">
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</span>
          </div>
          <p className="text-gray-400 mb-4">
            "Easy ordering and reliable delivery. Truly a hassle-free
            experience."
          </p>
          <p className="font-bold text-white">— Rafiq Hossain</p>
        </div>

        {/* Testimonial 3 */}
        <div className="p-6 bg-indigo-950 rounded-xl shadow-md">
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 text-xl">⭐⭐⭐⭐</span>
          </div>
          <p className="text-gray-400 mb-4">
            "Affordable rates and quick support. I’m very satisfied with their
            service."
          </p>
          <p className="font-bold text-white">— Mina Chowdhury</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

// 6. Testimonials / User Feedback

// ২–৩টা কাস্টমার রিভিউ/সেলার রিভিউ দেখাও।

// Rating + ছোট টেক্সট।
