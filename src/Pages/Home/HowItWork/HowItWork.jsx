

const HowItWork = () => {
    const steps = [
    { role: "User", action: "Browse & Order", icon: "🛍️" },
    { role: "Seller", action: "List Products", icon: "📦" },
    { role: "Rider", action: "Deliver Safely", icon: "🚚" },
    { role: "Admin", action: "Manage Everything", icon: "⚙️" },
  ];
    return (
        <section className="px-4 py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-600 mb-10">
          Use our service in 4 simple steps
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-indigo-950 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-white">{step.role}</h3>
              <p className="text-gray-500">{step.action}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    );
};

export default HowItWork;
// 5. How It Works (Steps Section)

// User, Seller, Rider—কিভাবে কাজ করে সেটা ছোট ৩–৪ ধাপে দেখাও।

// User → Browse & Order

// Seller → List Products

// Rider → Deliver Safely

// Admin → Manage Everything