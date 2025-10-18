import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Mail, Phone, MapPin, MessageSquare, LifeBuoy, HelpCircle } from "lucide-react";
import colors from "../components/colors"; // Adjust the import path as needed
import { useState, useEffect } from "react";

// Utility to shuffle an array (randomize social links)
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const Footer = () => {
  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Artificial Intelligence", href: "/services" },
        { name: "Machine Learning", href: "/services" },
        { name: "Computer Vision", href: "/services" },
        { name: "Data Analysis", href: "/services" },
        { name: "Automation", href: "/services" },
        { name: "Intelligent Agents", href: "/services" },
      ],
    },
    {
      title: "Industries",
      links: [
        { name: "Healthcare", href: "/portfolio" },
        { name: "Finance", href: "/portfolio" },
        { name: "Manufacturing", href: "/portfolio" },
        { name: "Retail", href: "/portfolio" },
        { name: "Transportation", href: "/portfolio" },
        { name: "Education", href: "/portfolio" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Case Studies", href: "/portfolio" },
        { name: "Blog", href: "/blog" },
        { name: "News", href: "/blog" },
      ],
    },
    {
      title: "Contact",
      links: [
        { name: "panabotics@gmail.com", href: "mailto:panabotics@gmail.com", icon: Mail },
        { name: "03153307820", href: "tel:+923153307820", icon: Phone },
        { name: "Lahore, Pakistan", href: "/contact", icon: MapPin },
        { name: "Contact Form", href: "/contact", icon: MessageSquare },
        { name: "Support Center", href: "/contact", icon: LifeBuoy },
        { name: "LinkedIn", href: "https://www.linkedin.com/company/panabotics/about/?viewAsMember=true", icon: Linkedin },
      ],
    },
  ];

  const allSocialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/panabotics/", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/panabotics", label: "Twitter" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/panabotics/about/?viewAsMember=true", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/panabotics/", label: "Instagram" },
  ];

  const [socialLinks, setSocialLinks] = useState(allSocialLinks);

  useEffect(() => {
    setSocialLinks(shuffleArray(allSocialLinks));
  }, []);

  return (
    <footer
      className="text-white min-h-[1.6in] sm:min-h-[1.9in] lg:min-h-[2.1in]"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.75), #00b4bb)`,
        color: colors.white,
      }}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Responsive grid: compact layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1 sm:ml-3 lg:ml-8">
            <Link to="/" className="flex items-center space-x-1 mb-2 sm:mb-3">
              <div className="text-sm sm:text-base lg:text-lg font-bold select-none">
                <span style={{ color: colors.primaryHex }}>Pana</span>
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${colors.grayGradientStart}, ${colors.grayGradientStart})`,
                  }}
                >
                  botics
                </span>
              </div>
            </Link>
            <p className="mb-2 leading-tight text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>
              AI & ML Solutions
            </p>
            <div className="flex space-x-2 sm:space-x-2.5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center transition-colors duration-200 hover:scale-110"
                  style={{
                    backgroundColor: "#00b4bb",
                    color: colors.white,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.white;
                    e.currentTarget.style.color = "#00b4bb";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#00b4bb";
                    e.currentTarget.style.color = colors.white;
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map(({ title, links }) => (
            <div key={title} className="col-span-1">
              <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 uppercase tracking-wider">{title}</h3>
              <ul className="space-y-1 sm:space-y-1.5">
                {links.map(({ name, href }) => (
                  <li key={name}>
                    <Link
                      to={href}
                      className="transition-colors duration-200 block text-xs sm:text-sm leading-relaxed hover:text-white"
                      style={{ color: "rgba(255,255,255,0.9)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = colors.white)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
                      }
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t my-3 sm:my-4" style={{ borderColor: "rgba(0,0,0,0.06)" }}></div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-2 sm:gap-3 justify-between items-center text-center sm:text-left">
          <p className="text-xs sm:text-sm select-none" style={{ color: "rgba(255,255,255,0.9)" }}>
            © 2025 Panabotics. All rights reserved.
          </p>
          <div className="flex flex-wrap space-x-2 sm:space-x-2.5 gap-1 sm:gap-2 justify-center sm:justify-start">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (text) => (
                <Link
                  key={text}
                  to="/contact"
                  className="text-xs sm:text-sm transition-colors duration-200 select-none hover:text-white"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = colors.white)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
                  }
                >
                  {text}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
