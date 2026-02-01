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
    <div className="backdrop-blur bg-gray-950/10 dark:bg-gray-950/20 px-4 md:px-10 lg:px-20">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400">
        <div>
          <Pothik />
          <p className="max-w-[410px] mt-4 text-gray-900 dark:text-gray-400">
            Pothik is a Bangladesh-based platform, typically offering
            educational, business, or e-commerce services. <br />
            Users can browse various products or services, and sometimes access
            blogs or tutorial content.
          </p>
        </div>

        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-6">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-700 dark:text-gray-200 mb-3">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-900 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition"
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

      <p className="py-4 text-center text-sm md:text-base text-gray-700 dark:text-gray-400">
        Copyright 2025 © Md Fuad Amir. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
