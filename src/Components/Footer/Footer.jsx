import Pothik from "../../Shared/Pothik/Pothik";

const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"],
    },
    {
      title: "Need Help?",
      links: [
        "Delivery Information",
        "Return & Refund Policy",
        "Payment Methods",
        "Track your Order",
        "Contact Us",
      ],
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "Facebook", "YouTube"],
    },
  ];

  return (
    <footer className="relative bg-gradient-to-t from-gray-950 via-gray-900 to-gray-950 text-gray-300">
      {/* Top area */}
      <div className="px-4 md:px-10 lg:px-20 py-14 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-700/50">
        
        {/* Brand Section */}
        <div>
          <Pothik />
          <p className="max-w-[420px] mt-4 text-sm leading-relaxed text-gray-400">
            Pothik is a Bangladesh-based platform, typically offering
            educational, business, or e-commerce services. <br />
            Users can browse various products or services, and sometimes access
            blogs or tutorial content.
          </p>
        </div>

        {/* Links Section */}
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-white mb-4 relative inline-block">
                {section.title}
                <span className="absolute left-0 -bottom-1 w-8 h-[2px] bg-sky-500"></span>
              </h3>
              <ul className="text-sm space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom area */}
      <div className="py-5 text-center text-sm text-gray-400">
        <span className="text-gray-500">© 2025</span>{" "}
        <span className="text-white font-medium">Md Fuad Amir</span>. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
