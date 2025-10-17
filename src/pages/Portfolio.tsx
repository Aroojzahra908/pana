import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, LifeBuoy, Linkedin } from "lucide-react";
import { useLocation } from 'react-router-dom';
import {
  Eye,
  Brain,
  Zap,
  Shield,
  TrendingUp,
  MessageSquare,
  Play,
  Download,
  Star,
  Users,
  Award,
  CheckCircle,
  Search,
  ArrowRight,
  X,
} from 'lucide-react';
import colors from '../components/colors';

type StatusColor = 'green' | 'blue' | 'orange';

interface Product {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  longDescription: string;
  status: string;
  statusColor: StatusColor;
  category: string;
  image: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  tags: string[];
  features: string[];
  metrics: Record<string, string | number>;
  pricing: string;
  demoUrl: string;
  videoUrl: string; // YouTube video URL
  appUrl: string; // Play Store URL
  documentation: string;
  caseStudy: string;
  testimonial: {
    text: string;
    author: string;
    rating: number;
  };
}

const PanaboticsPortfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedVideo(null);
      }
    };

    if (selectedVideo) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo]);

  const categories = [
    { id: 'all', name: 'All Products', count: 14 },
    { id: 'computer-vision', name: 'Computer Vision', count: 3 },
    { id: 'analytics', name: 'Analytics', count: 2 },
    { id: 'automation', name: 'Automation', count: 3 },
    { id: 'security', name: 'Security', count: 1 },
    { id: 'conversational', name: 'Conversational AI', count: 2 },
    { id: 'specialized', name: 'Specialized Apps', count: 3 },
  ];

  const getYouTubeVideoId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  };

  const products: Product[] = [

    {
      id: 1,
      name: 'Wheat Agent Conversational',
      subtitle: 'Crop Management AI Bot',
      description:
        'Conversational bot supporting wheat farmers with support, weather, and pest alerts.',
      longDescription:
        'Talk to our Wheat Agent for instant farming tips, pest diagnostics, and weather alerts tailored to your fields.',
      status: 'Available',
      statusColor: 'green',
      category: 'conversational',
      image: '/tech-icons/WheatAgent.png',
      icon: MessageSquare,
      tags: ['NLP', 'Agriculture', 'Weather Alerts'],
      features: ['Weather Updates', 'Pest Diagnostics', 'Farming Tips'],
      metrics: {
        users: '34,000+',
        accuracy: '97.2%',
        alerts: '3,500+',
        languages: '3',
      },
      pricing: 'Free',
      demoUrl: '#',
      videoUrl: 'https://www.youtube.com/watch?v=6PSEFzcEAuE',
      appUrl:
        'https://play.google.com/store/apps/details?id=com.example.wheatagent',
      documentation: '#',
      caseStudy: 'Reduced pest outbreaks by 18%',
      testimonial: {
        text: 'The crop bot helped me save my harvest during bad weather.',
        author: 'Rehan Sabir, Farmer',
        rating: 5,
      },
    },

    {
      id: 2,
      name: 'SprayMixer App',
      subtitle: 'Automatic Farm Spraying Control',
      description:
        'SprayMix is a powerful tool designed to help farmers, agronomists, and agricultural professionals accurately calculate the required amount of pesticides, water, and spraying solutions based on crop size, spray tank capacity, and nozzle type.',
      longDescription:
        'Mobile dashboard to monitor spray timings, field coverage, and chemical usage with IoT integration.',
      status: 'Beta',
      statusColor: 'blue',
      category: 'automation',
      image: '/tech-icons/spray-mix.png',
      icon: Zap,
      tags: ['IoT', 'React Native', 'Agriculture'],
      features: [
        'Spray Scheduling',
        'Chemical Tracking',
        'Field Monitoring',
      ],
      metrics: {
        devices: '800+',
        farms: '60+',
        accuracy: '93.9%',
        savings: '21%',
      },
      pricing: 'Beta Test',
      demoUrl: '#',
      videoUrl: 'https://www.youtube.com/watch?v=nQffnpitQHY',
      appUrl: 'https://play.google.com/store/apps/details?id=com.spraymix.app&hl=en',
      documentation: '#',
      caseStudy: 'Reduced chemical cost by 21%.',
      testimonial: {
        text: 'SprayMixer makes sustainable farming easy.',
        author: 'Tom Linton, Farm Owner',
        rating: 5,
      },
    },

    {
      id: 3,
      name: 'Orange Counter',
      subtitle: 'AI Fruit Recognizer & Sorter',
      description:
        'Detect, count, and grade fruit crates using robust computer vision algorithms.',
      longDescription:
        'Automate the fruit processing line and maximize quality assurance with Orange Counter’s powerful detection and grading tools.',
      status: 'Available',
      statusColor: 'green',
      category: 'computer-vision',
      image: '/tech-icons/orange.png',
      icon: TrendingUp,
      tags: ['OpenCV', 'Python', 'Agriculture'],
      features: ['Fruit Counting', 'Quality Grading', 'Batch Reporting'],
      metrics: {
        accuracy: '95.1%',
        crates: '500,000+',
        deployments: '28',
        speed: '10/sec',
      },
      pricing: '$29/month',
      demoUrl: '#',
      videoUrl: 'https://www.youtube.com/watch?v=QPV3lULUo74',
      appUrl: 'https://play.google.com/store/apps/details?id=com.farhanali_ai.CitrusCounter&hl=en',
      documentation: '#',
      caseStudy: 'Improved grading efficiency by 60%',
      testimonial: {
        text: 'No more manual counting! Orange Counter is truly a game changer.',
        author: 'Ali Rehman, Agritech Manager',
        rating: 5,
      },
    },



    {
      id: 4,
      name: 'ChatAgent Pro',
      subtitle: 'Advanced Conversational AI',
      description:
        'Next-generation conversational AI platform with multi-language support, custom knowledge integration, and human-like interactions.',
      longDescription:
        'Create sophisticated AI assistants that understand context, maintain conversation flow, and provide personalized responses. Perfect for customer service, sales, and internal support.',
      status: 'Coming Soon',
      statusColor: 'orange',
      category: 'conversational',
      image: '/tech-icons/image4.jfif',
      icon: MessageSquare,
      tags: ['PyTorch', 'Transformers', 'FastAPI', 'Redis', 'NLP'],
      features: [
        'Multi-language Support',
        'Context Awareness',
        'Custom Knowledge',
        'Voice Integration',
      ],
      metrics: {
        languages: '25+',
        accuracy: '96.8%',
        responseTime: '<100ms',
        satisfaction: '94%',
      },
      pricing: 'Q2 2024',
      demoUrl: '#',
      videoUrl: 'https://youtu.be/VZou5pYcWXM',
      appUrl: 'https://play.google.com/store/apps/details?id=pdf.reader.pdfviewer.pdfeditor&pcampaignid=web_share',
      documentation: '#',
      caseStudy: 'In development - Early access available',
      testimonial: {
        text: 'Early preview shows incredible potential for customer service.',
        author: 'James Thompson, Customer Success Lead',
        rating: 5,
      },
    },
    {
      id: 5,
      name: 'PredictForward',
      subtitle: 'Machine Learning Forecasting',
      description:
        'Advanced forecasting platform that uses ensemble machine learning models to predict business trends with unprecedented accuracy.',
      longDescription:
        'Make data-driven decisions with confidence using our advanced forecasting platform. Combines multiple ML algorithms to deliver highly accurate predictions for sales, demand, and market trends.',
      status: 'Coming Soon',
      statusColor: 'green',
      category: 'analytics',
      image: '/tech-icons/image5.jfif',
      icon: TrendingUp,
      tags: ['Python', 'XGBoost', 'Apache Spark', 'Jupyter', 'TensorFlow'],
      features: [
        'Ensemble Models',
        'Time Series Analysis',
        'Uncertainty Quantification',
        'Automated Retraining',
      ],
      metrics: {
        accuracy: '92.5%',
        predictions: '1M+',
        clients: '95+',
        industries: '12',
      },
      pricing: 'From $199/month',
      demoUrl: '#',
      videoUrl: 'https://youtu.be/VZou5pYcWXM',
      appUrl: 'https://play.google.com/store/apps/details?id=pdf.reader.pdfviewer.pdfeditor&pcampaignid=web_share',
      documentation: '#',
      caseStudy: 'Improved demand forecasting accuracy by 45% for manufacturing client',
      testimonial: {
        text: "PredictForward's accuracy exceeded our expectations significantly.",
        author: 'David Park, Supply Chain Director',
        rating: 5,
      },
    },
    {
      id: 6,
      name: 'SecureAI Guardian',
      subtitle: 'AI-Powered Cybersecurity',
      description:
        'Cutting-edge cybersecurity platform that uses AI to detect, analyze, and respond to security threats in real-time.',
      longDescription:
        'Protect your organization with AI-powered threat detection and automated response. Our platform identifies zero-day attacks, insider threats, and advanced persistent threats.',
      status: 'Coming Soon',
      statusColor: 'blue',
      category: 'security',
      image: '/tech-icons/image6.jfif',
      icon: Shield,
      tags: ['Python', 'TensorFlow', 'Kubernetes', 'Elasticsearch', 'Kafka'],
      features: [
        'Real-time Monitoring',
        'Automated Response',
        'Threat Intelligence',
        'Compliance Reporting',
      ],
      metrics: {
        detection: '99.3%',
        falsePositives: '<0.1%',
        responseTime: '30sec',
        coverage: '24/7',
      },
      pricing: 'Enterprise',
      demoUrl: '#',
      videoUrl: 'https://youtu.be/VZou5pYcWXM',
      appUrl: 'https://play.google.com/store/apps/details?id=pdf.reader.pdfviewer.pdfeditor&pcampaignid=web_share',
      documentation: '#',
      caseStudy: 'Prevented 12 major security breaches in first month of deployment',
      testimonial: {
        text: 'SecureAI Guardian is our first line of defense against cyber threats.',
        author: 'Alex Kumar, CISO',
        rating: 5,
      },
    },
    {
      id: 7,
      name: 'NeuralOCR Pro',
      subtitle: 'Intelligent Document Processing',
      description:
        'Advanced OCR and document understanding platform that extracts and processes information from any document type with AI precision.',
      longDescription:
        'Transform unstructured documents into structured data with our AI-powered OCR platform. Handles handwriting, complex layouts, and multiple languages with exceptional accuracy.',
      status: 'Coming Soon',
      statusColor: 'green',
      category: 'computer-vision',
      image: '/tech-icons/image7.jfif',
      icon: Eye,
      tags: ['Python', 'PyTorch', 'OpenCV', 'Tesseract', 'NLP'],
      features: [
        'Handwriting Recognition',
        'Layout Understanding',
        'Multi-language Support',
        'Data Extraction',
      ],
      metrics: {
        accuracy: '98.7%',
        languages: '40+',
        documents: '10M+',
        clients: '150+',
      },
      pricing: 'From $49/month',
      demoUrl: '#',
      videoUrl: 'https://youtu.be/VZou5pYcWXM',
      appUrl: 'https://play.google.com/store/apps/details?id=pdf.reader.pdfviewer.pdfeditor&pcampaignid=web_share',
      documentation: '#',
      caseStudy: 'Digitized 50,000 historical documents for government archive',
      testimonial: {
        text: 'NeuralOCR Pro handles our most complex documents flawlessly.',
        author: 'Maria Santos, Document Manager',
        rating: 5,
      },
    },
    {
      id: 8,
      name: 'SmartFlow RPA',
      subtitle: 'Robotic Process Automation',
      description:
        'Intelligent RPA platform that combines traditional automation with AI capabilities for complex decision-making and adaptability.',
      longDescription:
        'Next-generation RPA that goes beyond simple task automation. Our platform can handle exceptions, make decisions, and adapt to changes in your business processes.',
      status: 'Coming Soon',
      statusColor: 'green',
      category: 'automation',
      image: '/tech-icons/image8.jfif',
      icon: Zap,
      tags: ['Python', 'Selenium', 'UiPath', 'Azure', 'Machine Learning'],
      features: [
        'Exception Handling',
        'Cognitive Automation',
        'Process Mining',
        'Scalable Deployment',
      ],
      metrics: {
        efficiency: '95%',
        errorReduction: '99%',
        processes: '2000+',
        clients: '200+',
      },
      pricing: 'From $79/month',
      demoUrl: '#',
      videoUrl: 'https://youtu.be/VZou5pYcWXM',
      appUrl: 'https://play.google.com/store/apps/details?id=pdf.reader.pdfviewer.pdfeditor&pcampaignid=web_share',
      documentation: '#',
      caseStudy: 'Automated invoice processing with 95% straight-through rate',
      testimonial: {
        text: 'SmartFlow RPA transformed our back-office operations completely.',
        author: 'Robert Chen, Operations Director',
        rating: 5,
      },
    },
    {
      id: 9,
      name: 'Panaskin',
      subtitle: 'AI Skin Health Analyzer',
      description:
        'Instant skin analysis powered by deep learning and image analytics for beauty and dermatology.',
      longDescription:
        'Panaskin uses advanced computer vision to assess skin health, detect conditions, and recommend personalized products.',
      status: 'Coming Soon',
      statusColor: 'green',
      category: 'specialized',
      image: '/tech-icons/PanaSkin.png',
      icon: Eye,
      tags: ['TensorFlow', 'React Native', 'Dermatology'],
      features: [
        'Skin Condition Detection',
        'Product Recommendation',
        'Mobile Integration',
      ],
      metrics: {
        accuracy: '97.5%',
        users: '80,000+',
        types: '30+',
        languages: '12',
      },
      pricing: 'Free & Premium',
      demoUrl: '#',
      videoUrl: 'https://youtu.be/VZou5pYcWXM',
      appUrl: 'https://play.google.com/store/apps/details?id=pdf.reader.pdfviewer.pdfeditor&pcampaignid=web_share',
      documentation: '#',
      caseStudy: 'Reduced dermatologist visits by 22%',
      testimonial: {
        text: 'Panaskin gave me instant clarity about my skin health.',
        author: 'Emily Rivera, User',
        rating: 5,
      },
    },

    {
      id: 10,
      name: 'AutoFlow Engine',
      subtitle: 'Intelligent Process Automation',
      description:
        'Revolutionary automation platform that uses AI to streamline complex business workflows, reducing manual work by up to 90%.',
      longDescription:
        'Eliminate repetitive tasks and optimize workflows with our intelligent automation engine. Features drag-and-drop workflow builder, AI decision making, and seamless integrations.',
      status: 'Coming Soon',
      statusColor: 'blue',
      category: 'automation',
      image: '/tech-icons/image3.jfif',
      icon: Zap,
      tags: ['Node.js', 'Docker', 'MongoDB', 'Vue.js', 'Kubernetes'],
      features: [
        'Drag & Drop Builder',
        'AI Decision Making',
        '300+ Integrations',
        'Real-time Monitoring',
      ],
      metrics: {
        efficiency: '90%',
        timesSaved: '40hrs/week',
        clients: '120+',
        workflows: '5000+',
      },
      pricing: 'Beta Access',
      demoUrl: '#',
      videoUrl: 'https://youtu.be/VZou5pYcWXM',
      appUrl: 'https://play.google.com/store/apps/details?id=pdf.reader.pdfviewer.pdfeditor&pcampaignid=web_share',
      documentation: '#',
      caseStudy: 'Automated 90% of document processing for financial services firm',
      testimonial: {
        text: 'AutoFlow saved us 40 hours per week in manual processing.',
        author: 'Lisa Wang, Operations Manager',
        rating: 5,
      },
    },
    //
    {
      id: 11,
      name: 'Assignment Writer',
      subtitle: 'Automated Academic Assistant',
      description:
        'Effortlessly create high-quality essays, assignments, and reports with AI-powered writing and automated referencing, designed to save time while ensuring accuracy and professionalism.',
      longDescription:
        'Boost your academic output with plagiarism checking, topic research, and citation generation.',
      status: 'Available',
      statusColor: 'green',
      category: 'specialized',
      image: '/tech-icons/assignmentwriter.png',
      icon: Brain,
      tags: ['NLP', 'FastAPI', 'Education'],
      features: [
        'Essay Generation',
        'Plagiarism Check',
        'Auto Referencing',
      ],
      metrics: {
        essays: '175,000+',
        accuracy: '99%',
        students: '50,000+',
        languages: '5',
      },
      pricing: 'From $7/month',
      demoUrl: '#',
      videoUrl: 'https://www.youtube.com/watch?v=OZjAtjCyu5M',
      appUrl:
        'https://play.google.com/store/apps/details?id=com.example.assignmentwriter',
      documentation: '#',
      caseStudy: 'Reduced writing time by 75% for undergrads',
      testimonial: {
        text: 'I could focus on research while Assignment Writer handled my citations.',
        author: 'Ayesha Khan, Student',
        rating: 5,
      },
    },
    {
      id: 12,
      name: 'DataMind Analytics',
      subtitle: 'AI-Powered Business Intelligence',
      description:
        'Comprehensive analytics platform that transforms raw data into actionable insights using advanced machine learning algorithms and predictive modeling.',
      longDescription:
        'Transform your business data into competitive advantage with our AI-powered analytics platform. Features automated insights, predictive modeling, and interactive dashboards.',
      status: 'Coming Soon',
      statusColor: 'green',
      category: 'analytics',
      image: '/tech-icons/image2.jfif',
      icon: TrendingUp,
      tags: ['Python', 'Pandas', 'Scikit-learn', 'D3.js', 'Apache Spark'],
      features: [
        'Automated Insights',
        'Predictive Models',
        'Real-time Dashboards',
        'Custom Reports',
      ],
      metrics: {
        accuracy: '94.2%',
        speed: 'Real-time',
        clients: '180+',
        dataPoints: '10B+',
      },
      pricing: 'From $99/month',
      demoUrl: '#',
      videoUrl: 'https://youtu.be/VZou5pYcWXM',
      appUrl: 'https://play.google.com/store/apps/details?id=pdf.reader.pdfviewer.pdfeditor&pcampaignid=web_share',
      documentation: '#',
      caseStudy: 'Increased revenue by 32% through predictive customer analytics',
      testimonial: {
        text: 'DataMind helped us uncover insights we never knew existed.',
        author: 'Michael Rodriguez, Data Director',
        rating: 5,
      },
    },


    {
      id: 13,
      name: 'VisionAI Suite',
      subtitle: 'Advanced Computer Vision Platform',
      description:
        'Revolutionary computer vision platform enabling real-time object detection, facial recognition, and intelligent video analytics with 99.7% accuracy.',
      longDescription:
        'Our flagship computer vision platform combines state-of-the-art deep learning models with real-time processing capabilities. Trusted by Fortune 500 companies for security, retail analytics, and industrial automation.',
      status: 'Coming Soon',
      statusColor: 'green',
      category: 'computer-vision',
      image: '/tech-icons/image1.jfif',
      icon: Eye,
      tags: ['Python', 'TensorFlow', 'OpenCV', 'CUDA', 'React'],
      features: [
        'Real-time Processing',
        '99.7% Accuracy',
        'Multi-object Tracking',
        'Edge Computing Ready',
      ],
      metrics: {
        accuracy: '99.7%',
        speed: '60 FPS',
        clients: '250+',
        uptime: '99.9%',
      },
      pricing: 'Enterprise',
      demoUrl: '#',
      videoUrl: 'https://youtu.be/VZou5pYcWXM',
      appUrl: 'https://play.google.com/store/apps/details?id=pdf.reader.pdfviewer.pdfeditor&pcampaignid=web_share',
      documentation: '#',
      caseStudy: 'Reduced security incidents by 85% for major retail chain',
      testimonial: {
        text: 'VisionAI Suite transformed our security operations completely.',
        author: 'Sarah Chen, CTO at RetailTech',
        rating: 5,
      },
    },
    {
      id: 14,
      name: 'Pyscologist App',
      subtitle: 'Mental Wellness Chatbot',
      description:
        'An AI-powered psychologist offering 24/7 self-care guidance, emotional support, and personalized advice to help you navigate life’s challenges anytime, anywhere.',
      longDescription:
        'Empathetic chatbot uses NLP to guide users through anxiety, stress, and wellness routines.',
      status: 'Available',
      statusColor: 'green',
      category: 'specialized',
      image: '/tech-icons/Pyscologist docter.webp',
      icon: Brain,
      tags: ['NLP', 'Mental Health', 'Chatbot'],
      features: ['Mood Tracking', 'Personalized Advice', 'Daily Check-in'],
      metrics: {
        users: '22,000+',
        accuracy: '99.2%',
        sessions: '120,000+',
        advisors: '6',
      },
      pricing: 'Free & Pro',
      demoUrl: '#',
      videoUrl: 'https://www.youtube.com/watch?v=uslJy3M7wAQ',
      appUrl:
        'https://play.google.com/store/apps/details?id=com.example.pysoologist',
      documentation: '#',
      caseStudy: 'Improved self-care reporting by 37%',
      testimonial: {
        text: 'The Pysoologist chatbot is always available when I need to talk.',
        author: 'Hammad Bari, User',
        rating: 5,
      },
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesFilter = activeFilter === 'all' || product.category === activeFilter;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchLower));
    return matchesFilter && matchesSearch;
  });

  const StatusBadge: React.FC<{ status: string; statusColor: StatusColor }> = ({
    status,
    statusColor,
  }) => {
    const colorsMap = {
      green: 'bg-green-100 text-green-800 border-green-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colorsMap[statusColor]}`}
      >
        <div
          className={`w-2 h-2 rounded-full mr-2 ${statusColor === 'green'
            ? 'bg-green-500'
            : statusColor === 'blue'
              ? 'bg-blue-500'
              : 'bg-orange-500'
            }`}
        ></div>
        {status}
      </span>
    );
  };

  const VideoModal: React.FC<{ videoUrl: string; onClose: () => void }> = ({
    videoUrl,
    onClose,
  }) => {
    const videoId = getYouTubeVideoId(videoUrl);

    if (!videoId) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Demo Video</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="text-gray-600">Video URL not available. Please add a valid YouTube URL.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative pb-[56.25%] h-0">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title="Demo Video"
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    );
  };

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const Icon = product.icon;

    return (
      <div
        className="group relative bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-1 md:hover:-translate-y-2"
        onMouseEnter={() => setHoveredCard(product.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {/* Image Section */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3 md:top-4 md:right-4">
            <StatusBadge status={product.status} statusColor={product.statusColor} />
          </div>

          {/* Icon */}
          <div
            className="absolute top-3 left-3 md:top-4 md:left-4 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-lg md:rounded-xl flex items-center justify-center"
            style={{ color: colors.primaryHex }}
          >
            <Icon className="h-5 w-5 md:h-6 md:w-6" />
          </div>

          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 cursor-pointer ${hoveredCard === product.id ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ backgroundColor: `${colors.primaryHex}E6` }}
            onClick={() => setSelectedVideo(product.videoUrl)}
          >
            <div className="text-center text-white">
              <Play className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-1 md:mb-2" />
              <p className="font-semibold text-sm md:text-base">Watch Demo</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6 md:p-8">
          <div className="mb-3 md:mb-4">
            <h3
              className="text-xl md:text-2xl font-bold mb-1 md:mb-2 group-hover:underline transition-colors"
              style={{ color: colors.secondaryHex }}
            >
              {product.name}
            </h3>
            <p
              className="font-medium text-xs md:text-sm uppercase tracking-wide"
              style={{ color: colors.primaryHex }}
            >
              {product.subtitle}
            </p>
          </div>

          <p className="mb-4 md:mb-6 leading-relaxed text-sm md:text-base" style={{ color: '#4b5563' }}>
            {product.description}
          </p>

          {/* Features */}
          <div className="mb-4 md:mb-6">
            <div className="flex flex-wrap gap-1 md:gap-2">
              {product.features.slice(0, 3).map((feature, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 bg-gray-100 text-gray-700 rounded-full text-xs md:text-sm"
                >
                  <CheckCircle
                    className="h-2.5 w-2.5 md:h-3 md:w-3 mr-1"
                    style={{ color: colors.primaryHex }}
                  />
                  {feature}
                </span>
              ))}
              {product.features.length > 3 && (
                <span
                  className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium"
                  style={{ backgroundColor: '#e0f7f9', color: colors.primaryHex }}
                >
                  +{product.features.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6 p-2 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl">
            {Object.entries(product.metrics)
              .slice(0, 4)
              .map(([key, value], idx) => (
                <div key={idx} className="text-center">
                  <div className="text-sm md:text-lg font-bold text-gray-900">{value.toString()}</div>
                  <div className="text-xxs md:text-xs text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
          </div>

          {/* Tech Stack */}
          <div className="mb-4 md:mb-6">
            <div className="flex flex-wrap gap-1 md:gap-2">
              {product.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 md:px-2 md:py-1 bg-gray-200 text-gray-700 rounded text-xxs md:text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div
            className="mb-4 md:mb-6 p-2 md:p-4 rounded-xl md:rounded-2xl"
            style={{ backgroundColor: '#e0f7f9' }}
          >
            <div className="flex items-center mb-1 md:mb-2">
              {[...Array(product.testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="h-3 w-3 md:h-4 md:w-4"
                  style={{ color: '#fbbf24' }}
                />
              ))}
            </div>
            <p className="text-xs md:text-sm text-gray-700 italic mb-1 md:mb-2">"{product.testimonial.text}"</p>
            <p className="text-xxs md:text-xs text-gray-600 font-medium">{product.testimonial.author}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 md:gap-3">
            <a
              href={product.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-white px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg group flex items-center justify-center"
              style={{ backgroundColor: colors.primaryHex }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLAnchorElement;
                target.style.backgroundColor = '#009aa0';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLAnchorElement;
                target.style.backgroundColor = colors.primaryHex;
              }}
            >
              <span className="flex items-center justify-center">
                Access It
                <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-0.5 md:group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: '#f9fafb' }}>
      {selectedVideo && <VideoModal videoUrl={selectedVideo} onClose={() => setSelectedVideo(null)} />}

      {/* Hero Section */}
      <section
        className="relative pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden"
        style={{ backgroundColor: 'white' }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-10 left-5 md:top-20 md:left-10 w-48 h-48 md:w-72 md:h-72 rounded-full filter blur-xl opacity-70 animate-pulse"
            style={{ backgroundColor: `${colors.primaryHex}33` }}
          ></div>
          <div
            className="absolute top-20 right-5 md:top-40 md:right-10 w-48 h-48 md:w-72 md:h-72 rounded-full filter blur-xl opacity-70 animate-pulse"
            style={{ backgroundColor: '#d1d5db33', animationDelay: '2s' }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <div
              className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6"
              style={{ backgroundColor: `${colors.primaryHex}22`, color: colors.primaryHex }}
            >
              <Award className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" color={colors.primaryHex} />
              Award-Winning AI Solutions
            </div>

            <h1
              className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight"
              style={{ color: colors.primaryHex }}
            >
              Our AI Portfolio
            </h1>

            <p
              className="text-base md:text-xl max-w-2xl md:max-w-3xl mx-auto mb-6 md:mb-8"
              style={{ color: colors.secondaryHex, opacity: 0.8 }}
            >
              Discover our comprehensive suite of AI-powered products, each designed to solve complex business challenges and drive innovation across industries.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center items-center">
              <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-xs md:text-sm" style={{ color: colors.secondaryHex }}>
                <div className="flex items-center">
                  <Users className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" color={colors.primaryHex} />
                  <span>500+ Enterprise Clients</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" color="#fbbf24" />
                  <span>4.9/5 Customer Rating</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" color={colors.primaryHex} />
                  <span>Industry Recognition</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="bg-white rounded-xl md:rounded-3xl shadow-lg p-4 md:p-8 border"
            style={{ borderColor: '#e5e7eb' }}
          >
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:flex-1 lg:max-w-md">
                <Search
                  className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5"
                  color="#9ca3af"
                />
                <input
                  type="text"
                  placeholder="Search products, features, or technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 md:pl-12 pr-3 md:pr-4 py-2 md:py-3 border rounded-xl md:rounded-2xl focus:ring-2 focus:border-transparent transition-all duration-300 text-sm md:text-base"
                  style={{
                    borderColor: '#d1d5db',
                    color: colors.secondaryHex,
                  }}
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-1 md:gap-2 w-full lg:w-auto mt-3 lg:mt-0">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`px-3 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl font-medium transition-all duration-300 text-xs md:text-sm ${activeFilter === category.id
                      ? 'text-white shadow-md md:shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    style={
                      activeFilter === category.id
                        ? { backgroundColor: colors.secondaryHex }
                        : {}
                    }
                  >
                    {category.name}
                    <span className="ml-1 md:ml-2 text-xxs md:text-xs opacity-75">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 md:py-20" style={{ color: colors.secondaryHex }}>
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Search className="h-8 w-8 md:h-12 md:w-12" color="#9ca3af" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">No products found</h3>
              <p className="mb-4 md:mb-6 text-sm md:text-base" style={{ opacity: 0.7 }}>
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('all');
                }}
                className="px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl transition-colors text-sm md:text-base"
                style={{ backgroundColor: colors.primaryHex, color: 'white' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#009aa0')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.primaryHex)}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-xl md:rounded-3xl p-6 md:p-12 text-center text-white relative overflow-hidden"
            style={{ backgroundColor: colors.primaryHex }}
          >
            <div className="absolute inset-0 bg-black/10 rounded-xl md:rounded-3xl"></div>
            {/* <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Ready to Experience Our AI Solutions?</h2>
              <p className="text-sm md:text-xl mb-4 md:mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of companies already transforming their operations with Panabotics AI products. Get started with a personalized demo today.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center">
                <button
                  className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 font-semibold rounded-lg md:rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md md:hover:shadow-xl group text-sm md:text-base"
                  style={{ backgroundColor: 'white', color: colors.primaryHex }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0f7f9')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                >
                  Schedule Demo
                  <Play className="ml-1 md:ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform" color={colors.primaryHex} />
                </button>
                <button
                  className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 border-2 rounded-lg md:rounded-full transition-all duration-300 hover:scale-105 text-sm md:text-base"
                  style={{ borderColor: 'white', color: 'white' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = colors.primaryHex;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  <Download className="mr-1 md:mr-2 h-4 w-4 md:h-5 md:w-5" color="currentColor" />
                  Download Brochure
                </button>
              </div>
            </div> */}
            <div className="relative z-10">
              <h2 className="text-lg md:text-2xl font-bold mb-2 md:mb-3">
                Ready to Experience Our AI Solutions?
              </h2>
              <p className="text-xs md:text-sm mb-3 md:mb-5 opacity-90 max-w-2xl mx-auto">
                Join thousands of companies already transforming their operations with Panabotics AI products.
                Get started with a personalized demo today.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center">
                {/* Schedule Demo */}
                <button
                  className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 font-semibold rounded-lg md:rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md md:hover:shadow-xl group text-sm md:text-base"
                  style={{ backgroundColor: "white", color: colors.primaryHex }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e0f7f9")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "white")
                  }
                >
                  Schedule Demo
                  <Play
                    className="ml-1 md:ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform"
                    color={colors.primaryHex}
                  />
                </button>

                {/* Contact Us */}
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 border-2 rounded-lg md:rounded-full transition-all duration-300 hover:scale-105 text-sm md:text-base"
                  style={{ borderColor: "white", color: "white" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = colors.primaryHex;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "white";
                  }}
                >
                  <Mail className="mr-1 md:mr-2 h-4 w-4 md:h-5 md:w-5" color="currentColor" />
                  Contact Us
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      
        @media (min-width: 768px) {
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        }
        `}</style>
    </div>
  );
};

export default PanaboticsPortfolio;
