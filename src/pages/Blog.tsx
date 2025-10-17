import { useEffect, useState } from "react";
import {
  Calendar,
  User,
  ArrowRight,
  Heart,
  Eye,
  MessageCircle,
  ArrowLeft,
  Share2,
  Bookmark,
} from "lucide-react";
import { motion } from "framer-motion";

import colors from "../components/colors";

const Blog = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());

  // Scroll to top when component mounts or selectedBlog changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedBlog]);

  useEffect(() => {
    // Auto-slide for featured posts
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleLike = (index, e) => {
    e?.stopPropagation();
    const newLiked = new Set(likedPosts);
    if (newLiked.has(index)) {
      newLiked.delete(index);
    } else {
      newLiked.add(index);
    }
    setLikedPosts(newLiked);
  };

  const toggleBookmark = (index, e) => {
    e?.stopPropagation();
    const newBookmarked = new Set(bookmarkedPosts);
    if (newBookmarked.has(index)) {
      newBookmarked.delete(index);
    } else {
      newBookmarked.add(index);
    }
    setBookmarkedPosts(newBookmarked);
  };

  const featuredPosts = [
    {
      title: "Breakthrough in Neural Network Architecture",
      excerpt:
        "Our research team has developed a novel neural network architecture that achieves unprecedented accuracy in complex pattern recognition tasks.",
      author: "Dr. Alex Martinez",
      date: "March 20, 2024",
      image:
        "/tech-icons/b1.jfif",
      comments: 42,
      views: "3.5k",
      likes: 156,
      fullContent: `
        <h2>Revolutionary Neural Network Architecture</h2>
        <p>In a groundbreaking development, our research team has successfully created a novel neural network architecture that represents a significant leap forward in artificial intelligence capabilities.</p>
        
        <h3>The Innovation</h3>
        <p>Our new architecture, dubbed "NeuroFlow", combines the best aspects of transformer networks with novel attention mechanisms that we've developed over the past two years. The result is a system that can process complex patterns with unprecedented accuracy.</p>
        
        <h3>Key Achievements</h3>
        <ul>
          <li>95% accuracy improvement in pattern recognition tasks</li>
          <li>60% reduction in computational requirements</li>
          <li>Enhanced ability to handle multi-modal data inputs</li>
          <li>Improved interpretability of decision-making processes</li>
        </ul>
        
        <h3>Real-World Applications</h3>
        <p>This breakthrough has immediate applications in healthcare diagnostics, autonomous vehicle navigation, and natural language understanding. We're already seeing promising results in early trials with medical imaging analysis.</p>
        
        <h3>What's Next?</h3>
        <p>Our team is now working on scaling this architecture for enterprise applications. We expect to release a public research paper within the next month, followed by open-source implementations.</p>
        
        <p>This represents just the beginning of what we believe will be a new era in artificial intelligence capabilities.</p>
      `,
    },
    {
      title: "AI Revolution in Creative Industries",
      excerpt:
        "Discover how artificial intelligence is transforming art, music, and creative content generation across multiple industries.",
      author: "Sarah Johnson",
      date: "March 18, 2024",
      image:
        "/tech-icons/b2.jfif",
      fullContent: `
        <h2>AI's Creative Renaissance</h2>
        <p>The creative industries are experiencing an unprecedented transformation as artificial intelligence tools become more sophisticated and accessible to artists, musicians, and content creators worldwide.</p>
        
        <h3>Digital Art Revolution</h3>
        <p>AI-powered art generation tools have democratized digital art creation, allowing anyone to produce stunning visuals with simple text prompts. Artists are now collaborating with AI to push creative boundaries.</p>
        
        <h3>Music Composition</h3>
        <p>AI composers are creating original music across all genres, from classical symphonies to modern pop hits. These tools are becoming valuable collaborators rather than replacements for human creativity.</p>
        
        <h3>Content Creation</h3>
        <p>Video production, graphic design, and marketing content creation have been revolutionized by AI tools that can generate, edit, and optimize content at scale.</p>
        
        <h3>The Human Touch</h3>
        <p>Despite AI's capabilities, human creativity remains irreplaceable. The most successful creative projects combine AI efficiency with human insight and emotional intelligence.</p>
      `,
    },
    {
      title: "Quantum Computing Meets AI",
      excerpt:
        "Exploring the intersection of quantum computing and artificial intelligence for next-generation problem solving.",
      author: "Dr. Michael Chen",
      date: "March 16, 2024",
      image:
        "/tech-icons/b3.jfif",
      fullContent: `
        <h2>The Quantum AI Frontier</h2>
        <p>The convergence of quantum computing and artificial intelligence represents one of the most exciting frontiers in modern technology, promising to solve problems that are currently intractable.</p>
        
        <h3>Quantum Advantage</h3>
        <p>Quantum computers can process certain types of calculations exponentially faster than classical computers, making them ideal for complex AI algorithms that require massive parallel processing.</p>
        
        <h3>Current Applications</h3>
        <p>Early quantum AI applications include drug discovery, financial modeling, and optimization problems that would take classical computers years to solve.</p>
        
        <h3>Challenges Ahead</h3>
        <p>Quantum decoherence, error rates, and the need for extremely low temperatures remain significant challenges that researchers are actively working to overcome.</p>
        
        <h3>Future Possibilities</h3>
        <p>As quantum computers become more stable and accessible, we expect to see breakthroughs in climate modeling, cryptography, and artificial general intelligence.</p>
      `,
    },
  ];

  const blogPosts = [
    {
      title: "The Future of AI in Healthcare",
      excerpt:
        "Exploring how artificial intelligence is revolutionizing medical diagnosis and treatment with real-world case studies.",
      author: "Dr. Sarah Chen",
      date: "March 15, 2024",
      category: "Healthcare",
      readTime: "5 min read",
      views: "2.4k",
      likes: 124,
      comments: 23,
      image:
        "/tech-icons/b4.webp",
      fullContent: `
        <h2>AI Transforming Healthcare</h2>
        <p>Artificial Intelligence is revolutionizing healthcare in ways we never imagined possible. From early disease detection to personalized treatment plans, AI is becoming an indispensable tool for medical professionals.</p>
        
        <h3>Diagnostic Revolution</h3>
        <p>AI-powered diagnostic tools can now detect diseases like cancer, diabetes, and heart conditions with accuracy rates exceeding human specialists in many cases. Medical imaging analysis has particularly benefited from deep learning algorithms.</p>
        
        <h3>Personalized Medicine</h3>
        <p>Machine learning algorithms analyze patient data to create personalized treatment plans, considering genetic factors, lifestyle, and medical history to optimize outcomes.</p>
        
        <h3>Drug Discovery</h3>
        <p>AI is accelerating drug discovery processes that traditionally took decades, reducing development time from 10-15 years to potentially 3-5 years for certain treatments.</p>
        
        <h3>Challenges and Ethics</h3>
        <p>Despite the promise, healthcare AI faces challenges including data privacy, algorithmic bias, and the need for regulatory approval. Ensuring AI systems are transparent and accountable remains crucial.</p>
        
        <h3>Looking Forward</h3>
        <p>The future of AI in healthcare includes predictive health monitoring, AI-powered surgical robots, and virtual health assistants that could make healthcare more accessible globally.</p>
      `,
    },
    {
      title: "Machine Learning in Financial Services",
      excerpt:
        "How ML algorithms are transforming fraud detection and risk assessment in banking with cutting-edge techniques.",
      author: "Michael Rodriguez",
      date: "March 10, 2024",
      category: "Finance",
      readTime: "7 min read",
      views: "1.8k",
      likes: 98,
      comments: 15,
      image:
        "/tech-icons/s43.jfif",
      fullContent: `
        <h2>ML Revolution in Finance</h2>
        <p>Machine Learning is transforming the financial services industry, from fraud detection to algorithmic trading, creating more secure and efficient financial systems.</p>
        
        <h3>Fraud Detection</h3>
        <p>Advanced ML algorithms can detect fraudulent transactions in real-time by analyzing patterns and anomalies that would be impossible for humans to identify at scale.</p>
        
        <h3>Risk Assessment</h3>
        <p>ML models evaluate creditworthiness and investment risks by processing vast amounts of data, including traditional financial metrics and alternative data sources.</p>
        
        <h3>Algorithmic Trading</h3>
        <p>High-frequency trading algorithms use ML to make split-second decisions, analyzing market conditions and executing trades faster than human traders ever could.</p>
        
        <h3>Customer Experience</h3>
        <p>Chatbots and virtual assistants powered by natural language processing are revolutionizing customer service in banking, providing 24/7 support and personalized recommendations.</p>
      `,
    },
    {
      title: "Computer Vision Applications in Manufacturing",
      excerpt:
        "Real-world applications of computer vision for quality control and automation in modern manufacturing.",
      author: "Dr. James Wilson",
      date: "March 5, 2024",
      category: "Manufacturing",
      readTime: "6 min read",
      views: "3.1k",
      likes: 156,
      comments: 31,
      image:
        "/tech-icons/b5.jpg",
      fullContent: `
        <h2>Computer Vision in Manufacturing</h2>
        <p>Computer vision technology is revolutionizing manufacturing processes, enabling unprecedented levels of quality control and automation efficiency.</p>
        
        <h3>Quality Control Revolution</h3>
        <p>AI-powered visual inspection systems can detect defects smaller than the human eye can see, ensuring product quality while reducing waste and improving efficiency.</p>
        
        <h3>Predictive Maintenance</h3>
        <p>Computer vision systems monitor equipment health in real-time, predicting failures before they occur and scheduling maintenance to minimize downtime.</p>
        
        <h3>Safety Enhancement</h3>
        <p>Vision systems monitor workplace safety, detecting when workers enter dangerous areas or fail to wear proper protective equipment.</p>
        
        <h3>Process Optimization</h3>
        <p>Real-time analysis of manufacturing processes allows for immediate adjustments to optimize efficiency and reduce waste.</p>
      `,
    },
    {
      title: "Natural Language Processing Breakthroughs",
      excerpt:
        "Latest advances in NLP and their impact on conversational AI systems and human-computer interaction.",
      author: "Emily Zhang",
      date: "February 28, 2024",
      category: "Technology",
      readTime: "8 min read",
      views: "2.7k",
      likes: 203,
      comments: 45,
      image:
        "/tech-icons/b6.jpg",
      fullContent: `
        <h2>NLP Breakthroughs Reshaping AI</h2>
        <p>Natural Language Processing has reached new heights with transformer architectures and large language models, fundamentally changing how computers understand and generate human language.</p>
        
        <h3>Transformer Revolution</h3>
        <p>The attention mechanism in transformer models has enabled AI systems to understand context and nuance in ways that were previously impossible.</p>
        
        <h3>Multimodal Understanding</h3>
        <p>Modern NLP systems can now process text alongside images, audio, and video, creating more comprehensive understanding of content.</p>
        
        <h3>Real-world Applications</h3>
        <p>From customer service chatbots to content generation and translation services, NLP breakthroughs are being deployed across industries.</p>
        
        <h3>Ethical Considerations</h3>
        <p>As NLP systems become more powerful, questions about bias, misinformation, and responsible AI development become increasingly important.</p>
      `,
    },
    {
      title: "Ethical AI Development",
      excerpt:
        "Building responsible AI systems that benefit society and respect privacy while maintaining innovation.",
      author: "Dr. Robert Kim",
      date: "February 20, 2024",
      category: "Ethics",
      readTime: "10 min read",
      views: "1.9k",
      likes: 87,
      comments: 28,
      image:
        "/tech-icons/b7.webp",
      fullContent: `
        <h2>Building Ethical AI Systems</h2>
        <p>As AI becomes more prevalent in society, the importance of developing ethical, transparent, and accountable AI systems cannot be overstated.</p>
        
        <h3>Core Principles</h3>
        <p>Ethical AI development centers around fairness, transparency, accountability, and respect for human autonomy and privacy.</p>
        
        <h3>Bias Mitigation</h3>
        <p>Identifying and reducing algorithmic bias requires diverse teams, comprehensive testing, and ongoing monitoring of AI system outputs.</p>
        
        <h3>Privacy Protection</h3>
        <p>Implementing privacy-preserving techniques like differential privacy and federated learning helps protect user data while enabling AI innovation.</p>
        
        <h3>Regulatory Landscape</h3>
        <p>Governments worldwide are developing AI governance frameworks to ensure responsible development and deployment of AI technologies.</p>
      `,
    },
    {
      title: "AI-Powered Automation Success Stories",
      excerpt:
        "Case studies of successful AI implementations across various industries with measurable results.",
      author: "Lisa Thompson",
      date: "February 15, 2024",
      category: "Case Studies",
      readTime: "9 min read",
      views: "2.2k",
      likes: 134,
      comments: 19,
      image:
        "/tech-icons/b8.jfif",
      fullContent: `
        <h2>AI Automation Success Stories</h2>
        <p>Real-world case studies demonstrate how AI-powered automation is delivering tangible benefits across diverse industries.</p>
        
        <h3>Retail Revolution</h3>
        <p>Major retailers have implemented AI for inventory management, demand forecasting, and personalized recommendations, resulting in 15-30% increases in efficiency.</p>
        
        <h3>Manufacturing Excellence</h3>
        <p>Automotive manufacturers using AI for predictive maintenance have reduced downtime by up to 50% while improving product quality.</p>
        
        <h3>Healthcare Transformation</h3>
        <p>Hospitals using AI for patient flow optimization have reduced wait times by 40% and improved patient satisfaction scores significantly.</p>
        
        <h3>Lessons Learned</h3>
        <p>Successful AI implementations require clear objectives, quality data, stakeholder buy-in, and continuous monitoring and improvement.</p>
      `,
    },
  ];

  if (selectedBlog !== null) {
    const blog =
      selectedBlog < 0
        ? featuredPosts[Math.abs(selectedBlog) - 1]
        : blogPosts[selectedBlog];

    return (
      <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Back Button - Mobile optimized */}
          <button
            onClick={() => setSelectedBlog(null)}
            className="flex items-center gap-2 mb-6 px-4 py-2 md:px-6 md:py-3 bg-white rounded-full shadow-md md:shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] font-semibold border text-sm md:text-base"
            style={{
              borderColor: colors.primaryHex,
              color: colors.primaryHex,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primaryHex;
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = colors.primaryHex;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = colors.primaryHex;
              e.currentTarget.style.borderColor = colors.primaryHex;
            }}
          >
            <ArrowLeft
              className="h-4 w-4 md:h-5 md:w-5"
              style={{ stroke: colors.primaryHex }}
            />
            Back to Blog
          </button>

          {/* Blog Header */}
          <div
            className="bg-white rounded-xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl mb-6 md:mb-8 border-2"
            style={{ borderColor: colors.primaryHex }}
          >
            <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 text-white">
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4 leading-tight"
                  style={{ color: colors.primaryHex }}
                >
                  {blog.title}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-white/90 text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                    <span className="font-medium">{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>{blog.date}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Actions - Responsive layout */}
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 sm:gap-6">
                  <button
                    onClick={(e) => toggleLike(selectedBlog, e)}
                    className="flex items-center gap-1 sm:gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Heart
                      className={`h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 ${
                        likedPosts.has(selectedBlog)
                          ? "text-red-500 fill-red-500"
                          : "text-gray-400 hover:text-red-400"
                      }`}
                    />
                    <span className="text-gray-600 font-medium text-sm sm:text-base">
                      {(blog.likes || 0) +
                        (likedPosts.has(selectedBlog) ? 1 : 0)}
                    </span>
                  </button>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <span className="text-gray-600 font-medium text-sm sm:text-base">
                      {blog.comments || 0}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <span className="text-gray-600 font-medium text-sm sm:text-base">
                      {blog.views || "1.2k"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={(e) => toggleBookmark(selectedBlog, e)}
                    className="p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Bookmark
                      className={`h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 ${
                        bookmarkedPosts.has(selectedBlog)
                          ? `text-[${colors.primaryHex}] fill-[${colors.primaryHex}]`
                          : "text-gray-400 hover:text-[${colors.primaryHex}]"
                      }`}
                      style={{
                        color: bookmarkedPosts.has(selectedBlog)
                          ? colors.primaryHex
                          : undefined,
                        fill: bookmarkedPosts.has(selectedBlog)
                          ? colors.primaryHex
                          : undefined,
                      }}
                    />
                  </button>
                  <button className="p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Share2
                      className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-primary transition-colors"
                      style={{ color: colors.primaryHex }}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Content */}
            <div className="p-4 sm:p-6 md:p-8">
              <div
                className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.fullContent }}
              />
            </div>
          </div>

          {/* Related Posts */}
          <div
            className="bg-white rounded-xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-md md:shadow-lg border-2"
            style={{ borderColor: colors.primaryHex }}
          >
            <h3
              className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6"
              style={{ color: colors.primaryHex }}
            >
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {blogPosts.slice(0, 2).map((post, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedBlog(index)}
                  className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl md:rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group border"
                  style={{ borderColor: colors.primaryHex }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg md:rounded-xl object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1">
                    <h4
                      className="font-semibold text-sm sm:text-base line-clamp-2 transition-colors"
                      style={{ color: colors.primaryHex }}
                    >
                      {post.title}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1">
                      {post.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        {/* Header Section - Responsive text sizes */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ willChange: "transform" }}
          className="text-center mb-10 sm:mb-14 md:mb-16"
        >
          <div className="pb-4 sm:pb-5">
            <h1
              className="text-5xl lg:text-6xl font-bold leading-tight"
              style={{ color: colors.primaryHex }}
            >
              AI Insights Blog
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Stay updated with the latest trends, insights, and breakthroughs in
            artificial intelligence and machine learning from our team of
            experts.
          </p>
        </motion.div>

        {/* Featured Post Slider - Responsive height */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mb-10 sm:mb-14 md:mb-16"
        >
          <div
            className="bg-white rounded-xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl border-2"
            style={{ borderColor: colors.primaryHex }}
          >
            <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
              <img
                src={featuredPosts[currentSlide].image}
                alt={featuredPosts[currentSlide].title}
                className="w-full h-full object-cover transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

              <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex items-center">
                <div className="max-w-2xl text-white">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <span
                      className="px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold self-start"
                      style={{ backgroundColor: colors.primaryHex }}
                    >
                      ⭐ Featured
                    </span>
                    <div className="flex space-x-2 items-center">
                      {featuredPosts.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                            currentSlide === index
                              ? "bg-white scale-125"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight"
                    style={{ color: colors.primaryHex }}
                  >
                    {featuredPosts[currentSlide].title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-white/90 leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {featuredPosts[currentSlide].excerpt}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-4 sm:mb-6 text-sm sm:text-base">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="font-medium">
                        {featuredPosts[currentSlide].author}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>{featuredPosts[currentSlide].date}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedBlog(-(currentSlide + 1))}
                    className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-4 text-white font-medium sm:font-bold rounded-full hover:bg-secondary transition-all duration-300 transform hover:scale-[1.02] shadow hover:shadow-md group border border-1 sm:border-2 border-white text-xs sm:text-sm md:text-base whitespace-nowrap"
                    style={{ backgroundColor: colors.primaryHex }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        colors.secondaryHex;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primaryHex;
                    }}
                  >
                    Read Full Article
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid - Responsive columns */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8"
        >
          {blogPosts.map((post, index) => (
            <article
              key={index}
              onClick={() => setSelectedBlog(index)}
              className="bg-white rounded-xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 cursor-pointer group border-2 sm:border-4"
              style={{ borderColor: colors.primaryHex, position: "relative" }}
            >
              {/* Overlay with pointer-events-none so clicks pass through */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500 z-10 pointer-events-none"
                style={{ backgroundColor: `${colors.primaryHex}40` }}
              ></div>

              <div className="relative overflow-hidden z-20">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-30">
                  <span
                    className="cursor-pointer px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold backdrop-blur-sm border transition-colors duration-300"
                    style={{
                      backgroundColor: colors.secondaryHex,
                      color: colors.primaryHex,
                      borderColor: colors.primaryHex,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Clicked category: ${post.category}`);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.backgroundColor = colors.primaryHex;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.primaryHex;
                      e.currentTarget.style.backgroundColor =
                        colors.secondaryHex;
                    }}
                  >
                    {post.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30">
                  <button
                    onClick={(e) => toggleBookmark(index, e)}
                    className={`p-1 sm:p-2 rounded-full transition-colors duration-300 ${
                      bookmarkedPosts.has(index)
                        ? `bg-[${colors.primaryHex}] hover:bg-[${colors.secondaryHex}]`
                        : "bg-white/90 hover:bg-white"
                    }`}
                    style={{ border: "none" }}
                  >
                    <Bookmark
                      className={`h-3 w-3 sm:h-4 sm:w-4 transition-colors ${
                        bookmarkedPosts.has(index)
                          ? "text-white fill-white"
                          : `text-gray-600 hover:text-[${colors.primaryHex}] hover:fill-[${colors.primaryHex}]`
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-5 md:p-6 relative z-20">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-gray-500 text-xs sm:text-sm font-medium">
                    {post.readTime}
                  </span>
                  <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                    {post.views}
                  </div>
                </div>

                <h3
                  className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 transition-colors duration-300 line-clamp-2"
                  style={{ color: colors.primaryHex }}
                >
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-3 leading-relaxed text-sm sm:text-base">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: colors.primaryHex }}
                    >
                      <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-900">
                        {post.author}
                      </p>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4">
                    <button
                      onClick={(e) => toggleLike(index, e)}
                      className="flex items-center gap-1 hover:scale-110 transition-transform"
                    >
                      <Heart
                        className={`h-3 w-3 sm:h-4 sm:w-4 transition-colors ${
                          likedPosts.has(index)
                            ? "text-red-500 fill-red-500"
                            : "text-gray-400 hover:text-red-400"
                        }`}
                      />
                      <span className="text-xs sm:text-sm text-gray-500">
                        {post.likes + (likedPosts.has(index) ? 1 : 0)}
                      </span>
                    </button>

                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                      <span className="text-xs sm:text-sm text-gray-500">
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </motion.div>

        {/* Newsletter Section - Responsive padding and text */}
        <div className="relative mt-12 sm:mt-16 md:mt-20">
          <div
            className="rounded-xl md:rounded-3xl p-6 sm:p-8 md:p-12 text-white text-center relative overflow-hidden shadow-lg md:shadow-xl border-2"
            style={{
              backgroundColor: colors.secondaryHex,
              borderColor: colors.primaryHex,
            }}
          >
            <div className="absolute inset-0">
              <img
                src="/tech-icons/b9.avif"
                alt="Newsletter background"
                className="w-full h-full object-cover opacity-20"
              />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Stay in the AI Loop
              </h3>
              <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-white/80 max-w-2xl mx-auto">
                Get the latest AI insights, research breakthroughs, and industry
                trends delivered straight to your inbox every week.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 sm:px-6 sm:py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-white/30 text-sm sm:text-base"
                />
                <button
                  className="px-5 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4 rounded-full font-bold hover:bg-white hover:text-secondary transition-colors shadow-md hover:shadow-lg transform hover:scale-[1.02] duration-300 border-2 border-white text-sm sm:text-base"
                  style={{ backgroundColor: colors.primaryHex, color: "white" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = colors.secondaryHex;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primaryHex;
                    e.currentTarget.style.color = "white";
                  }}
                >
                  Subscribe Now
                </button>
              </div>
              <p className="text-xs sm:text-sm text-white/80 mt-3 sm:mt-4">
                Join 10,000+ AI professionals and enthusiasts. Unsubscribe
                anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
