import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import colors from "../components/colors";
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [stats, setStats] = useState({ projects: 0, clients: 0, accuracy: 0, uptime: 0 });
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on route change and component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((element, index) => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.opacity = '0';
      htmlElement.style.transform = 'translateY(30px)';
      htmlElement.style.transition = `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`;
      observer.observe(element);
    });

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
        }
      });
    }, { threshold: 0.5 });

    const statsElement = document.querySelector('.stats-section');
    if (statsElement) {
      statsObserver.observe(statsElement);
    }

    return () => {
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(testimonialTimer);
  }, []);

  const animateStats = () => {
    const duration = 2000;
    const targets = { projects: 150, clients: 50, accuracy: 99, uptime: 99.9 };
    const start = Date.now();

    const updateStats = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);

      setStats({
        projects: Math.floor(targets.projects * progress),
        clients: Math.floor(targets.clients * progress),
        accuracy: Math.floor(targets.accuracy * progress),
        uptime: parseFloat((targets.uptime * progress).toFixed(1))
      });

      if (progress < 1) {
        requestAnimationFrame(updateStats);
      }
    };

    updateStats();
  };

  const services = [
    {
      title: "Artificial Intelligence",
      description: "Transform your business with cutting-edge AI solutions. Our custom neural networks and deep learning models deliver intelligent automation, predictive analytics, and decision-making capabilities that adapt and evolve with your needs.",
      features: ["Custom Neural Networks", "NLP & Language Models", "Predictive Analytics", "Intelligent Automation"],
      images: [
        "/tech-icons/s1.jfif",
        "/tech-icons/s2.jfif",
        "/tech-icons/s3.jfif"
      ]
    },
    {
      title: "Machine Learning",
      description: "Harness the power of advanced ML algorithms to unlock insights from your data. From recommendation engines to fraud detection, our ML solutions drive efficiency and innovation across your organization.",
      features: ["Recommendation Systems", "Fraud Detection", "Pattern Recognition", "Predictive Modeling"],
      images: [
        "/tech-icons/s21.avif",
        "/tech-icons/s22.jfif",
        "/tech-icons/s23.jfif"
      ]
    },
    {
      title: "Computer Vision",
      description: "Revolutionary image and video analysis powered by state-of-the-art computer vision technology. Perfect for quality control, medical imaging, autonomous systems, and security applications.",
      features: ["Object Detection", "Facial Recognition", "Medical Imaging", "Quality Control"],
      images: [
        "/tech-icons/s33.jfif",
        "/tech-icons/s32.png",
        "/tech-icons/s31.jpg",
      ]
    },
    {
      title: "Data Analytics",
      description: "Transform raw data into actionable business intelligence. Our comprehensive analytics platform provides real-time dashboards, advanced visualizations, and predictive insights for data-driven decisions.",
      features: ["Real-time Dashboards", "Business Intelligence", "Data Visualization", "Trend Analysis"],
      images: [
        "/tech-icons/s41.jfif",
        "/tech-icons/s42.jfif",
        "/tech-icons/s43.jfif",
      ]
    },
    {
      title: "Robotic Process Automation",
      description: "Streamline operations with intelligent RPA solutions that eliminate manual tasks, reduce errors, and improve efficiency. Our bots work 24/7 to optimize your business processes.",
      features: ["Process Automation", "Workflow Optimization", "Error Reduction", "24/7 Operations"],
      images: [
        "/tech-icons/s51.jfif",
        "/tech-icons/s52.jfif",
        "/tech-icons/s53.webp",
      ]
    },
    {
      title: "Intelligent Agents",
      description: "Deploy sophisticated AI agents that can understand context, make decisions, and interact naturally with users. Perfect for customer service, virtual assistants, and autonomous task execution.",
      features: ["Conversational AI", "Virtual Assistants", "Decision Making", "Natural Interaction"],
      images: [
        "/tech-icons/s61.png",
        "/tech-icons/s63.webp",
        "/tech-icons/s62.jpg",
      ]
    }
  ];

  const testimonials = [
    {
      quote: "Panabotics transformed our manufacturing process with their AI-powered quality control system. We've seen a 40% reduction in defects and 25% increase in efficiency.",
      author: "Sarah Chen",
      position: "Operations Director",
      company: "TechManufacturing Inc."
    },
    {
      quote: "The machine learning solution they developed for our e-commerce platform increased our sales by 35% through better product recommendations and customer insights.",
      author: "Michael Rodriguez",
      position: "CTO",
      company: "RetailTech Solutions"
    },
    {
      quote: "Their computer vision system revolutionized our medical imaging department. Diagnosis accuracy improved by 20% and processing time reduced by 60%.",
      author: "Dr. Emily Watson",
      position: "Chief Medical Officer",
      company: "HealthTech Medical Center"
    }
  ];

  const caseStudies = [
    {
      title: "Smart Manufacturing",
      description: "AI-powered quality control system reducing defects by 40%",
      image: "/tech-icons/ss1.jfif",
      result: "40% defect reduction"
    },
    {
      title: "Healthcare AI",
      description: "Computer vision for medical imaging with 99.2% accuracy",
      image: "/tech-icons/ss2.jfif",
      result: "99.2% accuracy"
    },
    {
      title: "Retail Intelligence",
      description: "ML recommendation engine boosting sales by 35%",
      image: "/tech-icons/ss3.jfif",
      result: "35% sales increase"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative pt-16 sm:pt-20 md:pt-32 pb-8 sm:pb-12 md:pb-20 overflow-hidden bg-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ willChange: "transform" }}
          >
            <h3
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight"
              style={{ color: colors.primaryHex }}
            >
              AI Solutions That Transform Business
            </h3>

            <p
              className="text-sm md:text-base lg:text-lg max-w-2xl md:max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed text-gray-700"
            >
              Panabotics delivers cutting-edge artificial intelligence and machine learning solutions
              that revolutionize how businesses operate, compete, and thrive in the digital age.
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm text-white">
              {[
                "🚀 150+ Projects Delivered",
                "🎯 99% Accuracy Rate",
                "⚡ 24/7 AI Operations"
              ].map((text, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 md:px-5 md:py-2 rounded-full font-semibold shadow-md md:shadow-lg cursor-default"
                  style={{
                    backgroundColor: colors.primaryHex,
                    transition: 'background-color 0.3s ease',
                    userSelect: 'none',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = colors.secondaryHex)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = colors.primaryHex)}
                >
                  {text}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Grid */}
        <div className="py-8 sm:py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6"
              style={{ color: colors.primaryHex }}
            >
              Our Services
            </h2>
            <p className="text-base md:text-xl max-w-2xl md:max-w-3xl mx-auto text-gray-700">
              Comprehensive AI and ML solutions designed to accelerate your digital transformation
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl lg:rounded-3xl bg-white border-2 md:border-4 border-transparent shadow-md md:shadow-lg hover:shadow-xl lg:hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] md:hover:scale-[1.03] lg:hover:scale-105 overflow-hidden cursor-pointer"
                style={{ borderColor: colors.primaryHex }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ backgroundColor: colors.primaryHex }}
                ></div>

                <div className="relative z-10">
                  <div className="w-full h-40 md:h-48 lg:h-56 mb-4 md:mb-6 rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden shadow-md">
                    <Carousel className="w-full h-full">
                      <CarouselContent>
                        {service.images.map((image, imgIndex) => (
                          <CarouselItem key={imgIndex}>
                            <div className="w-full h-40 md:h-48 lg:h-56 relative">
                              <img
                                src={image}
                                alt={`${service.title} ${imgIndex + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-1 md:left-2 bg-white/90 hover:bg-white border-0 shadow-sm md:shadow-lg" />
                      <CarouselNext className="right-1 md:right-2 bg-white/90 hover:bg-white border-0 shadow-sm md:shadow-lg" />
                    </Carousel>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4" style={{ color: colors.primaryHex }}>
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed mb-4 md:mb-6 text-gray-700">
                    {service.description}
                  </p>
                  <ul className="space-y-1 md:space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs md:text-sm text-gray-600">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full mr-2 md:mr-3" style={{ backgroundColor: colors.primaryHex }}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section py-12 md:py-20 rounded-xl md:rounded-2xl lg:rounded-3xl mb-12 md:mb-20 animate-on-scroll bg-white shadow-md md:shadow-lg">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4" style={{ color: colors.primaryHex }}>
              Trusted by Industry Leaders
            </h2>
            <p className="text-sm md:text-base lg:text-xl text-gray-700">Delivering measurable results across diverse sectors</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 text-center">
            {[
              { label: 'Projects Completed', value: stats.projects },
              { label: 'Happy Clients', value: stats.clients },
              { label: 'Accuracy Rate', value: stats.accuracy + '%' },
              { label: 'System Uptime', value: stats.uptime + '%' },
            ].map(({ label, value }, idx) => (
              <div key={idx} className="group">
                <div
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2 group-hover:scale-105 transition-transform"
                  style={{ color: colors.secondaryHex }}
                >
                  {value}
                </div>
                <div className="text-xs md:text-sm lg:text-base text-gray-700">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div className="py-12 md:py-20 animate-on-scroll">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4" style={{ color: colors.primaryHex }}>
              Success Stories
            </h2>
            <p className="text-sm md:text-base lg:text-xl text-gray-700">Real-world AI implementations driving business transformation</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="group bg-white rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden shadow-md md:shadow-lg hover:shadow-xl lg:hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] md:hover:scale-[1.03] lg:hover:scale-105 cursor-pointer"
                style={{ border: `2px solid ${colors.primaryHex}` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-32 md:h-40 lg:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                  <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 text-white font-bold text-lg md:text-xl lg:text-2xl">
                    {study.result}
                  </div>
                </div>
                <div className="p-3 md:p-4 lg:p-6">
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2" style={{ color: colors.primaryHex }}>
                    {study.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-700">{study.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-6xl py-6 md:py-8 bg-gradient-to-b from-gray-50 to-white rounded-3xl shadow-inner relative overflow-hidden px-4 md:px-8">

            {/* Background Glow */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute w-28 h-28 bg-gradient-to-tr opacity-10 blur-3xl rounded-full -top-10 -left-10 animate-pulse"
                style={{
                  backgroundImage: `linear-gradient(to top right, ${colors.primaryHex}, ${colors.secondaryHex})`,
                }}
              ></div>
              <div
                className="absolute w-36 h-36 bg-gradient-to-tr opacity-10 blur-3xl rounded-full bottom-0 right-0 animate-pulse"
                style={{
                  backgroundImage: `linear-gradient(to top right, ${colors.secondaryHex}, ${colors.primaryHex})`,
                }}
              ></div>
            </div>

            {/* Heading */}
            <div className="relative text-center mb-4 md:mb-6">
              <h2
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: colors.primaryHex }}
              >
                What Our{" "}
                <span className="text-secondary" style={{ color: colors.secondaryHex }}>
                  Clients Say
                </span>
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Hear from innovators who trust Panabotics
              </p>
            </div>

            {/* Testimonial Card */}
            <div className="relative">
              <div
                className="rounded-2xl bg-white/95 backdrop-blur-md border-4 shadow-lg p-4 md:p-5 transition-all duration-500 hover:shadow-xl max-w-2xl mx-auto"
                style={{
                  borderColor: colors.primaryHex,
                }}
              >
                <div
                  className="text-3xl md:text-4xl mb-1 font-serif"
                  style={{ color: colors.primaryHex }}
                >
                  “
                </div>
                <p
                  className="text-sm md:text-base mb-3 leading-relaxed text-gray-700 italic"
                  style={{ color: colors.secondaryHex }}
                >
                  {testimonials[currentTestimonial].quote}
                </p>

                <div className="flex flex-col items-center text-center mt-2">
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md mb-2"
                    style={{ backgroundColor: colors.primaryHex }}
                  >
                    {testimonials[currentTestimonial].author.charAt(0)}
                  </div>
                  <h4
                    className="text-sm md:text-base font-semibold"
                    style={{ color: colors.secondaryHex }}
                  >
                    {testimonials[currentTestimonial].author}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {testimonials[currentTestimonial].position}
                  </p>
                  <p
                    className="text-xs font-medium mt-1"
                    style={{ color: colors.primaryHex }}
                  >
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center mt-3 space-x-1.5">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${index === currentTestimonial
                      ? "scale-125 shadow-sm"
                      : "opacity-50 hover:opacity-90"
                      }`}
                    style={{
                      backgroundColor:
                        index === currentTestimonial
                          ? colors.primaryHex
                          : "#CBD5E1",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* Process Section */}
        <div className="py-12 md:py-20 animate-on-scroll">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4" style={{ color: colors.primaryHex }}>
              Our Process
            </h2>
            <p className="text-sm md:text-base lg:text-xl text-gray-700">
              A proven methodology for delivering exceptional AI solutions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Analysis",
                description: "We dive deep into your business challenges, analyze your data landscape, and identify the most impactful AI opportunities for your organization."
              },
              {
                step: "02",
                title: "Strategy & Design",
                description: "Our AI experts design custom solutions tailored to your specific needs, creating detailed architectures and implementation roadmaps."
              },
              {
                step: "03",
                title: "Development & Training",
                description: "We build and train AI models using cutting-edge technologies, rigorous testing, and industry best practices to ensure optimal performance."
              },
              {
                step: "04",
                title: "Deployment & Optimization",
                description: "We deploy your AI solutions with continuous monitoring, performance optimization, and ongoing support to maximize ROI and ensure success."
              }
            ].map((item, index) => (
              <div key={index} className="group text-center animate-on-scroll">
                <div className="relative mb-4 md:mb-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 shadow-md md:shadow-lg" style={{ backgroundColor: colors.primaryHex }}>
                    <span className="text-white font-bold text-lg md:text-xl lg:text-2xl">{item.step}</span>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-7 md:top-8 lg:top-10 left-full w-full h-0.5" style={{ backgroundColor: 'rgba(192, 192, 192, 0.5)' }}></div>
                  )}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 lg:mb-4" style={{ color: colors.secondaryHex }}>
                  {item.title}
                </h3>
                <p style={{ color: colors.secondaryHex + 'cc', fontSize: '0.875rem' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-6 md:py-8 rounded-xl md:rounded-2xl text-center animate-on-scroll mb-10 md:mb-14 bg-white shadow-lg hover:shadow-xl transition-shadow duration-500 max-w-3xl mx-auto">
          <h2
            className="text-base md:text-lg lg:text-xl font-bold mb-2 md:mb-3"
            style={{ color: colors.primaryHex }}
          >
            Ready to Transform Your Business?
          </h2>
          <p className="text-xs md:text-sm lg:text-base mb-4 md:mb-6 max-w-md mx-auto text-gray-600 leading-relaxed"
            style={{ color: colors.secondaryHex }}
          >
            Let's discuss how <span style={{ color: colors.primaryHex }}>Panabotics</span> can help you harness the power of AI to drive innovation,
            efficiency, and growth in your organization.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="px-4 py-2 md:px-5 md:py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition-transform duration-300 hover:scale-105 hover:opacity-90 text-xs md:text-sm"
              style={{ backgroundColor: colors.primaryHex, color: 'white' }}
            >
              Start Your AI Journey
            </button>
            {/* <button
              className="px-4 py-2 md:px-5 md:py-2 rounded-lg font-medium border transition-colors duration-300 hover:bg-gray-50 text-xs md:text-sm"
              style={{ borderColor: colors.primaryHex, color: colors.primaryHex }}
            >
              Schedule a Consultation
            </button> */}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Services;
