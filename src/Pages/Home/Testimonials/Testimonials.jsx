import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";

const Testimonials = () => {
  return (
    // Testimonials Section
    <div className="p-8 bg-gray-50">
      <SectionTitle sectionTitle={"What Our Customers Say"}></SectionTitle>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Testimonial 1 */}
        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</span>
          </div>
          <p className="text-gray-600 mb-4">
            "Great service! My parcel arrived on time and in perfect condition.
            Highly recommend!"
          </p>
          <p className="font-bold">— Sarah Ahmed</p>
        </div>

        {/* Testimonial 2 */}
        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</span>
          </div>
          <p className="text-gray-600 mb-4">
            "Easy ordering and reliable delivery. Truly a hassle-free
            experience."
          </p>
          <p className="font-bold">— Rafiq Hossain</p>
        </div>

        {/* Testimonial 3 */}
        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 text-xl">⭐⭐⭐⭐</span>
          </div>
          <p className="text-gray-600 mb-4">
            "Affordable rates and quick support. I’m very satisfied with their
            service."
          </p>
          <p className="font-bold">— Mina Chowdhury</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

// 6. Testimonials / User Feedback

// ২–৩টা কাস্টমার রিভিউ/সেলার রিভিউ দেখাও।

// Rating + ছোট টেক্সট।
