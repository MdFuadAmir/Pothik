import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";

const WhyChooseUs = () => {
  return (
    <section class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <SectionTitle sectionTitle={'Why Choose Us'} sectionSubTitle={'Our services are designed to provide the best experience for you.'}></SectionTitle>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <span class="text-4xl">🚚</span>
            <h3 class="text-xl font-semibold mt-4">Fast Delivery</h3>
            <p class="text-gray-500 mt-2 text-sm">
              Quick and reliable parcel delivery services.
            </p>
          </div>

          <div class="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <span class="text-4xl">🛒</span>
            <h3 class="text-xl font-semibold mt-4">Easy Shopping</h3>
            <p class="text-gray-500 mt-2 text-sm">
              Shop conveniently with a smooth experience.
            </p>
          </div>

          <div class="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <span class="text-4xl">🔒</span>
            <h3 class="text-xl font-semibold mt-4">Secure Payment</h3>
            <p class="text-gray-500 mt-2 text-sm">
              Safe and encrypted payment methods.
            </p>
          </div>

          <div class="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <span class="text-4xl">💬</span>
            <h3 class="text-xl font-semibold mt-4">24/7 Support</h3>
            <p class="text-gray-500 mt-2 text-sm">
              Always here to help you anytime, anywhere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

// 3. Why Choose Us / Service Highlights

// আইকন + ছোট টেক্সট আকারে ৩–৪টা সুবিধা দেখাও।

// 🚚 Fast Delivery

// 🛒 Easy Shopping

// 🔒 Secure Payment

// 💬 24/7 Support
