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
        { name: "info@panabotics.com", href: "mailto:info@panabotics.com", icon: Mail },
        { name: "+92 300 1234567", href: "tel:+92 315 3307820", icon: Phone },
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
      className="text-white"
      style={{
        backgroundImage: `linear-gradient(135deg, ${colors.secondaryHex}, ${colors.primaryHex})`,
        color: colors.white,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Responsive grid: default 1 col (mobile), sm 2 cols, md 3 cols, lg 4 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Brand Section */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-2">
              <div className="text-lg sm:text-xl font-bold select-none">
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
            <p className="mb-3 leading-snug text-xs sm:text-sm">
              Transforming businesses through innovative AI and ML solutions. Building intelligent technology for the future.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-md flex items-center justify-center transition-colors duration-200"
                  style={{
                    backgroundColor: colors.white,
                    color: colors.secondaryHex,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.secondaryHex;
                    e.currentTarget.style.color = colors.white;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.white;
                    e.currentTarget.style.color = colors.secondaryHex;
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-xs sm:text-sm font-semibold mb-2 uppercase tracking-wide">{title}</h3>
              <ul className="space-y-1">
                {links.slice(0, 3).map(({ name, href }) => (
                  <li key={name}>
                    <Link
                      to={href}
                      className="transition-colors duration-200 block text-xs sm:text-sm"
                      style={{ color: colors.white }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = colors.grayGradientStart)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = colors.white)
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
        <div className="border-t border-white border-opacity-20 my-5 sm:my-6"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center text-center sm:text-left">
          <p className="text-xs select-none leading-relaxed">
            © 2025 Panabotics. All rights reserved. | Innovating AI Solutions
          </p>
          <div className="flex space-x-3 sm:space-x-4 flex-wrap justify-center sm:justify-start">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (text) => (
                <Link
                  key={text}
                  to="/contact"
                  className="text-xs transition-colors duration-200 select-none"
                  style={{ color: colors.white }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = colors.grayGradientStart)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = colors.white)
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
