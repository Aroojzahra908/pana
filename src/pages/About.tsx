import { useEffect, useRef } from "react";
import { Users, Award, Lightbulb, Globe } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useLocation } from "react-router-dom";

import colors from "../components/colors";

const About = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible", { delay: 0.2 });
    }
  }, [isInView, controls]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, dots: false } },
      { breakpoint: 768, settings: { slidesToShow: 1, dots: false } },
    ],
  };

  const teamMembers = [
    {
      name: "Zoya Ijaz",
      role: "UI/UX Designer",
      image: "/tech-icons/zoya.jpg",
      bio: "Crafting intuitive and engaging user experiences that make every product simple, modern, and user-friendly.",
    },
    {
      name: "Farhan Ali",
      role: "AI & Product Development Lead",
      image: "/tech-icons/farhan.jpg",
      bio: "Leading AI innovation with expertise and product development to transform bold ideas into impactful solutions.",
    },
    {
      name: "Arooj Zahra",
      role: "AI Researcher",
      image: "/tech-icons/arooj z.jpg",
      bio: "Pushing the boundaries of innovation through advanced AI research, turning complex theories into practical solutions.",
    },
    {
      name: "Waseem Ali",
      role: "Full Stack Developer",
      image: "/tech-icons/wa.png",
      bio: "Building scalable and reliable applications end-to-end, ensuring seamless integration from front-end to back-end.",
    },
  ];

  const clientLogos = [
    "/tech-icons/a1.avif",
    "/tech-icons/a2.avif",
    "/tech-icons/a3.avif",
    "/tech-icons/a4.avif",
    "/tech-icons/a5.avif",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-12 sm:pt-16 md:pt-20 overflow-hidden">
      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Preload largest hero image in HTML head externally for LCP */}
        <motion.div
          key="hero"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ willChange: "transform" }}
          className="text-center mb-12 md:mb-16 relative z-10"
        >
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6"
            style={{ color: colors.primaryHex }}
          >
            About Panabotics
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Founded with a vision to democratize artificial intelligence, we
            bridge the gap between cutting-edge AI research and practical
            business solutions.
          </p>
        </motion.div>

        {/* Background floating elements */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-12 h-12 md:w-16 md:h-16 bg-cyan-100 rounded-full opacity-30 blur-xl"
          aria-hidden="true"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-10 md:right-20 w-16 h-16 md:w-24 md:h-24 bg-purple-100 rounded-full opacity-30 blur-xl"
          aria-hidden="true"
        />
        <motion.div
          animate={{ y: [0, -25, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-1/4 w-14 h-14 md:w-20 md:h-20 bg-blue-100 rounded-full opacity-30 blur-xl"
          aria-hidden="true"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.6 }}
            style={{ willChange: "transform" }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6"
              style={{ color: colors.primaryHex }}
            >
              Our Mission
            </h2>
            <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed">
              Our team of world-class engineers, data scientists, and AI
              researchers combines decades of experience with fresh innovation
              to deliver transformative technology solutions.
            </p>
            <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed">
              We specialize in creating intelligent systems that not only
              automate processes but also learn, adapt, and evolve with your
              business needs. From startups to Fortune 500 companies, we've
              helped organizations harness the power of AI to drive growth,
              efficiency, and innovation.
            </p>
            <p className="text-gray-600 leading-relaxed">
              At Panabotics, we believe AI should augment human intelligence,
              not replace it. Our solutions are designed to empower your team,
              enhance decision-making, and unlock new possibilities for your
              business.
            </p>
          </motion.div>

          <motion.div
            key="stats"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
          >
            {[
              {
                number: "500+",
                label: "Projects Completed",
                bg: "bg-gradient-to-br from-cyan-500 to-blue-500",
              },
              {
                number: "50+",
                label: "Enterprise Clients",
                bg: "bg-gradient-to-br from-purple-500 to-indigo-500",
              },
              {
                number: "99%",
                label: "Client Satisfaction",
                bg: "bg-gradient-to-br from-green-500 to-teal-500",
              },
              {
                number: "24/7",
                label: "Support Available",
                bg: "bg-gradient-to-br from-orange-500 to-pink-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={`stat-${index}`}
                whileHover={{
                  y: -5,
                  scale: 1.03,
                  boxShadow: `0 10px 20px rgba(0,180,187,0.3)`,
                  willChange: "transform",
                }}
                className={`${stat.bg} p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg text-center text-white cursor-pointer transition-shadow duration-300`}
                aria-label={`${stat.number} ${stat.label}`}
              >
                <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-white opacity-90">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          key="values"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-lg md:shadow-xl mb-16 md:mb-24 relative overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300"
          style={{ borderColor: colors.primaryHex, borderWidth: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-blue-50 opacity-30 z-0" aria-hidden="true" />
          <div className="relative z-10">
            <div className="text-center mb-8 md:mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4"
                style={{ color: colors.primaryHex }}
              >
                Our Core Values
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {[
                {
                  icon: Lightbulb,
                  title: "Innovation First",
                  description: "We push the boundaries of what's possible with AI.",
                },
                {
                  icon: Users,
                  title: "Ethical AI",
                  description: "We develop responsible AI systems that benefit society.",
                },
                {
                  icon: Award,
                  title: "Excellence",
                  description: "We maintain the highest standards in everything we do.",
                },
                {
                  icon: Globe,
                  title: "Global Impact",
                  description: "We believe AI can solve humanity's greatest challenges.",
                },
              ].map((value, index) => (
                <motion.div
                  key={`value-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 10px 20px rgba(0,180,187,0.3)`,
                    willChange: "transform",
                  }}
                  className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-sm md:shadow-md text-center cursor-pointer transition-shadow duration-300"
                  style={{ borderColor: colors.primaryHex, borderWidth: 1 }}
                >
                  <div
                    className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4"
                    style={{ color: "white" }}
                  >
                    <value.icon className="h-6 w-6 md:h-8 md:w-8" />
                  </div>
                  <h3
                    className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2"
                    style={{ color: colors.primaryHex }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <div className="mb-16 md:mb-24">
          <motion.div
            key="team-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4"
              style={{ color: colors.primaryHex }}
            >
              Meet Our Team
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              World-class talent driving AI innovation forward
            </p>
          </motion.div>

          <div className="px-2 sm:px-4">
            <Slider {...sliderSettings}>
              {teamMembers.map((member, index) => (
                <div key={`team-${index}`} className="px-2 sm:px-4">
                  <motion.div
                    whileHover={{
                      y: -10,
                      boxShadow: `0 10px 20px rgba(0,180,187,0.3)`,
                      willChange: "transform",
                    }}
                    className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg overflow-hidden cursor-pointer transition-shadow duration-300"
                    style={{ borderColor: colors.primaryHex, borderWidth: 1 }}
                  >
                    <div className="h-48 sm:h-56 md:h-64 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        width={640}
                        height={480}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 md:p-6">
                      <h3
                        className="text-lg md:text-xl font-bold text-gray-900"
                        style={{ color: colors.primaryHex }}
                      >
                        {member.name}
                      </h3>
                      <p
                        className="text-sm md:text-base text-cyan-600 mb-2"
                        style={{ color: colors.primaryHex }}
                      >
                        {member.role}
                      </p>
                      <p className="text-sm md:text-base text-gray-600">
                        {member.bio}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Clients Section */}
        <motion.div
          key="clients"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <div className="text-center mb-8 md:mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4"
              style={{ color: colors.primaryHex }}
            >
              Trusted By Industry Leaders
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              We partner with organizations across industries to deliver
              transformative AI solutions
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 items-center px-4">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={`client-${index}`}
                whileHover={{ scale: 1.1, willChange: "transform" }}
                className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-lg md:rounded-xl shadow-sm md:shadow-md flex items-center justify-center p-3 md:p-4 cursor-pointer transition-transform duration-300"
                style={{
                  borderColor: colors.primaryHex,
                  borderWidth: 1,
                  borderStyle: "solid",
                }}
              >
                <img
                  src={logo}
                  alt={`Client logo ${index}`}
                  width={128}
                  height={128}
                  loading="lazy"
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievement section */}
        <motion.div
          key="achievements"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 text-white relative overflow-hidden mb-16 md:mb-24 cursor-pointer hover:shadow-2xl transition-shadow duration-300"
          style={{ backgroundColor: colors.primaryHex }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden="true"
          ></div>

          <div className="relative z-10">
            <div className="text-center mb-8 md:mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold mb-3 md:mb-4"
                style={{
                  color: colors.white,
                  textShadow: "0 2px 16px rgba(0,0,0,0.15)",
                }}
              >
                Industry Recognition
              </h2>
              <p
                className="text-lg md:text-xl max-w-3xl mx-auto px-4"
                style={{
                  color: "#fff",
                  textShadow: "0 2px 8px rgba(0,0,0,0.18)",
                  fontWeight: 500,
                }}
              >
                Our work has been recognized by leading organizations and
                publications worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {[
                {
                  icon: "🏆",
                  title: "AI Excellence Award 2024",
                  description:
                    "Recognized for breakthrough in natural language processing",
                },
                {
                  icon: "🚀",
                  title: "Tech Innovation Leader",
                  description: "Ranked #1 AI startup by TechCrunch",
                },
                {
                  icon: "⭐",
                  title: "Best AI Startup 2023",
                  description: "Awarded by AI Business Review",
                },
                {
                  icon: "📚",
                  title: "50+ Research Papers",
                  description: "Published in top-tier conferences",
                },
              ].map((item, index) => (
                <motion.div
                  key={`achievement-${index}`}
                  className="bg-white bg-opacity-10 backdrop-blur-sm p-4 md:p-6 rounded-lg md:rounded-xl border border-white border-opacity-20 cursor-pointer transition-shadow duration-300"
                  whileHover={{
                    y: -5,
                    boxShadow: `0 10px 20px rgba(0,180,187,0.3)`,
                    backgroundColor: "#fff",
                    color: colors.primaryHex,
                  }}
                  style={{ color: "#fff" }}
                >
                  <div
                    className="text-3xl md:text-4xl mb-3 md:mb-4"
                    style={{ transition: "color 0.3s" }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    className="text-lg md:text-xl font-bold mb-1 md:mb-2"
                    style={{ fontWeight: 700, transition: "color 0.3s" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm md:text-base opacity-90"
                    style={{ fontWeight: 500, transition: "color 0.3s" }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          key="cta"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center px-4"
          style={{ willChange: "transform" }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6"
            style={{ color: colors.primaryHex }}
          >
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8">
            Let's discuss how Panabotics can help you harness the power of
            artificial intelligence to drive growth and innovation.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: colors.primaryHex,
                boxShadow: `0 10px 20px rgba(${colors.primaryRgb}, 0.3)`,
              }}
              whileTap={{ scale: 0.95 }}
              className="text-white px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl text-base md:text-lg font-semibold shadow-md hover:shadow-lg transition-all border-2 cursor-pointer"
              style={{
                backgroundColor: colors.primaryHex,
                borderColor: colors.primaryHex,
              }}
            >
              Get in Touch
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
