// import { Link, useLocation } from "react-router-dom";
// import {
//   ArrowRight,
//   Brain,
//   Zap,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   CheckCircle,
//   Users,
//   TrendingUp,
//   Shield,
//   Clock,
//   Award,
//   Star,
//   Building,
//   Play,
//   Quote,
//   ExternalLink
// } from "lucide-react";
// import NeuronNetwork from "../components/NeuronNetwork";
// import { useEffect, useRef, useState } from "react";
// import colors from "../components/colors";

// const Home = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [currentProject, setCurrentProject] = useState(0);
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const location = useLocation();
//   const intervalRef = useRef<NodeJS.Timeout>();
//   const testimonialIntervalRef = useRef<NodeJS.Timeout>();
//   const projectIntervalRef = useRef<NodeJS.Timeout>();
//   const hasAnimatedRef = useRef(false);

//   // Enhanced statistics with images
//   const stats = [
//     { 
//       number: "500+", 
//       label: "AI Models Deployed", 
//       image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=center",
//       bgColor: "bg-blue-50",
//       iconColor: "text-blue-600"
//     },
//     { 
//       number: "98%", 
//       label: "Client Satisfaction", 
//       image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
//       bgColor: "bg-green-50",
//       iconColor: "text-green-600"
//     },
//     { 
//       number: "150+", 
//       label: "Projects Completed", 
//       image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
//       bgColor: "bg-purple-50",
//       iconColor: "text-purple-600"
//     },
//     { 
//       number: "24/7", 
//       label: "Support Available", 
//       image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=400&h=300&fit=crop&crop=center",
//       bgColor: "bg-orange-50",
//       iconColor: "text-orange-600"
//     }
//   ];

//   // Client testimonials with real images
//   const testimonials = [
//     {
//       name: "Sarah Johnson",
//       role: "CTO, TechCorp Inc.",
//       company: "TechCorp",
//       content: "Panabotics transformed our data processing capabilities. Their AI solutions increased our efficiency by 300% and saved us millions in operational costs.",
//       rating: 5,
//       image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
//     },
//     {
//       name: "Michael Chen",
//       role: "CEO, InnovateLab",
//       company: "InnovateLab",
//       content: "The computer vision system they built for our manufacturing line reduced defects by 95%. Absolutely game-changing technology.",
//       rating: 5,
//       image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
//     },
//     {
//       name: "Dr. Emily Rodriguez",
//       role: "Director of AI, MedTech Solutions",
//       company: "MedTech",
//       content: "Their machine learning models helped us predict patient outcomes with 99.2% accuracy. Panabotics is our trusted AI partner.",
//       rating: 5,
//       image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face"
//     }
//   ];

//   // Featured projects with real images
//   const featuredProjects = [
//     {
//       title: "Smart Manufacturing AI",
//       category: "Computer Vision",
//       description: "Reduced production defects by 95% using advanced quality control systems",
//       image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop&crop=center",
//       metrics: ["95% defect reduction", "40% cost savings", "2x faster detection"],
//       clientLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=center"
//     },
//     {
//       title: "Predictive Healthcare Platform",
//       category: "Machine Learning",
//       description: "AI-powered diagnostic system improving patient outcomes",
//       image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop&crop=center",
//       metrics: ["99.2% accuracy", "50% faster diagnosis", "Enhanced patient care"],
//       clientLogo: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=60&h=60&fit=crop&crop=center"
//     },
//     {
//       title: "Intelligent Supply Chain",
//       category: "AI Automation",
//       description: "Optimized logistics and inventory management with AI",
//       image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=250&fit=crop&crop=center",
//       metrics: ["30% cost reduction", "Real-time tracking", "Demand forecasting"],
//       clientLogo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=60&h=60&fit=crop&crop=center"
//     }
//   ];

//   // Enhanced tech stack
//   const techStack = [
//     { name: "Python", icon: "/tech-icons/python-original.svg" },
//     { name: "PyTorch", icon: "/tech-icons/pytorch-original.svg" },
//     { name: "TensorFlow", icon: "/tech-icons/tensorflow-original.svg" },
//     { name: "OpenCV", icon: "/tech-icons/OpenCV.svg" },
//     { name: "YOLO", icon: "/tech-icons/yolo.svg" },
//     { name: "Hugging Face", icon: "/tech-icons/hugging-face-logo.svg" },
//     { name: "LangChain", icon: "/tech-icons/langchain-color.svg" },
//     { name: "CrewAI", icon: "/tech-icons/crewai-color.svg" },
//     { name: "Expo", icon: "/tech-icons/expo.svg" },
//     { name: "React.js", icon: "/tech-icons/react-original.svg" },
//     { name: "Next.js", icon: "/tech-icons/Next.js.svg" },
//     { name: "Tailwind CSS", icon: "/tech-icons/tailwind.png" },
//     { name: "AWS S3", icon: "/tech-icons/amazon-s3.png" },
//     { name: "AWS Lambda", icon: "/tech-icons/aws-lambda.png" },
//     { name: "Docker", icon: "/tech-icons/docker-original.svg" },
//     { name: "FastAPI", icon: "/tech-icons/FastAPI (1).svg" }
//   ];

//   const doubledTechStack = [...techStack, ...techStack];

//   // Services data with images
//   const services = [
//     {
//       image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&h=300&fit=crop&crop=center",
//       title: "Custom AI Development",
//       description: "End-to-end AI solutions tailored to your specific business needs",
//       features: ["Neural Networks", "Deep Learning", "Natural Language Processing", "Predictive Analytics"]
//     },
//     {
//       image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop&crop=center",
//       title: "Computer Vision",
//       description: "Advanced image and video analysis for automation and insights",
//       features: ["Object Detection", "Image Classification", "Quality Control", "Surveillance Systems"]
//     },
//     {
//       image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop&crop=center",
//       title: "Process Automation",
//       description: "Intelligent automation to streamline your business operations",
//       features: ["Workflow Optimization", "Robotic Process Automation", "Smart Decision Making", "Cost Reduction"]
//     }
//   ];

//   // Why choose us points with images
//   const whyChooseUs = [
//     {
//       icon: Award,
//       image: "https://images.unsplash.com/photo-1553028826-f4804a6dfd3f?w=400&h=300&fit=crop&crop=center",
//       title: "Industry Expertise",
//       description: "5+ years of experience delivering cutting-edge AI solutions across various industries"
//     },
//     {
//       icon: Users,
//       image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop&crop=center",
//       title: "Expert Team",
//       description: "PhDs and ML engineers with proven track records in AI research and implementation"
//     },
//     {
//       icon: Shield,
//       image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
//       title: "Proven Results",
//       description: "98% client satisfaction rate with measurable ROI improvements for every project"
//     },
//     {
//       icon: Clock,
//       image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop&crop=center",
//       title: "Fast Delivery",
//       description: "Agile development process ensuring quick time-to-market without compromising quality"
//     }
//   ];

//   // Process steps with enhanced visuals
//   const processSteps = [
//     { 
//       step: "01", 
//       title: "Discovery", 
//       description: "We analyze your business needs and identify AI opportunities",
//       image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&crop=center",
//       color: "from-blue-400 to-blue-600"
//     },
//     { 
//       step: "02", 
//       title: "Strategy", 
//       description: "Create a comprehensive AI roadmap tailored to your goals",
//       image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop&crop=center",
//       color: "from-green-400 to-green-600"
//     },
//     { 
//       step: "03", 
//       title: "Development", 
//       description: "Build and train custom AI models using best practices",
//       image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=300&h=200&fit=crop&crop=center",
//       color: "from-purple-400 to-purple-600"
//     },
//     { 
//       step: "04", 
//       title: "Deployment", 
//       description: "Launch, monitor, and continuously optimize your AI solution",
//       image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&h=200&fit=crop&crop=center",
//       color: "from-orange-400 to-orange-600"
//     }
//   ];

//   // Auto-slide functions
//   const nextSlide = () => {
//     setCurrentSlide((prev) => {
//       if (prev >= doubledTechStack.length - techStack.length) {
//         setTimeout(() => {
//           setCurrentSlide(0);
//           if (sliderRef.current) {
//             sliderRef.current.style.transition = 'none';
//             sliderRef.current.style.transform = `translateX(0)`;
//             void sliderRef.current.offsetWidth;
//             sliderRef.current.style.transition = 'transform 0.5s ease';
//           }
//         }, 50);
//         return prev + 1;
//       }
//       return prev + 1;
//     });
//   };

//   const nextTestimonial = () => {
//     setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//   };

//   const nextProject = () => {
//     setCurrentProject((prev) => (prev + 1) % featuredProjects.length);
//   };

//   const startAutoSliders = () => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     if (testimonialIntervalRef.current) clearInterval(testimonialIntervalRef.current);
//     if (projectIntervalRef.current) clearInterval(projectIntervalRef.current);

//     intervalRef.current = setInterval(nextSlide, 2000);
//     testimonialIntervalRef.current = setInterval(nextTestimonial, 5000);
//     projectIntervalRef.current = setInterval(nextProject, 4000);
//   };

//   const resetAnimations = () => {
//     document.querySelectorAll(".animate-on-scroll").forEach((el) => {
//       const element = el as HTMLElement;
//       element.classList.remove("animate-slide-up", "animate-scale-in", "animate-fade-in");
//       element.style.opacity = "0";
//       element.style.transform = "translateY(30px)";
//     });
//   };

//   // Scroll to top whenever the location changes
//   useEffect(() => {
//     window.scrollTo(0, 0);
//     setCurrentSlide(0);
//     setCurrentTestimonial(0);
//     setCurrentProject(0);
//     hasAnimatedRef.current = false;
//     resetAnimations();
//     startAutoSliders();
//   }, [location]);

//   useEffect(() => {
//     // Enhanced styles
//     const style = document.createElement("style");
//     style.textContent = `
//       /* Enhanced Keyframes */
//       @keyframes spin { from {transform: rotate(0deg);} to {transform: rotate(360deg);} }
//       @keyframes pulse { 0% {opacity: 0.7; transform: scale(0.95);} 100% {opacity: 0.9; transform: scale(1.05);} }
//       @keyframes float { 0%, 100% {transform: translateY(0);} 50% {transform: translateY(-10px);} }
//       @keyframes fadeSlideUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
//       @keyframes scaleIn { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
//       @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
//       @keyframes slideInLeft { 0% { opacity: 0; transform: translateX(-30px); } 100% { opacity: 1; transform: translateX(0); } }
//       @keyframes slideInRight { 0% { opacity: 0; transform: translateX(30px); } 100% { opacity: 1; transform: translateX(0); } }
//       @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.3); } 50% { transform: scale(1.05); } 100% { opacity: 1; transform: scale(1); } }
//       @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(${colors.primaryRgb}, 0.3); } 50% { box-shadow: 0 0 40px rgba(${colors.primaryRgb}, 0.6); } }
//       @keyframes drawLine { 0% { width: 0; } 100% { width: 100%; } }

//       /* Animation Classes */
//       .animate-pulse-glow { animation: pulse 2s infinite alternate; }
//       .animate-bounce-gentle { animation: float 2s infinite; }
//       .animate-slide-up { animation: fadeSlideUp 0.8s ease forwards; }
//       .animate-scale-in { animation: scaleIn 0.6s ease forwards; }
//       .animate-fade-in { animation: fadeIn 0.8s ease forwards; }
//       .animate-slide-left { animation: slideInLeft 0.8s ease forwards; }
//       .animate-slide-right { animation: slideInRight 0.8s ease forwards; }
//       .animate-bounce-in { animation: bounceIn 0.8s ease forwards; }
//       .animate-glow { animation: glow 2s infinite; }

//       .hover-scale { transition: transform 0.3s ease, box-shadow 0.3s ease; }
//       .hover-scale:hover { transform: scale(1.05); }

//       .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
//       .hover-lift:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }

//       /* Enhanced AI Brain */
//       .ai-brain-container { position: relative; width: 400px; height: 400px; display: flex; justify-content: center; align-items: center; }
//       .ai-brain {
//         width: 100%; height: 100%;
//         background: rgba(${colors.primaryRgb}, 0.1);
//         border-radius: 50%;
//         display: flex; justify-content: center; align-items: center;
//         position: relative;
//         box-shadow: 0 0 60px rgba(${colors.primaryRgb}, 0.4), 0 0 120px rgba(${colors.primaryRgb}, 0.2);
//         z-index: 2;
//       }
//       .ai-text {
//         font-size: 6rem; font-weight: bold; color: ${colors.secondaryHex};
//         text-shadow: 0 0 15px rgba(${colors.primaryRgb}, 0.7);
//         transform: rotate(-15deg);
//         animation: spin 15s linear infinite;
//         transform-origin: center;
//       }
//       .ai-brain-glow {
//         position: absolute; width: 120%; height: 120%; border-radius: 50%;
//         background: radial-gradient(circle, rgba(${colors.primaryRgb}, 0.6) 0%, transparent 70%);
//         filter: blur(30px);
//         animation: pulse 4s ease-in-out infinite alternate;
//         z-index: 1;
//       }

//       /* Enhanced Tech Slider */
//       .tech-slider-container { position: relative; overflow: hidden; margin: 0 auto; max-width: 1200px; }
//       .tech-slider-track { display: flex; transition: transform 0.5s ease; will-change: transform; }
//       .tech-slide { flex: 0 0 25%; padding: 0 10px; box-sizing: border-box; }
//       .tech-slide-content {
//         background: white; border-radius: 12px; padding: 20px;
//         display: flex; flex-direction: column; align-items: center; justify-content: center;
//         box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
//         transition: all 0.3s ease;
//         border: 1px solid rgba(${colors.primaryRgb}, 0.1);
//         height: 180px; cursor: pointer;
//       }
//       .tech-slide-content:hover {
//         transform: translateY(-5px);
//         box-shadow: 0 15px 30px rgba(${colors.primaryRgb}, 0.15);
//         border-color: rgba(${colors.primaryRgb}, 0.3);
//       }
//       .tech-icon { width: 60px; height: 60px; object-fit: contain; margin-bottom: 15px; }
//       .tech-name { font-weight: 600; color: ${colors.secondaryHex}; text-align: center; }

//       /* Slider Navigation */
//       .slider-nav {
//         position: absolute;
//         top: 50%;
//         transform: translateY(-50%);
//         width: 100%;
//         display: flex;
//         justify-content: space-between;
//         pointer-events: none;
//         z-index: 10;
//       }
//       .slider-btn {
//         pointer-events: auto;
//         width: 48px;
//         height: 48px;
//         border-radius: 50%;
//         background: white;
//         border: 2px solid #e2e8f0;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         cursor: pointer;
//         transition: all 0.3s ease;
//         box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//       }
//       .slider-btn:hover {
//         border-color: ${colors.primaryHex};
//         background: ${colors.primaryHex};
//         color: white;
//       }

//       /* Project Cards */
//       .project-card {
//         background: white; border-radius: 20px; overflow: hidden;
//         box-shadow: 0 10px 30px rgba(0,0,0,0.1);
//         transition: all 0.3s ease;
//       }
//       .project-card:hover {
//         transform: translateY(-10px);
//         box-shadow: 0 20px 50px rgba(${colors.primaryRgb}, 0.2);
//       }

//       /* Testimonial Cards */
//       .testimonial-card {
//         background: white; border-radius: 20px; padding: 30px;
//         box-shadow: 0 10px 30px rgba(0,0,0,0.1);
//         border: 1px solid rgba(${colors.primaryRgb}, 0.1);
//         transition: all 0.3s ease;
//       }
//       .testimonial-card:hover {
//         transform: translateY(-5px);
//         box-shadow: 0 20px 40px rgba(${colors.primaryRgb}, 0.15);
//       }

//       /* Stats Animation */
//       .stat-card {
//         background: white; border-radius: 16px; padding: 20px;
//         text-align: center; border: 1px solid rgba(${colors.primaryRgb}, 0.1);
//         transition: all 0.3s ease; overflow: hidden; position: relative;
//       }
//       .stat-card:hover {
//         transform: translateY(-5px);
//         box-shadow: 0 15px 30px rgba(${colors.primaryRgb}, 0.2);
//         border-color: rgba(${colors.primaryRgb}, 0.3);
//       }

//       /* Process Timeline */
//       .process-line {
//         position: relative;
//       }
//       .process-line::after {
//         content: '';
//         position: absolute;
//         top: 50%;
//         left: 100%;
//         width: 100%;
//         height: 2px;
//         background: linear-gradient(90deg, rgba(${colors.primaryRgb}, 0.8), rgba(${colors.primaryRgb}, 0.2));
//         animation: drawLine 2s ease-in-out forwards;
//         transform: translateY(-50%);
//       }

//       /* Responsive Design */
//       @media (max-width: 1024px) {
//         .ai-brain-container { width: 320px; height: 320px; }
//         .ai-text { font-size: 5rem; }
//         .tech-slide { flex: 0 0 33.33%; }
//         .process-line::after { display: none; }
//       }
//       @media (max-width: 768px) {
//         .ai-brain-container { width: 280px; height: 280px; }
//         .ai-text { font-size: 4rem; }
//         .tech-slide { flex: 0 0 50%; }
//       }
//       @media (max-width: 480px) {
//         .ai-brain-container { width: 200px; height: 200px; }
//         .ai-text { font-size: 3rem; }
//         .tech-slide { flex: 0 0 100%; }
//       }

//       /* Gradient Overlays */
//       .gradient-overlay {
//         background: linear-gradient(135deg, rgba(${colors.primaryRgb}, 0.9), rgba(${colors.secondaryRgb}, 0.9));
//       }

//       .glass-effect {
//         background: rgba(255, 255, 255, 0.1);
//         backdrop-filter: blur(10px);
//         border: 1px solid rgba(255, 255, 255, 0.2);
//       }
//     `;
//     document.head.appendChild(style);

//     startAutoSliders();

//     // Enhanced IntersectionObserver
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const animationType = entry.target.getAttribute('data-animation');
//             switch (animationType) {
//               case 'slide-up':
//                 entry.target.classList.add("animate-slide-up");
//                 break;
//               case 'scale':
//                 entry.target.classList.add("animate-scale-in");
//                 break;
//               case 'fade-in':
//                 entry.target.classList.add("animate-fade-in");
//                 break;
//               case 'slide-left':
//                 entry.target.classList.add("animate-slide-left");
//                 break;
//               case 'slide-right':
//                 entry.target.classList.add("animate-slide-right");
//                 break;
//               case 'bounce-in':
//                 entry.target.classList.add("animate-bounce-in");
//                 break;
//               default:
//                 entry.target.classList.add("animate-slide-up");
//             }
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
//     );

//     document.querySelectorAll(".animate-on-scroll").forEach((el) => {
//       const element = el as HTMLElement;
//       element.style.opacity = "0";
//       element.style.transform = "translateY(30px)";
//       observer.observe(element);
//     });

//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//       if (testimonialIntervalRef.current) clearInterval(testimonialIntervalRef.current);
//       if (projectIntervalRef.current) clearInterval(projectIntervalRef.current);
//       document.head.removeChild(style);
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-white selection:bg-primary selection:text-white">
//       {/* Enhanced Hero Section - Navy Blue Gradient */}
//       <section
//         className="relative min-h-screen flex flex-col sm:flex-row items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-sky-700"
//       >
//         <NeuronNetwork />
//         <div className="relative z-10 max-w-7xl w-full mx-auto">
//           <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
//             <div className="animate-on-scroll mb-12 lg:mb-0" data-animation="slide-up">
//               <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect text-white mb-6">
//                 <Award className="w-4 h-4 mr-2" />
//                 <span className="text-sm font-medium">Award-Winning AI Solutions</span>
//               </div>

//               <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-primary leading-tight">
//                 <span className="text-sky-400">
//                   AI Solutions
//                 </span>
//                 <br />
//                 <span>for Tomorrow</span>
//               </h1>

//               <p className="text-lg sm:text-xl mb-8 leading-relaxed text-white max-w-xl">
//                 Transform your business with cutting-edge artificial intelligence, machine learning,
//                 and automation solutions. We create intelligent systems that evolve with your needs.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 mb-8">
//                 <Link
//                   to="/services"
//                   className="inline-flex items-center px-8 py-4 bg-sky-500 text-white font-semibold rounded-full hover-scale animate-pulse-glow shadow-md hover:bg-sky-400 transition-colors"
//                 >
//                   Explore Services
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </Link>

//                 <button className="inline-flex items-center px-8 py-4 font-semibold rounded-full border transition-colors duration-300 bg-primary text-primary-foreground hover:opacity-90">
//                   <Play className="mr-2 h-5 w-5" />
//                   Watch Demo
//                 </button>
//               </div>

//               <div className="flex items-center space-x-8 text-white">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-sky-400">500+</div>
//                   <div className="text-sm">Projects</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-sky-400">98%</div>
//                   <div className="text-sm">Satisfaction</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-sky-400">24/7</div>
//                   <div className="text-sm">Support</div>
//                 </div>
//               </div>
//             </div>

//             <div className="animate-on-scroll" data-animation="scale">
//               <div className="relative flex items-center justify-center mx-auto" style={{ maxWidth: "400px" }}>
//                 <div className="ai-brain-container">
//                   <div className="ai-brain-glow"></div>
//                   <div className="ai-brain">
//                     <div className="ai-text">AI</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Statistics Section - White Background */}
//       <section className="py-20 bg-white relative">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="stat-card animate-on-scroll group border-2 border-cyan-300" data-animation="bounce-in">
//                 <div className="w-14 h-14 rounded-md overflow-hidden border border-cyan-300 mb-3">
//                   <img 
//                     src={stat.image} 
//                     alt={stat.label}
//                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                   />
//                   
//                 </div>
//                 <div className="text-3xl font-bold mb-1 text-primary">
//                   {stat.number}
//                 </div>
//                 <div className="text-sm font-medium text-[#2c3d4f]">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Services Section - Teal Background */}
//       <section className="py-20 bg-gradient-to-br from-teal-50 to-emerald-100 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-on-scroll" data-animation="slide-up">
//             <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
//               <span>Our AI Services</span>
//             </h2>
//             <p className="text-lg max-w-3xl mx-auto text-[#2c3d4f]">
//               Comprehensive AI solutions designed to transform your business operations and drive innovation
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {services.map((service, index) => (
//               <div key={index} className="group bg-white rounded-2xl overflow-hidden hover-lift animate-on-scroll shadow-xl" data-animation="slide-up">
//                 <div className="relative h-48 overflow-hidden">
//                   <img 
//                     src={service.image} 
//                     alt={service.title}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
//                   <div className="absolute bottom-4 left-4">
//                     <h3 className="text-2xl font-bold text-white mb-2">
//                       {service.title}
//                     </h3>
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   <p className="text-gray-600 mb-6 leading-relaxed">
//                     {service.description}
//                   </p>

//                   <ul className="space-y-3 mb-6">
//                     {service.features.map((feature, idx) => (
//                       <li key={idx} className="flex items-center text-sm">
//                         <CheckCircle className="h-4 w-4 mr-3 flex-shrink-0 text-cyan-500" />
//                         <span>{feature}</span>
//                       </li>
//                     ))}
//                   </ul>

//                   <Link to="/services" className="inline-flex items-center font-medium hover:underline text-primary group-hover:text-primary transition-colors">
//                     Learn More <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Projects Section - Dark Gray Background */}
//       <section className="py-20 bg-slate-800 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-on-scroll" data-animation="slide-up">
//             <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
//               <span className="text-sky-400">Success Stories</span>
//             </h2>
//             <p className="text-lg max-w-3xl mx-auto text-gray-300">
//               Real results from our AI implementations across various industries
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {featuredProjects.map((project, index) => (
//               <div key={index} className="bg-slate-700 rounded-2xl overflow-hidden hover-lift animate-on-scroll shadow-2xl group" data-animation="slide-up">
//                 <div className="relative h-48 overflow-hidden">
//                   <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
//                   <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white bg-primary">
//                     {project.category}
//                   </div>
//                   <div className="absolute top-4 right-4">
//                     <img src={project.clientLogo} alt="Client" className="w-10 h-10 rounded-full border-2 border-white" />
//                   </div>
//                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
//                 </div>

//                 <div className="p-6">
//                   <h3 className="text-xl font-bold mb-3 text-white">
//                     {project.title}
//                   </h3>

//                   <p className="text-gray-300 mb-4">{project.description}</p>

//                   <div className="space-y-2 mb-4">
//                     {project.metrics.map((metric, idx) => (
//                       <div key={idx} className="flex items-center text-sm text-gray-300">
//                         <TrendingUp className="h-4 w-4 mr-2 text-sky-400" />
//                         <span>{metric}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <button className="flex items-center text-sm font-medium hover:underline text-sky-400 hover:text-sky-300 transition-colors group">
//                     View Case Study <ExternalLink className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Client Testimonials Section - White Background */}
//       <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-on-scroll" data-animation="slide-up">
//             <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
//               <span className="text-blue-600">What Our Clients Say</span>
//             </h2>
//             <p className="text-lg max-w-3xl mx-auto text-[#2c3d4f]">
//               Don't just take our word for it - hear from the companies we've helped transform
//             </p>
//           </div>

//           <div className="relative max-w-4xl mx-auto">
//             <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-xl animate-on-scroll border border-blue-100" data-animation="fade-in">
//               <div className="flex items-start mb-8">
//                 <div className="relative">
//                   <img
//                     src={testimonials[currentTestimonial].image}
//                     alt={testimonials[currentTestimonial].name}
//                     className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
//                   />
//                   <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                     <Quote className="h-4 w-4 text-white" />
//                   </div>
//                 </div>
//                 <div className="ml-6 flex-1">
//                   <h4 className="font-bold text-xl text-[#2c3d4f] mb-1">
//                     {testimonials[currentTestimonial].name}
//                   </h4>
//                   <p className="text-[#2c3d4f] mb-1">{testimonials[currentTestimonial].role}</p>
//                   <p className="text-blue-600 font-semibold text-sm">
//                     {testimonials[currentTestimonial].company}
//                   </p>
//                 </div>
//                 <div className="flex space-x-1">
//                   {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
//                     <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
//                   ))}
//                 </div>
//               </div>

//               <blockquote className="text-lg mb-8 leading-relaxed text-[#2c3d4f] italic">
//                 "{testimonials[currentTestimonial].content}"
//               </blockquote>

//               <div className="flex items-center justify-between">
//                 <div className="text-sm text-slate-500">
//                   Testimonial {currentTestimonial + 1} of {testimonials.length}
//                 </div>
//                 <div className="flex space-x-2">
//                   {testimonials.map((_, index) => (
//                     <button
//                       key={index}
//                       className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                         index === currentTestimonial 
//                           ? 'bg-blue-500 scale-125' 
//                           : 'bg-gray-300 hover:bg-gray-400'
//                       }`}
//                       onClick={() => setCurrentTestimonial(index)}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us Section - Teal Background */}
//       <section className="py-20 bg-gradient-to-br from-teal-500 to-emerald-600 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-on-scroll" data-animation="slide-up">
//             <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
//               Why Choose <span className="text-teal-200">Panabotics?</span>
//             </h2>
//             <p className="text-lg max-w-3xl mx-auto text-teal-100">
//               We combine cutting-edge technology with deep industry expertise to deliver exceptional results
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {whyChooseUs.map((item, index) => (
//               <div key={index} className="group animate-on-scroll" data-animation="slide-up">
//                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover-lift transition-all duration-300 border border-white/20">
//                   <div className="relative mb-6 mx-auto w-24 h-24 rounded-xl overflow-hidden">
//                     <img 
//                       src={item.image} 
//                       alt={item.title}
//                       className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 to-transparent"></div>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <item.icon className="h-8 w-8 text-white drop-shadow-lg" />
//                     </div>
//                   </div>

//                   <h3 className="text-xl font-bold mb-4 text-white">
//                     {item.title}
//                   </h3>

//                   <p className="text-teal-100 leading-relaxed">
//                     {item.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Our Process Section - Dark Background with Storytelling */}
//       <section className="py-20 bg-slate-900 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
//           <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
//         </div>

//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="text-center mb-20 animate-on-scroll" data-animation="slide-up">
//             <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
//               Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">AI Journey</span>
//             </h2>
//             <p className="text-lg max-w-3xl mx-auto text-gray-300">
//               From concept to deployment, we follow a proven methodology to ensure success
//             </p>
//           </div>

//           <div className="relative">
//             {/* Timeline Line */}
//             <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform -translate-y-1/2 rounded-full opacity-30"></div>

//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
//               {processSteps.map((item, index) => (
//                 <div key={index} className="relative animate-on-scroll group" data-animation="slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
//                   {/* Timeline Node */}
//                   <div className="hidden lg:block absolute top-1/2 left-1/2 w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 z-20">
//                     <div className={`w-full h-full rounded-full bg-gradient-to-r ${item.color} shadow-lg border-4 border-slate-900 group-hover:scale-125 transition-transform duration-300`}></div>
//                   </div>

//                   <div className="bg-slate-800 rounded-2xl overflow-hidden hover-lift shadow-2xl border border-slate-700 group-hover:border-slate-600 transition-all duration-300">
//                     {/* Step Image */}
//                     <div className="relative h-40 overflow-hidden">
//                       <img 
//                         src={item.image} 
//                         alt={item.title}
//                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                       />
//                       <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-80`}></div>
//                       <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
//                         <span className="text-white font-bold text-lg">{item.step}</span>
//                       </div>
//                     </div>

//                     {/* Content */}
//                     <div className="p-6">
//                       <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
//                         {item.title}
//                       </h3>
//                       <p className="text-gray-300 leading-relaxed">
//                         {item.description}
//                       </p>

//                       {/* Progress Indicator */}
//                       <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
//                         <div 
//                           className={`h-full bg-gradient-to-r ${item.color} transition-all duration-1000 ease-out`}
//                           style={{ width: '100%' }}
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Tech Stack Section - White Background */}
//       <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-on-scroll" data-animation="fade-in">
//             <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-blue-600">
//               Powered by Leading Technologies
//             </h2>
//             <p className="text-lg max-w-3xl mx-auto text-[#2c3d4f]">
//               We leverage the most advanced tools and frameworks to build scalable, robust AI solutions
//             </p>
//           </div>

//           <div className="tech-slider-container animate-on-scroll" data-animation="scale">
//             <div
//               className="tech-slider-track"
//               style={{ transform: `translateX(-${currentSlide * 25}%)` }}
//               ref={sliderRef}
//             >
//               {doubledTechStack.map((tech, index) => (
//                 <div key={`${tech.name}-${index}`} className="tech-slide">
//                   <div className="tech-slide-content" tabIndex={0} aria-label={tech.name}>
//                     <img src={tech.icon} alt={tech.name} className="tech-icon" />
//                     <span className="tech-name">{tech.name}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="slider-nav pointer-events-auto hidden">
//               <button
//                 className="slider-btn hover-scale"
//                 onClick={() => {
//                   setCurrentSlide(prev => prev > 0 ? prev - 1 : techStack.length - 1);
//                   if (intervalRef.current) {
//                     clearInterval(intervalRef.current);
//                     intervalRef.current = setInterval(nextSlide, 2000);
//                   }
//                 }}
//                 aria-label="Previous technology"
//               >
//                 <ChevronLeft className="h-5 w-5 text-slate-600" />
//               </button>
//               <button
//                 className="slider-btn hover-scale"
//                 onClick={() => {
//                   nextSlide();
//                   if (intervalRef.current) {
//                     clearInterval(intervalRef.current);
//                     intervalRef.current = setInterval(nextSlide, 2000);
//                   }
//                 }}
//                 aria-label="Next technology"
//               >
//                 <ChevronRight className="h-5 w-5 text-slate-600" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced CTA Section - Blue Gradient */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
//         <div className="max-w-7xl mx-auto">
//           <div className="rounded-3xl text-white text-center max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 py-16 animate-on-scroll relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20"
//             data-animation="scale-in">

//             {/* Background Pattern */}
//             <div className="absolute inset-0 opacity-10">
//               <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
//               <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-20 translate-y-20"></div>
//             </div>

//             <div className="relative z-10">
//               <h2 className="text-3xl sm:text-4xl font-bold mb-6">
//                 Ready to Transform Your Business with AI?
//               </h2>

//               <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
//                 Join hundreds of companies already using our AI solutions to drive growth,
//                 reduce costs, and unlock new possibilities.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
//                 <Link
//                   to="/contact"
//                   className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover-scale shadow-lg transition-all duration-300 hover:bg-blue-50"
//                 >
//                   Start Your AI Journey
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </Link>

//                 <Link
//                   to="/portfolio"
//                   className="inline-flex items-center px-8 py-4 border-2 border-white font-semibold rounded-full hover:bg-white/10 hover-scale transition-all duration-300 text-white"
//                 >
//                   View Our Work
//                 </Link>
//               </div>

//               <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-blue-100">
//                 <div className="flex items-center">
//                   <CheckCircle className="h-4 w-4 mr-2" />
//                   <span>Free Consultation</span>
//                 </div>
//                 <div className="flex items-center">
//                   <CheckCircle className="h-4 w-4 mr-2" />
//                   <span>Custom Solutions</span>
//                 </div>
//                 <div className="flex items-center">
//                   <CheckCircle className="h-4 w-4 mr-2" />
//                   <span>Expert Support</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div >
//   );
// };

// export default Home;






















// import { Link, useLocation } from "react-router-dom";
// import {
//   ArrowRight,
//   Brain,
//   Zap,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   CheckCircle,
//   Users,
//   TrendingUp,
//   Shield,
//   Clock,
//   Award,
//   Star,
//   Building,
//   Play,
//   Quote,
//   ExternalLink
// } from "lucide-react";
// import NeuronNetwork from "../components/NeuronNetwork";
// import { useEffect, useRef, useState } from "react";
// import colors from "../components/colors";

// const Home = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [currentProject, setCurrentProject] = useState(0);
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const location = useLocation();
//   const intervalRef = useRef<NodeJS.Timeout>();
//   const testimonialIntervalRef = useRef<NodeJS.Timeout>();
//   const projectIntervalRef = useRef<NodeJS.Timeout>();
//   const hasAnimatedRef = useRef(false);

//   // Enhanced statistics with images
//   const stats = [
//     { 
//       number: "500+", 
//       label: "AI Models Deployed", 
//       image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=center",
//       bgColor: "bg-sky-50",
//       iconColor: "text-sky-600"
//     },
//     { 
//       number: "98%", 
//       label: "Client Satisfaction", 
//       image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
//       bgColor: "bg-teal-50",
//       iconColor: "text-primary"
//     },
//     { 
//       number: "150+", 
//       label: "Projects Completed", 
//       image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
//       bgColor: "bg-slate-50",
//       iconColor: "text-slate-600"
//     },
//     { 
//       number: "24/7", 
//       label: "Support Available", 
//       image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=400&h=300&fit=crop&crop=center",
//       bgColor: "bg-gray-50",
//       iconColor: "text-gray-600"
//     }
//   ];

//   // Client testimonials with real images
//   const testimonials = [
//     {
//       name: "Sarah Johnson",
//       role: "CTO, TechCorp Inc.",
//       company: "TechCorp",
//       content: "Panabotics transformed our data processing capabilities. Their AI solutions increased our efficiency by 300% and saved us millions in operational costs.",
//       rating: 5,
//       image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
//     },
//     {
//       name: "Michael Chen",
//       role: "CEO, InnovateLab",
//       company: "InnovateLab",
//       content: "The computer vision system they built for our manufacturing line reduced defects by 95%. Absolutely game-changing technology.",
//       rating: 5,
//       image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
//     },
//     {
//       name: "Dr. Emily Rodriguez",
//       role: "Director of AI, MedTech Solutions",
//       company: "MedTech",
//       content: "Their machine learning models helped us predict patient outcomes with 99.2% accuracy. Panabotics is our trusted AI partner.",
//       rating: 5,
//       image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face"
//     }
//   ];

//   // Featured projects with real images
//   const featuredProjects = [
//     {
//       title: "Smart Manufacturing AI",
//       category: "Computer Vision",
//       description: "Reduced production defects by 95% using advanced quality control systems",
//       image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop&crop=center",
//       metrics: ["95% defect reduction", "40% cost savings", "2x faster detection"],
//       clientLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=center"
//     },
//     {
//       title: "Predictive Healthcare Platform",
//       category: "Machine Learning",
//       description: "AI-powered diagnostic system improving patient outcomes",
//       image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop&crop=center",
//       metrics: ["99.2% accuracy", "50% faster diagnosis", "Enhanced patient care"],
//       clientLogo: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=60&h=60&fit=crop&crop=center"
//     },
//     {
//       title: "Intelligent Supply Chain",
//       category: "AI Automation",
//       description: "Optimized logistics and inventory management with AI",
//       image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=250&fit=crop&crop=center",
//       metrics: ["30% cost reduction", "Real-time tracking", "Demand forecasting"],
//       clientLogo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=60&h=60&fit=crop&crop=center"
//     }
//   ];

//   // Enhanced tech stack
//   const techStack = [
//     { name: "Python", icon: "/tech-icons/python-original.svg" },
//     { name: "PyTorch", icon: "/tech-icons/pytorch-original.svg" },
//     { name: "TensorFlow", icon: "/tech-icons/tensorflow-original.svg" },
//     { name: "OpenCV", icon: "/tech-icons/OpenCV.svg" },
//     { name: "YOLO", icon: "/tech-icons/yolo.svg" },
//     { name: "Hugging Face", icon: "/tech-icons/hugging-face-logo.svg" },
//     { name: "LangChain", icon: "/tech-icons/langchain-color.svg" },
//     { name: "CrewAI", icon: "/tech-icons/crewai-color.svg" },
//     { name: "Expo", icon: "/tech-icons/expo.svg" },
//     { name: "React.js", icon: "/tech-icons/react-original.svg" },
//     { name: "Next.js", icon: "/tech-icons/Next.js.svg" },
//     { name: "Tailwind CSS", icon: "/tech-icons/tailwind.png" },
//     { name: "AWS S3", icon: "/tech-icons/amazon-s3.png" },
//     { name: "AWS Lambda", icon: "/tech-icons/aws-lambda.png" },
//     { name: "Docker", icon: "/tech-icons/docker-original.svg" },
//     { name: "FastAPI", icon: "/tech-icons/FastAPI (1).svg" }
//   ];

//   const doubledTechStack = [...techStack, ...techStack];

//   // Services data with images
//   const services = [
//     {
//       image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&h=300&fit=crop&crop=center",
//       title: "Custom AI Development",
//       description: "End-to-end AI solutions tailored to your specific business needs",
//       features: ["Neural Networks", "Deep Learning", "Natural Language Processing", "Predictive Analytics"]
//     },
//     {
//       image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop&crop=center",
//       title: "Computer Vision",
//       description: "Advanced image and video analysis for automation and insights",
//       features: ["Object Detection", "Image Classification", "Quality Control", "Surveillance Systems"]
//     },
//     {
//       image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop&crop=center",
//       title: "Process Automation",
//       description: "Intelligent automation to streamline your business operations",
//       features: ["Workflow Optimization", "Robotic Process Automation", "Smart Decision Making", "Cost Reduction"]
//     }
//   ];

//   // Why choose us points with images
//   const whyChooseUs = [
//     {
//       icon: Award,
//       image: "https://images.unsplash.com/photo-1553028826-f4804a6dfd3f?w=400&h=300&fit=crop&crop=center",
//       title: "Industry Expertise",
//       description: "5+ years of experience delivering cutting-edge AI solutions across various industries"
//     },
//     {
//       icon: Users,
//       image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop&crop=center",
//       title: "Expert Team",
//       description: "PhDs and ML engineers with proven track records in AI research and implementation"
//     },
//     {
//       icon: Shield,
//       image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
//       title: "Proven Results",
//       description: "98% client satisfaction rate with measurable ROI improvements for every project"
//     },
//     {
//       icon: Clock,
//       image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop&crop=center",
//       title: "Fast Delivery",
//       description: "Agile development process ensuring quick time-to-market without compromising quality"
//     }
//   ];

//   // Process steps with enhanced visuals and icons
//   const processSteps = [
//     { 
//       step: "01", 
//       title: "Discovery", 
//       description: "We analyze your business needs and identify AI opportunities",
//       image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&crop=center",
//       color: "from-sky-400 to-sky-600",
//       icon: "🔍"
//     },
//     { 
//       step: "02", 
//       title: "Strategy", 
//       description: "Create a comprehensive AI roadmap tailored to your goals",
//       image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop&crop=center",
//       color: "from-teal-400 to-teal-600",
//       icon: "📋"
//     },
//     { 
//       step: "03", 
//       title: "Development", 
//       description: "Build and train custom AI models using best practices",
//       image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=300&h=200&fit=crop&crop=center",
//       color: "from-slate-400 to-slate-600",
//       icon: "⚙️"
//     },
//     { 
//       step: "04", 
//       title: "Deployment", 
//       description: "Launch, monitor, and continuously optimize your AI solution",
//       image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&h=200&fit=crop&crop=center",
//       color: "from-gray-400 to-gray-600",
//       icon: "🚀"
//     }
//   ];

//   // Auto-slide functions
//   const nextSlide = () => {
//     setCurrentSlide((prev) => {
//       if (prev >= doubledTechStack.length - techStack.length) {
//         setTimeout(() => {
//           setCurrentSlide(0);
//           if (sliderRef.current) {
//             sliderRef.current.style.transition = 'none';
//             sliderRef.current.style.transform = `translateX(0)`;
//             void sliderRef.current.offsetWidth;
//             sliderRef.current.style.transition = 'transform 0.5s ease';
//           }
//         }, 50);
//         return prev + 1;
//       }
//       return prev + 1;
//     });
//   };

//   const nextTestimonial = () => {
//     setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//   };

//   const nextProject = () => {
//     setCurrentProject((prev) => (prev + 1) % featuredProjects.length);
//   };

//   const startAutoSliders = () => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     if (testimonialIntervalRef.current) clearInterval(testimonialIntervalRef.current);
//     if (projectIntervalRef.current) clearInterval(projectIntervalRef.current);

//     intervalRef.current = setInterval(nextSlide, 2000);
//     testimonialIntervalRef.current = setInterval(nextTestimonial, 5000);
//     projectIntervalRef.current = setInterval(nextProject, 4000);
//   };

//   const resetAnimations = () => {
//     document.querySelectorAll(".animate-on-scroll").forEach((el) => {
//       const element = el as HTMLElement;
//       element.classList.remove("animate-slide-up", "animate-scale-in", "animate-fade-in");
//       element.style.opacity = "0";
//       element.style.transform = "translateY(30px)";
//     });
//   };

//   // Scroll to top whenever the location changes
//   useEffect(() => {
//     window.scrollTo(0, 0);
//     setCurrentSlide(0);
//     setCurrentTestimonial(0);
//     setCurrentProject(0);
//     hasAnimatedRef.current = false;
//     resetAnimations();
//     startAutoSliders();
//   }, [location]);

//   useEffect(() => {
//     // Enhanced styles
//     const style = document.createElement("style");
//     style.textContent = `
//       /* Enhanced Keyframes */
//       @keyframes spin { from {transform: rotate(0deg);} to {transform: rotate(360deg);} }
//       @keyframes pulse { 0% {opacity: 0.7; transform: scale(0.95);} 100% {opacity: 0.9; transform: scale(1.05);} }
//       @keyframes float { 0%, 100% {transform: translateY(0);} 50% {transform: translateY(-10px);} }
//       @keyframes fadeSlideUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
//       @keyframes scaleIn { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
//       @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
//       @keyframes slideInLeft { 0% { opacity: 0; transform: translateX(-30px); } 100% { opacity: 1; transform: translateX(0); } }
//       @keyframes slideInRight { 0% { opacity: 0; transform: translateX(30px); } 100% { opacity: 1; transform: translateX(0); } }
//       @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.3); } 50% { transform: scale(1.05); } 100% { opacity: 1; transform: scale(1); } }
//       @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(56, 189, 248, 0.3); } 50% { box-shadow: 0 0 40px rgba(56, 189, 248, 0.6); } }
//       @keyframes drawLine { 0% { width: 0; } 100% { width: 100%; } }

//       /* Animation Classes */
//       .animate-pulse-glow { animation: pulse 2s infinite alternate; }
//       .animate-bounce-gentle { animation: float 2s infinite; }
//       .animate-slide-up { animation: fadeSlideUp 0.8s ease forwards; }
//       .animate-scale-in { animation: scaleIn 0.6s ease forwards; }
//       .animate-fade-in { animation: fadeIn 0.8s ease forwards; }
//       .animate-slide-left { animation: slideInLeft 0.8s ease forwards; }
//       .animate-slide-right { animation: slideInRight 0.8s ease forwards; }
//       .animate-bounce-in { animation: bounceIn 0.8s ease forwards; }
//       .animate-glow { animation: glow 2s infinite; }

//       .hover-scale { transition: transform 0.3s ease, box-shadow 0.3s ease; }
//       .hover-scale:hover { transform: scale(1.05); }

//       .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
//       .hover-lift:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }

//       /* Enhanced AI Brain */
//       .ai-brain-container { position: relative; width: 400px; height: 400px; display: flex; justify-content: center; align-items: center; }
//       .ai-brain {
//         width: 100%; height: 100%;
//         background: rgba(56, 189, 248, 0.1);
//         border-radius: 50%;
//         display: flex; justify-content: center; align-items: center;
//         position: relative;
//         box-shadow: 0 0 60px rgba(56, 189, 248, 0.4), 0 0 120px rgba(56, 189, 248, 0.2);
//         z-index: 2;
//       }
//       .ai-text {
//         font-size: 6rem; font-weight: bold; color: #67e8f9;
//         text-shadow: 0 0 15px rgba(56, 189, 248, 0.7);
//         transform: rotate(-15deg);
//         animation: spin 15s linear infinite;
//         transform-origin: center;
//       }
//       .ai-brain-glow {
//         position: absolute; width: 120%; height: 120%; border-radius: 50%;
//         background: radial-gradient(circle, rgba(56, 189, 248, 0.6) 0%, transparent 70%);
//         filter: blur(30px);
//         animation: pulse 4s ease-in-out infinite alternate;
//         z-index: 1;
//       }

//       /* Enhanced Tech Slider */
//       .tech-slider-container { position: relative; overflow: hidden; margin: 0 auto; max-width: 1200px; }
//       .tech-slider-track { display: flex; transition: transform 0.5s ease; will-change: transform; }
//       .tech-slide { flex: 0 0 25%; padding: 0 10px; box-sizing: border-box; }
//       .tech-slide-content {
//         background: white; border-radius: 12px; padding: 20px;
//         display: flex; flex-direction: column; align-items: center; justify-content: center;
//         box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
//         transition: all 0.3s ease;
//         border: 1px solid rgba(56, 189, 248, 0.1);
//         height: 180px; cursor: pointer;
//       }
//       .tech-slide-content:hover {
//         transform: translateY(-5px);
//         box-shadow: 0 15px 30px rgba(56, 189, 248, 0.15);
//         border-color: rgba(56, 189, 248, 0.3);
//       }
//       .tech-icon { width: 60px; height: 60px; object-fit: contain; margin-bottom: 15px; }
//       .tech-name { font-weight: 600; color: #1e293b; text-align: center; }

//       /* Slider Navigation */
//       .slider-nav {
//         position: absolute;
//         top: 50%;
//         transform: translateY(-50%);
//         width: 100%;
//         display: flex;
//         justify-content: space-between;
//         pointer-events: none;
//         z-index: 10;
//       }
//       .slider-btn {
//         pointer-events: auto;
//         width: 48px;
//         height: 48px;
//         border-radius: 50%;
//         background: white;
//         border: 2px solid #e2e8f0;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         cursor: pointer;
//         transition: all 0.3s ease;
//         box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//       }
//       .slider-btn:hover {
//         border-color: #0ea5e9;
//         background: #0ea5e9;
//         color: white;
//       }

//       /* Project Cards */
//       .project-card {
//         background: white; border-radius: 20px; overflow: hidden;
//         box-shadow: 0 10px 30px rgba(0,0,0,0.1);
//         transition: all 0.3s ease;
//       }
//       .project-card:hover {
//         transform: translateY(-10px);
//         box-shadow: 0 20px 50px rgba(56, 189, 248, 0.2);
//       }

//       /* Testimonial Cards */
//       .testimonial-card {
//         background: white; border-radius: 20px; padding: 30px;
//         box-shadow: 0 10px 30px rgba(0,0,0,0.1);
//         border: 1px solid rgba(56, 189, 248, 0.1);
//         transition: all 0.3s ease;
//       }
//       .testimonial-card:hover {
//         transform: translateY(-5px);
//         box-shadow: 0 20px 40px rgba(56, 189, 248, 0.15);
//       }

//       /* Stats Animation */
//       .stat-card {
//         background: white; border-radius: 16px; padding: 20px;
//         text-align: center; border: 1px solid rgba(56, 189, 248, 0.1);
//         transition: all 0.3s ease; overflow: hidden; position: relative;
//       }
//       .stat-card:hover {
//         transform: translateY(-5px);
//         box-shadow: 0 15px 30px rgba(56, 189, 248, 0.2);
//         border-color: rgba(56, 189, 248, 0.3);
//       }

//       /* Responsive Design */
//       @media (max-width: 1024px) {
//         .ai-brain-container { width: 320px; height: 320px; }
//         .ai-text { font-size: 5rem; }
//         .tech-slide { flex: 0 0 33.33%; }
//       }
//       @media (max-width: 768px) {
//         .ai-brain-container { width: 280px; height: 280px; }
//         .ai-text { font-size: 4rem; }
//         .tech-slide { flex: 0 0 50%; }
//       }
//       @media (max-width: 480px) {
//         .ai-brain-container { width: 200px; height: 200px; }
//         .ai-text { font-size: 3rem; }
//         .tech-slide { flex: 0 0 100%; }
//       }

//       /* Glass effect */
//       .glass-effect {
//         background: rgba(255, 255, 255, 0.1);
//         backdrop-filter: blur(10px);
//         border: 1px solid rgba(255, 255, 255, 0.2);
//       }
//     `;
//     document.head.appendChild(style);

//     startAutoSliders();

//     // Enhanced IntersectionObserver
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const animationType = entry.target.getAttribute('data-animation');
//             switch (animationType) {
//               case 'slide-up':
//                 entry.target.classList.add("animate-slide-up");
//                 break;
//               case 'scale':
//                 entry.target.classList.add("animate-scale-in");
//                 break;
//               case 'fade-in':
//                 entry.target.classList.add("animate-fade-in");
//                 break;
//               case 'slide-left':
//                 entry.target.classList.add("animate-slide-left");
//                 break;
//               case 'slide-right':
//                 entry.target.classList.add("animate-slide-right");
//                 break;
//               case 'bounce-in':
//                 entry.target.classList.add("animate-bounce-in");
//                 break;
//               default:
//                 entry.target.classList.add("animate-slide-up");
//             }
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
//     );

//     document.querySelectorAll(".animate-on-scroll").forEach((el) => {
//       const element = el as HTMLElement;
//       element.style.opacity = "0";
//       element.style.transform = "translateY(30px)";
//       observer.observe(element);
//     });

//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//       if (testimonialIntervalRef.current) clearInterval(testimonialIntervalRef.current);
//       if (projectIntervalRef.current) clearInterval(projectIntervalRef.current);
//       document.head.removeChild(style);
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-white selection:bg-sky-200 selection:text-sky-900">
//       {/* Enhanced Hero Section - Light Sky Blue Gradient */}
//       <section className="relative min-h-screen flex flex-col sm:flex-row items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 bg-black">
//         <NeuronNetwork />
//         <div className="relative z-10 max-w-7xl w-full mx-auto">
//           <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
//             <div className="animate-on-scroll mb-12 lg:mb-0" data-animation="slide-up">
//               <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect text-white mb-6">
//                 <Award className="w-4 h-4 mr-2" />
//                 <span className="text-sm font-medium">Award-Winning AI Solutions</span>
//               </div>

//               <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-primary leading-tight">
//                 <span>
//                   AI Solutions
//                 </span>
//                 <br />
//                 <span>for Tomorrow</span>
//               </h1>

//               <p className="text-lg sm:text-xl mb-8 leading-relaxed text-white max-w-xl">
//                 Transform your business with cutting-edge artificial intelligence, machine learning,
//                 and automation solutions. We create intelligent systems that evolve with your needs.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 mb-8">
//                 <Link
//                   to="/services"
//                   className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover-scale animate-pulse-glow shadow-md hover:opacity-90 transition-colors"
//                 >
//                   Explore Services
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </Link>

//                 <button className="inline-flex items-center px-8 py-4 font-semibold rounded-full border transition-colors duration-300 bg-primary text-primary-foreground hover:opacity-90">
//                   <Play className="mr-2 h-5 w-5" />
//                   Watch Demo
//                 </button>
//               </div>

//               <div className="flex items-center space-x-8 text-white">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-primary">500+</div>
//                   <div className="text-sm">Projects</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-primary">98%</div>
//                   <div className="text-sm">Satisfaction</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-primary">24/7</div>
//                   <div className="text-sm">Support</div>
//                 </div>
//               </div>
//             </div>

//             <div className="animate-on-scroll" data-animation="scale">
//               <div className="relative flex items-center justify-center mx-auto" style={{ maxWidth: "400px" }}>
//                 <div className="ai-brain-container">
//                   <div className="ai-brain-glow"></div>
//                   <div className="ai-brain">
//                     <div className="ai-text">AI</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Statistics Section - White Background */}
//       <section className="py-20 bg-white relative">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="stat-card animate-on-scroll group border-2 border-cyan-300" data-animation="bounce-in">
//                 <div className="w-14 h-14 rounded-md overflow-hidden border border-cyan-300 mb-3">
//                   <img 
//                     src={stat.image} 
//                     alt={stat.label}
//                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                   />
//                   
//                 </div>
//                 <div className="text-3xl font-bold mb-1 text-primary">
//                   {stat.number}
//                 </div>
//                 <div className="text-sm font-medium text-[#2c3d4f]">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Services Section - Light Teal Background */}
//       <section className="py-20 bg-gradient-to-br from-teal-50 to-sky-50 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-on-scroll" data-animation="slide-up">
//             <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
//               <span>Our AI Services</span>
//             </h2>
//             <p className="text-lg max-w-3xl mx-auto text-[#2c3d4f]">
//               Comprehensive AI solutions designed to transform your business operations and drive innovation
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {services.map((service, index) => (
//               <div key={index} className="group bg-white rounded-2xl overflow-hidden hover-lift animate-on-scroll shadow-xl" data-animation="slide-up">
//                 <div className="relative h-48 overflow-hidden">
//                   <img 
//                     src={service.image} 
//                     alt={service.title}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
//                   <div className="absolute bottom-4 left-4">
//                     <h3 className="text-2xl font-bold text-white mb-2">
//                       {service.title}
//                     </h3>
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   <p className="text-gray-600 mb-6 leading-relaxed">
//                     {service.description}
//                   </p>

//                   <ul className="space-y-3 mb-6">
//                     {service.features.map((feature, idx) => (
//                       <li key={idx} className="flex items-center text-sm">
//                         <CheckCircle className="h-4 w-4 mr-3 flex-shrink-0 text-cyan-500" />
//                         <span>{feature}</span>
//                       </li>
//                     ))}
//                   </ul>

//                   <Link to="/services" className="inline-flex items-center font-medium hover:underline text-primary group-hover:text-primary transition-colors">
//                     Learn More <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Projects Section - Light Gray Background */}
//       <section className="py-20 bg-gray-100 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-on-scroll" data-animation="slide-up">
//             <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
//               <span>Success Stories</span>
//             </h2>
//             <p className="text-lg max-w-3xl mx-auto text-[#2c3d4f]">
//               Real results from our AI implementations across various industries
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {featuredProjects.map((project, index) => (
//               <div key={index} className="bg-white rounded-2xl overflow-hidden hover-lift animate-on-scroll shadow-xl group" data-animation="slide-up">
//                 <div className="relative h-48 overflow-hidden">
//                   <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
//                   <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white bg-primary">
//                     {project.category}
//                   </div>
//                   <div className="absolute top-4 right-4">
//                     <img src={project.clientLogo} alt="Client" className="w-10 h-10 rounded-full border-2 border-white" />
//                   </div>
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//                 </div>

//                 <div className="p-6">
//                   <h3 className="text-xl font-bold mb-3 text-[#2c3d4f]">
//                     {project.title}
//                   </h3>

//                   <p className="text-gray-600 mb-4">{project.description}</p>

//                   <div className="space-y-2 mb-4">
//                     {project.metrics.map((metric, idx) => (
//                       <div key={idx} className="flex items-center text-sm text-gray-600">
//                         <TrendingUp className="h-4 w-4 mr-2 text-primary" />
//                         <span>{metric}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <button className="flex items-center text-sm font-medium hover:underline text-primary hover:text-primary transition-colors group">
//                     View Case Study <ExternalLink className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Client Testimonials Section - White Background */}
//       <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-on-scroll" data-animation="slide-up">
//             <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
//               <span>What Our Clients Say</span>
//             </h2>
//             <p className="text-lg max-w-3xl mx-auto text-[#2c3d4f]">
//               Don't just take our word for it - hear from the companies we've helped transform
//             </p>
//           </div>

//           <div className="relative max-w-4xl mx-auto">
//             <div className="bg-gray-100 rounded-3xl p-8 shadow-md animate-on-scroll border border-gray-200" data-animation="fade-in">
//               <div className="flex items-start mb-8">
//                 <div className="relative">
//                   <img
//                     src={testimonials[currentTestimonial].image}
//                     alt={testimonials[currentTestimonial].name}
//                     className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
//                   />
//                   <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
//                     <Quote className="h-4 w-4 text-white" />
//                   </div>
//                 </div>
//                 <div className="ml-6 flex-1">
//                   <h4 className="font-bold text-xl text-[#2c3d4f] mb-1">
//                     {testimonials[currentTestimonial].name}
//                   </h4>
//                   <p className="text-[#2c3d4f] mb-1">{testimonials[currentTestimonial].role}</p>
//                   <p className="text-primary font-semibold text-sm">
//                     {testimonials[currentTestimonial].company}
//                   </p>
//                 </div>
//                 <div className="flex space-x-1">
//                   {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
//                     <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
//                   ))}
//                 </div>
//               </div>

//               <blockquote className="text-lg mb-8 leading-relaxed text-[#2c3d4f] italic">
//                 "{testimonials[currentTestimonial].content}"
//               </blockquote>

//               <div className="flex items-center justify-between">
//                 <div className="text-sm text-slate-500">
//                   Testimonial {currentTestimonial + 1} of {testimonials.length}
//                 </div>
//                 <div className="flex space-x-2">
//                   {testimonials.map((_, index) => (
//                     <button
//                       key={index}
//                       className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                         index === currentTestimonial 
//                           ? 'bg-teal-500 scale-125' 
//                           : 'bg-gray-300 hover:bg-gray-400'
//                       }`}
//                       onClick={() => setCurrentTestimonial(index)}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us Section - Light Teal Background */}
//       <section className="py-20 bg-gradient-to-br from-teal-100 to-sky-100 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-on-scroll" data-animation="slide-up">
//             <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
//               Why Choose <span>Panabotics?</span>
//             </h2>
//             <p className="text-lg max-w-3xl mx-auto text-[#2c3d4f]">
//               We combine cutting-edge technology with deep industry expertise to deliver exceptional results
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {whyChooseUs.map((item, index) => (
//               <div key={index} className="group animate-on-scroll" data-animation="slide-up">
//                 <div className="bg-white rounded-2xl p-6 text-center hover-lift transition-all duration-300 shadow-xl border-2 border-cyan-300">
//                   <div className="relative mb-6 mx-auto w-24 h-24 rounded-xl overflow-hidden">
//                     <img 
//                       src={item.image} 
//                       alt={item.title}
//                       className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-teal-600/60 to-transparent"></div>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <item.icon className="h-8 w-8 text-white drop-shadow-lg" />
//                     </div>
//                   </div>

//                   <h3 className="text-xl font-bold mb-4 text-[#2c3d4f]">
//                     {item.title}
//                   </h3>

//                   <p className="text-[#2c3d4f] leading-relaxed">
//                     {item.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Our Process Section */}
//       <section className="py-20 bg-slate-900" id="process">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-white mb-4">Our Process</h2>
//             <p className="text-lg text-gray-300">
//               A step-by-step approach to delivering high-quality AI solutions tailored to your business.
//             </p>
//           </div>

//           <div className="space-y-16">
//             {processSteps.map((step, index) => (
//               <div
//                 key={index}
//                 className={`lg:grid lg:grid-cols-2 lg:gap-12 items-center ${
//                   index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
//                 }`}
//               >
//                 {/* Text Content */}
//                 <div className={`mb-8 lg:mb-0 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
//                   <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300 shadow-xl hover:shadow-2xl">
//                     <div className="flex items-start space-x-4">
//                       {/* Step Number */}
//                       <div className="text-6xl font-bold text-slate-600 leading-none">
//                         {step.step}
//                       </div>

//                       <div className="flex-1">
//                         {/* Icon */}
//                         <div className="text-4xl mb-3">
//                           {step.icon}
//                         </div>

//                         {/* Title */}
//                         <h3 className="text-2xl font-bold text-white mb-3">
//                           {step.title}
//                         </h3>

//                         {/* Description */}
//                         <p className="text-gray-300 leading-relaxed text-lg">
//                           {step.description}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Image */}
//                 <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
//                   <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
//                     <img
//                       src={step.image}
//                       alt={step.title}
//                       className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
//                     <div className="absolute bottom-6 left-6">
//                       <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-xl text-white shadow-lg`}>
//                         {step.icon}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Tech Stack Section - White Background */}
//       <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 animate-on-scroll" data-animation="fade-in">
//             <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-sky-600">
//               Powered by Leading Technologies
//             </h2>
//             <p className="text-lg max-w-3xl mx-auto text-[#2c3d4f]">
//               We leverage the most advanced tools and frameworks to build scalable, robust AI solutions
//             </p>
//           </div>

//           <div className="tech-slider-container animate-on-scroll" data-animation="scale">
//             <div
//               className="tech-slider-track"
//               style={{ transform: `translateX(-${currentSlide * 25}%)` }}
//               ref={sliderRef}
//             >
//               {doubledTechStack.map((tech, index) => (
//                 <div key={`${tech.name}-${index}`} className="tech-slide">
//                   <div className="tech-slide-content" tabIndex={0} aria-label={tech.name}>
//                     <img src={tech.icon} alt={tech.name} className="tech-icon" />
//                     <span className="tech-name">{tech.name}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="slider-nav pointer-events-auto hidden">
//               <button
//                 className="slider-btn hover-scale"
//                 onClick={() => {
//                   setCurrentSlide(prev => prev > 0 ? prev - 1 : techStack.length - 1);
//                   if (intervalRef.current) {
//                     clearInterval(intervalRef.current);
//                     intervalRef.current = setInterval(nextSlide, 2000);
//                   }
//                 }}
//                 aria-label="Previous technology"
//               >
//                 <ChevronLeft className="h-5 w-5 text-slate-600" />
//               </button>
//               <button
//                 className="slider-btn hover-scale"
//                 onClick={() => {
//                   nextSlide();
//                   if (intervalRef.current) {
//                     clearInterval(intervalRef.current);
//                     intervalRef.current = setInterval(nextSlide, 2000);
//                   }
//                 }}
//                 aria-label="Next technology"
//               >
//                 <ChevronRight className="h-5 w-5 text-slate-600" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced CTA Section - Light Sky Blue Gradient */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-200 to-teal-200">
//         <div className="max-w-7xl mx-auto">
//           <div className="rounded-3xl text-slate-800 text-center max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 py-16 animate-on-scroll relative overflow-hidden bg-white/70 backdrop-blur-sm border border-white/50 shadow-xl"
//             data-animation="scale-in">

//             {/* Background Pattern */}
//             <div className="absolute inset-0 opacity-10">
//               <div className="absolute top-0 left-0 w-40 h-40 bg-sky-300 rounded-full -translate-x-20 -translate-y-20"></div>
//               <div className="absolute bottom-0 right-0 w-60 h-60 bg-teal-300 rounded-full translate-x-20 translate-y-20"></div>
//             </div>

//             <div className="relative z-10">
//               <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
//                 Ready to Transform Your Business with AI?
//               </h2>

//               <p className="text-xl mb-8 max-w-2xl mx-auto text-[#2c3d4f]">
//                 Join hundreds of companies already using our AI solutions to drive growth,
//                 reduce costs, and unlock new possibilities.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
//                 <Link
//                   to="/contact"
//                   className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover-scale shadow-lg transition-all duration-300 hover:bg-cyan-600"
//                 >
//                   Start Your AI Journey
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </Link>

//                 <Link
//                   to="/portfolio"
//                   className="inline-flex items-center px-8 py-4 border border-gray-400 font-semibold rounded-full hover:bg-white hover-scale transition-all duration-300 text-slate-700"
//                 >
//                   View Our Work
//                 </Link>
//               </div>

//               <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
//                 <div className="flex items-center">
//                   <CheckCircle className="h-4 w-4 mr-2 text-cyan-500" />
//                   <span>Free Consultation</span>
//                 </div>
//                 <div className="flex items-center">
//                   <CheckCircle className="h-4 w-4 mr-2 text-cyan-500" />
//                   <span>Custom Solutions</span>
//                 </div>
//                 <div className="flex items-center">
//                   <CheckCircle className="h-4 w-4 mr-2 text-cyan-500" />
//                   <span>Expert Support</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;






import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Zap,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Users,
  TrendingUp,
  Shield,
  Clock,
  Award,
  Star,
  Building,
  Play,
  Quote,
  ExternalLink
} from "lucide-react";
import NeuronNetwork from "../components/NeuronNetwork";
import { useEffect, useRef, useState } from "react";
import colors from "../components/colors";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentProject, setCurrentProject] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const intervalRef = useRef<NodeJS.Timeout>();
  const testimonialIntervalRef = useRef<NodeJS.Timeout>();
  const projectIntervalRef = useRef<NodeJS.Timeout>();
  const hasAnimatedRef = useRef(false);

  // Enhanced statistics with images
  const stats = [
    {
      number: "500+",
      label: "AI Models Deployed",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=center",
      bgColor: "bg-sky-50",
      iconColor: "text-sky-600"
    },
    {
      number: "98%",
      label: "Client Satisfaction",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
      bgColor: "bg-teal-50",
      iconColor: "text-primary"
    },
    {
      number: "150+",
      label: "Projects Completed",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
      bgColor: "bg-slate-50",
      iconColor: "text-slate-600"
    },
    {
      number: "24/7",
      label: "Support Available",
      image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=400&h=300&fit=crop&crop=center",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-600"
    }
  ];

  // Client testimonials with real images
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechCorp Inc.",
      company: "TechCorp",
      content: "Panabotics transformed our data processing capabilities. Their AI solutions increased our efficiency by 300% and saved us millions in operational costs.",
      rating: 5,
      image: "https://cdn.builder.io/api/v1/image/assets%2F176f979fd2a249d498538cbe54d6ce39%2F26acda69210c415fb2bd9087c0f41ee3?format=webp&width=200"
    },
    {
      name: "Michael Chen",
      role: "CEO, InnovateLab",
      company: "InnovateLab",
      content: "The computer vision system they built for our manufacturing line reduced defects by 95%. Absolutely game-changing technology.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&q=80"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Director of AI, MedTech Solutions",
      company: "MedTech",
      content: "Their machine learning models helped us predict patient outcomes with 99.2% accuracy. Panabotics is our trusted AI partner.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face&q=80"
    }
  ];

  // Featured projects with real images
  const featuredProjects = [
    {
      title: "Smart Manufacturing AI",
      category: "Computer Vision",
      description: "Reduced production defects by 95% using advanced quality control systems",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop&crop=center",
      metrics: ["95% defect reduction", "40% cost savings", "2x faster detection"],
      clientLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=center"
    },
    {
      title: "Predictive Healthcare Platform",
      category: "Machine Learning",
      description: "AI-powered diagnostic system improving patient outcomes",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop&crop=center",
      metrics: ["99.2% accuracy", "50% faster diagnosis", "Enhanced patient care"],
      clientLogo: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=60&h=60&fit=crop&crop=center"
    },
    {
      title: "Intelligent Supply Chain",
      category: "AI Automation",
      description: "Optimized logistics and inventory management with AI",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=250&fit=crop&crop=center",
      metrics: ["30% cost reduction", "Real-time tracking", "Demand forecasting"],
      clientLogo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=60&h=60&fit=crop&crop=center"
    }
  ];

  // Enhanced tech stack
  const techStack = [
    { name: "Python", icon: "/tech-icons/python-original.svg" },
    { name: "PyTorch", icon: "/tech-icons/pytorch-original.svg" },
    { name: "TensorFlow", icon: "/tech-icons/tensorflow-original.svg" },
    { name: "OpenCV", icon: "/tech-icons/OpenCV.svg" },
    { name: "YOLO", icon: "/tech-icons/yolo.svg" },
    { name: "Hugging Face", icon: "/tech-icons/hugging-face-logo.svg" },
    { name: "LangChain", icon: "/tech-icons/langchain-color.svg" },
    { name: "CrewAI", icon: "/tech-icons/crewai-color.svg" },
    { name: "Expo", icon: "/tech-icons/expo.svg" },
    { name: "React.js", icon: "/tech-icons/react-original.svg" },
    { name: "Next.js", icon: "/tech-icons/Next.js.svg" },
    { name: "Tailwind CSS", icon: "/tech-icons/tailwind.png" },
    { name: "AWS S3", icon: "/tech-icons/amazon-s3.png" },
    { name: "AWS Lambda", icon: "/tech-icons/aws-lambda.png" },
    { name: "Docker", icon: "/tech-icons/docker-original.svg" },
    { name: "FastAPI", icon: "/tech-icons/FastAPI (1).svg" }
  ];

  const doubledTechStack = [...techStack, ...techStack];

  // Services data with images
  const services = [
    {
      image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&h=300&fit=crop&crop=center",
      title: "Custom AI Development",
      description: "End-to-end AI solutions tailored to your specific business needs",
      features: ["Neural Networks", "Deep Learning", "Natural Language Processing", "Predictive Analytics"]
    },
    {
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop&crop=center",
      title: "Computer Vision",
      description: "Advanced image and video analysis for automation and insights",
      features: ["Object Detection", "Image Classification", "Quality Control", "Surveillance Systems"]
    },
    {
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop&crop=center",
      title: "Process Automation",
      description: "Intelligent automation to streamline your business operations",
      features: ["Workflow Optimization", "Robotic Process Automation", "Smart Decision Making", "Cost Reduction"]
    }
  ];

  // Why choose us points with images
  const whyChooseUs = [
    {
      icon: Award,
      image: "https://cdn.builder.io/api/v1/image/assets%2F176f979fd2a249d498538cbe54d6ce39%2F462c808a6af44823ac1c1b5be0b70430?format=webp&width=800",
      title: "Industry Expertise",
      description: "5+ years of experience delivering cutting-edge AI solutions across various industries"
    },
    {
      icon: Users,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&crop=center&q=80",
      title: "Expert Team",
      description: "PhDs and ML engineers with proven track records in AI research and implementation"
    },
    {
      icon: Shield,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center&q=80",
      title: "Proven Results",
      description: "98% client satisfaction rate with measurable ROI improvements for every project"
    },
    {
      icon: Clock,
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop&crop=center&q=80",
      title: "Fast Delivery",
      description: "Agile development process ensuring quick time-to-market without compromising quality"
    }
  ];

  // Process steps with enhanced visuals and icons
  const processSteps = [
    {
      step: "01",
      title: "Discovery",
      description: "We analyze your business needs and identify AI opportunities",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center&q=80",
      color: "from-sky-400 to-sky-600",
      icon: "🔍"
    },
    {
      step: "02",
      title: "Strategy",
      description: "Create a comprehensive AI roadmap tailored to your goals",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&crop=center&q=80",
      color: "from-teal-400 to-teal-600",
      icon: "📋"
    },
    {
      step: "03",
      title: "Development",
      description: "Build and train custom AI models using best practices",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&h=400&fit=crop&crop=center&q=80",
      color: "from-slate-400 to-slate-600",
      icon: "⚙���"
    },
    {
      step: "04",
      title: "Deployment",
      description: "Launch, monitor, and continuously optimize your AI solution",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop&crop=center&q=80",
      color: "from-gray-400 to-gray-600",
      icon: "🚀"
    }
  ];

  // Auto-slide functions
  const nextSlide = () => {
    setCurrentSlide((prev) => {
      if (prev >= doubledTechStack.length - techStack.length) {
        setTimeout(() => {
          setCurrentSlide(0);
          if (sliderRef.current) {
            sliderRef.current.style.transition = 'none';
            sliderRef.current.style.transform = `translateX(0)`;
            void sliderRef.current.offsetWidth;
            sliderRef.current.style.transition = 'transform 0.5s ease';
          }
        }, 50);
        return prev + 1;
      }
      return prev + 1;
    });
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % featuredProjects.length);
  };

  const startAutoSliders = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (testimonialIntervalRef.current) clearInterval(testimonialIntervalRef.current);
    if (projectIntervalRef.current) clearInterval(projectIntervalRef.current);

    intervalRef.current = setInterval(nextSlide, 2000);
    testimonialIntervalRef.current = setInterval(nextTestimonial, 5000);
    projectIntervalRef.current = setInterval(nextProject, 4000);
  };

  const resetAnimations = () => {
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      const element = el as HTMLElement;
      element.classList.remove("animate-slide-up", "animate-scale-in", "animate-fade-in");
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
    });
  };

  // Scroll to top whenever the location changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentSlide(0);
    setCurrentTestimonial(0);
    setCurrentProject(0);
    hasAnimatedRef.current = false;
    resetAnimations();
    startAutoSliders();
  }, [location]);

  useEffect(() => {
    // Enhanced styles
    const style = document.createElement("style");
    style.textContent = `
      /* Enhanced Keyframes */
      @keyframes spin { from {transform: rotate(0deg);} to {transform: rotate(360deg);} }
      @keyframes pulse { 0% {opacity: 0.7; transform: scale(0.95);} 100% {opacity: 0.9; transform: scale(1.05);} }
      @keyframes float { 0%, 100% {transform: translateY(0);} 50% {transform: translateY(-10px);} }
      @keyframes fadeSlideUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
      @keyframes scaleIn { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
      @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
      @keyframes slideInLeft { 0% { opacity: 0; transform: translateX(-30px); } 100% { opacity: 1; transform: translateX(0); } }
      @keyframes slideInRight { 0% { opacity: 0; transform: translateX(30px); } 100% { opacity: 1; transform: translateX(0); } }
      @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.3); } 50% { transform: scale(1.05); } 100% { opacity: 1; transform: scale(1); } }
      @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(56, 189, 248, 0.3); } 50% { box-shadow: 0 0 40px rgba(56, 189, 248, 0.6); } }
      @keyframes drawLine { 0% { width: 0; } 100% { width: 100%; } }

      /* Animation Classes */
      .animate-pulse-glow { animation: pulse 2s infinite alternate; }
      .animate-bounce-gentle { animation: float 2s infinite; }
      .animate-slide-up { animation: fadeSlideUp 0.8s ease forwards; }
      .animate-scale-in { animation: scaleIn 0.6s ease forwards; }
      .animate-fade-in { animation: fadeIn 0.8s ease forwards; }
      .animate-slide-left { animation: slideInLeft 0.8s ease forwards; }
      .animate-slide-right { animation: slideInRight 0.8s ease forwards; }
      .animate-bounce-in { animation: bounceIn 0.8s ease forwards; }
      .animate-glow { animation: glow 2s infinite; }

      .hover-scale { transition: transform 0.3s ease, box-shadow 0.3s ease; }
      .hover-scale:hover { transform: scale(1.05); }

      .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
      .hover-lift:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }

      /* Enhanced AI Brain */
      .ai-brain-container { position: relative; width: 340px; height: 340px; display: flex; justify-content: center; align-items: center; }
      .ai-brain {
        width: 100%; height: 100%;
        background: hsl(var(--primary) / 0.12);
        border-radius: 50%;
        display: flex; justify-content: center; align-items: center;
        position: relative;
        box-shadow: 0 0 60px hsl(var(--primary) / 0.45), 0 0 120px hsl(var(--primary) / 0.25);
        z-index: 2;
      }
      .ai-text {
        font-size: 5.2rem; font-weight: bold; color: hsl(var(--primary));
        text-shadow: 0 0 15px hsl(var(--primary) / 0.9);
        transform: rotate(-15deg);
        animation: spin 15s linear infinite;
        transform-origin: center;
      }
      .ai-brain-glow {
        position: absolute; width: 120%; height: 120%; border-radius: 50%;
        background: radial-gradient(circle, hsl(var(--primary) / 0.65) 0%, transparent 70%);
        filter: blur(30px);
        animation: pulse 4s ease-in-out infinite alternate;
        z-index: 1;
      }

      /* Enhanced Tech Slider */
      .tech-slider-container { position: relative; overflow: hidden; margin: 0 auto; max-width: 1200px; }
      .tech-slider-track { display: flex; transition: transform 0.5s ease; will-change: transform; }
      .tech-slide { flex: 0 0 25%; padding: 0 10px; box-sizing: border-box; }
      .tech-slide-content {
        background: white; border-radius: 12px; padding: 20px;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
        border: 1px solid rgba(56, 189, 248, 0.1);
        height: 180px; cursor: pointer;
      }
      .tech-slide-content:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(56, 189, 248, 0.15);
        border-color: rgba(56, 189, 248, 0.3);
      }
      .tech-icon { width: 60px; height: 60px; object-fit: contain; margin-bottom: 15px; }
      .tech-name { font-weight: 600; color: #1e293b; text-align: center; }

      /* Slider Navigation */
      .slider-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        display: flex;
        justify-content: space-between;
        pointer-events: none;
        z-index: 10;
      }
      .slider-btn {
        pointer-events: auto;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: white;
        border: 2px solid #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      .slider-btn:hover {
        border-color: #0ea5e9;
        background: #0ea5e9;
        color: white;
      }

      /* Project Cards */
      .project-card {
        background: white; border-radius: 20px; overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
      }
      .project-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 50px rgba(56, 189, 248, 0.2);
      }

      /* Testimonial Cards */
      .testimonial-card {
        background: white; border-radius: 20px; padding: 30px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        border: 1px solid rgba(56, 189, 248, 0.1);
        transition: all 0.3s ease;
      }
      .testimonial-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(56, 189, 248, 0.15);
      }

      /* Stats Animation */
      .stat-card {
        background: white; border-radius: 16px; padding: 20px;
        text-align: center; border: 1px solid rgba(56, 189, 248, 0.1);
        transition: all 0.3s ease; overflow: hidden; position: relative;
      }
      .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(56, 189, 248, 0.2);
        border-color: rgba(56, 189, 248, 0.3);
      }

      /* Responsive Design */
      @media (max-width: 1024px) {
        .ai-brain-container { width: 280px; height: 280px; }
        .ai-text { font-size: 4.6rem; }
        .tech-slide { flex: 0 0 33.33%; }
      }
      @media (max-width: 768px) {
        .ai-brain-container { width: 240px; height: 240px; }
        .ai-text { font-size: 3.6rem; }
        .tech-slide { flex: 0 0 50%; }
      }
      @media (max-width: 480px) {
        .ai-brain-container { width: 180px; height: 180px; }
        .ai-text { font-size: 2.6rem; }
        .tech-slide { flex: 0 0 100%; }
      }

      /* Glass effect */
      .glass-effect {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    `;
    document.head.appendChild(style);

    startAutoSliders();

    // Enhanced IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animationType = entry.target.getAttribute('data-animation');
            switch (animationType) {
              case 'slide-up':
                entry.target.classList.add("animate-slide-up");
                break;
              case 'scale':
                entry.target.classList.add("animate-scale-in");
                break;
              case 'fade-in':
                entry.target.classList.add("animate-fade-in");
                break;
              case 'slide-left':
                entry.target.classList.add("animate-slide-left");
                break;
              case 'slide-right':
                entry.target.classList.add("animate-slide-right");
                break;
              case 'bounce-in':
                entry.target.classList.add("animate-bounce-in");
                break;
              default:
                entry.target.classList.add("animate-slide-up");
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      const element = el as HTMLElement;
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      observer.observe(element);
    });

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (testimonialIntervalRef.current) clearInterval(testimonialIntervalRef.current);
      if (projectIntervalRef.current) clearInterval(projectIntervalRef.current);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-sky-200 selection:text-sky-900">
      {/* Enhanced Hero Section - Light Sky Blue Gradient */}
      <section className="relative min-h-screen flex flex-col sm:flex-row items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 bg-black">
        <NeuronNetwork />
        <div className="relative z-10 max-w-7xl w-full mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="animate-on-scroll mb-12 lg:mb-0" data-animation="slide-up">
              <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect text-white mb-6">
                <Award className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Award-Winning AI Solutions</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-primary leading-tight">
                <span>
                  AI Solutions
                </span>
                <br />
                <span>for Tomorrow</span>
              </h1>

              <p className="text-lg sm:text-xl mb-8 leading-relaxed text-white max-w-xl">
                Transform your business with cutting-edge artificial intelligence, machine learning,
                and automation solutions. We create intelligent systems that evolve with your needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/services"
                  className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover-scale animate-pulse-glow shadow-md hover:opacity-90 transition-colors"
                >
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                <button className="inline-flex items-center px-8 py-4 font-semibold rounded-full border transition-colors duration-300 bg-white text-slate-900 shadow-sm hover:opacity-95">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>

            </div>

            <div className="animate-on-scroll" data-animation="scale">
              <div className="relative flex items-center justify-center mx-auto" style={{ maxWidth: "400px" }}>
                <div className="ai-brain-container">
                  <div className="ai-brain-glow"></div>
                  <div className="ai-brain">
                    <div className="ai-text">AI</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section - White Background */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card animate-on-scroll group rounded-2xl p-6 bg-white border border-[#00b4bb]/15 shadow-sm hover:shadow-md hover:border-[#00b4bb]/40 transition flex flex-col items-center justify-center text-center gap-2 min-h-[200px]" data-animation="bounce-in">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#00b4bb]/30 mb-4 bg-[#00b4bb]/10 mx-auto">
                  <img
                    src={stat.image}
                    alt={stat.label}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                </div>
                <div className="text-3xl font-extrabold mb-1 text-primary">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-[#2c3d4f]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section - Light Teal Background */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll" data-animation="slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
              <span>Our AI Services</span>
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-[#2c3d4f]">
              Comprehensive AI solutions designed to transform your business operations and drive innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden hover-lift animate-on-scroll shadow-xl" data-animation="slide-up">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 mr-3 flex-shrink-0 text-cyan-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/services" className="inline-flex items-center font-medium hover:underline text-primary group-hover:text-primary transition-colors">
                    Learn More <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section - Light Gray Background */}
      <section className="py-20 bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll" data-animation="slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
              <span>Success Stories</span>
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-[#2c3d4f]">
              Real results from our AI implementations across various industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden hover-lift animate-on-scroll shadow-xl group" data-animation="slide-up">
                <div className="relative h-48 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white bg-primary">
                    {project.category}
                  </div>
                  <div className="absolute top-4 right-4">
                    <img src={project.clientLogo} alt="Client" className="w-10 h-10 rounded-full border-2 border-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#2c3d4f]">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 mb-4">{project.description}</p>

                  <div className="space-y-2 mb-4">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>

                  <button className="flex items-center text-sm font-medium hover:underline text-primary hover:text-primary transition-colors group">
                    View Case Study <ExternalLink className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials Section - White Background */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll" data-animation="slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
              <span>What Our Clients Say</span>
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-[#2c3d4f]">
              Don't just take our word for it - hear from the companies we've helped transform
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gray-100 rounded-3xl p-8 shadow-md animate-on-scroll border border-gray-200" data-animation="fade-in">
              <div className="flex items-start mb-8">
                <div className="relative">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                    <Quote className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="ml-6 flex-1">
                  <h4 className="font-bold text-xl text-[#2c3d4f] mb-1">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-[#2c3d4f] mb-1">{testimonials[currentTestimonial].role}</p>
                  <p className="text-primary font-semibold text-sm">
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
                <div className="flex space-x-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                  ))}
                </div>
              </div>

              <blockquote className="text-lg mb-8 leading-relaxed text-[#2c3d4f] italic">
                "{testimonials[currentTestimonial].content}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-500">
                  Testimonial {currentTestimonial + 1} of {testimonials.length}
                </div>
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial
                        ? 'bg-teal-500 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      onClick={() => setCurrentTestimonial(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Light Teal Background */}
      <section className="py-20 bg-gray-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll" data-animation="slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
              Why Choose <span>Panabotics?</span>
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-[#2c3d4f]">
              We combine cutting-edge technology with deep industry expertise to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="group animate-on-scroll" data-animation="slide-up">
                <div className="bg-white rounded-2xl p-6 text-center hover-lift transition-all duration-300 shadow-xl border-2 border-cyan-300">
                  <div className="relative mb-6 mx-auto w-24 h-24 rounded-xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-600/60 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <item.icon className="h-8 w-8 text-white drop-shadow-lg" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-[#2c3d4f]">
                    {item.title}
                  </h3>

                  <p className="text-[#2c3d4f] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" id="process">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">Our Process</h2>
            <p className="text-[#2c3d4f]">A step-by-step approach to delivering high-quality AI solutions tailored to your business.</p>
          </div>

          <div
            className="rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 bg-gray-100 border border-gray-200 shadow-sm"
          >
            <div className="space-y-10">
              {processSteps.map((step, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-12 items-center">
                  {index % 2 === 0 ? (
                    <>
                      <div className="bg-white rounded-xl p-6 md:p-8 border border-[#00b4bb]/20 text-[#2c3d4f] shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <div className="text-5xl font-extrabold leading-none text-primary">{step.step}</div>
                        <h3 className="mt-2 text-2xl font-semibold text-[#2c3d4f]">{step.title}</h3>
                        <p className="mt-2 text-[#2c3d4f]">{step.description}</p>
                      </div>
                      <div className="rounded-xl overflow-hidden ring-2 ring-[#00b4bb]/30 shadow-md">
                        <img src={step.image} alt={step.title} className="w-full h-48 md:h-56 lg:h-64 object-cover" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="rounded-xl overflow-hidden ring-2 ring-[#00b4bb]/30 shadow-md">
                        <img src={step.image} alt={step.title} className="w-full h-48 md:h-56 lg:h-64 object-cover" />
                      </div>
                      <div className="bg-white rounded-xl p-6 md:p-8 border border-[#00b4bb]/20 text-[#2c3d4f] shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <div className="text-5xl font-extrabold leading-none text-primary">{step.step}</div>
                        <h3 className="mt-2 text-2xl font-semibold text-[#2c3d4f]">{step.title}</h3>
                        <p className="mt-2 text-[#2c3d4f]">{step.description}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Tech Stack Section - White Background */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll" data-animation="fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">
              Powered by Leading Technologies
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-[#2c3d4f]">
              We leverage the most advanced tools and frameworks to build scalable, robust AI solutions
            </p>
          </div>

          <div className="tech-slider-container animate-on-scroll" data-animation="scale">
            <div
              className="tech-slider-track"
              style={{ transform: `translateX(-${currentSlide * 25}%)` }}
              ref={sliderRef}
            >
              {doubledTechStack.map((tech, index) => (
                <div key={`${tech.name}-${index}`} className="tech-slide">
                  <div className="tech-slide-content" tabIndex={0} aria-label={tech.name}>
                    <img src={tech.icon} alt={tech.name} className="tech-icon" />
                    <span className="tech-name">{tech.name}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="slider-nav pointer-events-auto hidden">
              <button
                className="slider-btn hover-scale"
                onClick={() => {
                  setCurrentSlide(prev => prev > 0 ? prev - 1 : techStack.length - 1);
                  if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = setInterval(nextSlide, 2000);
                  }
                }}
                aria-label="Previous technology"
              >
                <ChevronLeft className="h-5 w-5 text-slate-600" />
              </button>
              <button
                className="slider-btn hover-scale"
                onClick={() => {
                  nextSlide();
                  if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = setInterval(nextSlide, 2000);
                  }
                }}
                aria-label="Next technology"
              >
                <ChevronRight className="h-5 w-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section - sea green and white gray */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl text-slate-800 text-center max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 py-12 animate-on-scroll relative overflow-hidden bg-gray-100 border border-gray-200 shadow-sm"
            data-animation="scale-in">

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-sky-300 rounded-full -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-teal-300 rounded-full translate-x-20 translate-y-20"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
                Ready to Transform Your Business with AI?
              </h2>

              <p className="text-xl mb-8 max-w-2xl mx-auto text-[#2c3d4f]">
                Join hundreds of companies already using our AI solutions to drive growth,
                reduce costs, and unlock new possibilities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover-scale shadow-lg transition-all duration-300 hover:opacity-90"
                >
                  Start Your AI Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                <Link
                  to="/portfolio"
                  className="inline-flex items-center px-8 py-4 border border-gray-400 font-semibold rounded-full hover:bg-white hover-scale transition-all duration-300 text-slate-700"
                >
                  View Our Work
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-cyan-500" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-cyan-500" />
                  <span>Custom Solutions</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-cyan-500" />
                  <span>Expert Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
