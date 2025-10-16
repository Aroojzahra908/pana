import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  X,
  User,
  Mail,
  Phone,
  Upload,
  CheckCircle,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import colors from "../components/colors";
import supabase from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";

const ApplicationModal = ({ job, onClose, isGeneral, firstName, setFirstName, lastName, setLastName, email, setEmail, phone, setPhone, linkedIn, setLinkedIn, coverLetter, setCoverLetter, resumeFileName, handleFileChange, handleSubmit, isSubmitting }: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: colors.primaryHex }}
          >
            {isGeneral ? "General Application" : `Apply for ${job?.title}`}
          </h2>
          {!isGeneral && (
            <p className="text-gray-600">
              {job?.department} • {job?.location}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close application form"
        >
          <X size={24} />
        </button>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <div className="relative">
              <User
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="firstName"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="John"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <div className="relative">
              <User
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="lastName"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Doe"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="john.doe@email.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Profile
          </label>
          <input
            type="url"
            name="linkedIn"
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resume/CV *
          </label>
          <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-cyan-500 transition-colors cursor-pointer block">
            <Upload size={32} className="mx-auto text-gray-400 mb-2" />
            {resumeFileName ? (
              <p className="text-gray-600 mb-1">{resumeFileName}</p>
            ) : (
              <>
                <p className="text-gray-600 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  PDF, DOC, DOCX (max 10MB)
                </p>
              </>
            )}
            <input
              type="file"
              name="resume"
              className="hidden"
              accept=".pdf,.doc,.docx"
              required
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Letter
          </label>
          <textarea
            name="coverLetter"
            rows={6}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
            placeholder="Tell us why you're interested in this role and what makes you a great fit..."
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            type="button"
            onClick={async (ev) => { ev.preventDefault(); console.log('Careers: submit button clicked'); await handleSubmit(); }}
            className="flex-1 text-white px-8 py-4 rounded-xl font-semibold shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-105 hover:opacity-90"
            style={{ backgroundColor: colors.primaryHex }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : (<>
              Submit Application
              <ArrowRight size={18} className="ml-2" />
            </>)}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium flex items-center justify-center transition-colors transition-transform duration-300 hover:bg-white hover:text-[color:var(--primaryHex)] hover:scale-105 hover:opacity-90"
            style={{ transition: "color 0.3s, background-color 0.3s" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.white;
              e.currentTarget.style.color = colors.primaryHex;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "";
              e.currentTarget.style.color = "";
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  </motion.div>
);

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [showApplication, setShowApplication] = useState(false);
  const [isGeneralApplication, setIsGeneralApplication] = useState(false);
  const [resumeFileName, setResumeFileName] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // controlled form fields to prevent unexpected resets
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  // Scroll to top on initial mount and when selectedJob or showApplication change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedJob, showApplication]);

  // Debug: log when modal visibility changes and when form state updates
  useEffect(() => {
    console.log("Careers: showApplication =", showApplication, "selectedJob =", selectedJob?.id ?? null);
  }, [showApplication, selectedJob]);

  useEffect(() => {
    console.log("Careers form state:", { firstName, lastName, email, phone, linkedIn, coverLetter, resumeFileName });
  }, [firstName, lastName, email, phone, linkedIn, coverLetter, resumeFileName]);

  const jobs = [
    {
      id: 1,
      title: "SEO Intern",
      department: "Marketing",
      location: "Remote / Hybrid",
      type: "Internship",
      salary: "XXXX",
      description:
        "Learn and implement SEO strategies to improve our online presence and search rankings.",
      responsibilities: [
        "Conduct keyword research and analysis",
        "Optimize website content for search engines",
        "Assist with link building strategies",
        "Track and report on SEO performance metrics",
        "Stay updated with SEO trends and algorithm changes",
      ],
      requirements: [
        "Currently pursuing or recently completed degree in Marketing or related field",
        "Basic understanding of SEO principles",
        "Familiarity with SEO tools (Google Analytics, Search Console)",
        "Strong written communication skills",
        "Eagerness to learn and grow in digital marketing",
      ],
      image:
      "/tech-icons/c3.jpg",
    },
    {
      id: 2,
      title: "Web Development Intern",
      department: "Development",
      location: "Remote / Hybrid",
      type: "Internship",
      salary: "XXXX",
      description:
        "Gain hands-on experience in web development while contributing to real projects.",
      responsibilities: [
        "Assist in developing and maintaining websites",
        "Implement responsive designs",
        "Debug and fix frontend issues",
        "Collaborate with designers and backend developers",
        "Learn and apply best coding practices",
      ],
      requirements: [
        "Basic knowledge of HTML, CSS, and JavaScript",
        "Familiarity with React or similar frameworks",
        "Understanding of responsive design principles",
        "Problem-solving attitude",
        "Willingness to learn new technologies",
      ],
      image:
        "/tech-icons/c4.jpg",
    },
    {
      id: 3,
      title: "Python Intern",
      department: "Development",
      location: "Remote / Hybrid",
      type: "Internship",
      salary: "XXXX",
      description:
        "Work with our development team to build and maintain Python applications.",
      responsibilities: [
        "Write clean, efficient Python code",
        "Assist in developing backend services",
        "Participate in code reviews",
        "Help with testing and debugging",
        "Learn about software development lifecycle",
      ],
      requirements: [
        "Basic understanding of Python programming",
        "Familiarity with Django/Flask is a plus",
        "Knowledge of databases and SQL",
        "Strong problem-solving skills",
        "Eagerness to learn and grow as a developer",
      ],
      image:
        "/tech-icons/c5.jpg",
    },
    {
      id: 4,
      title: "Graphic Designer",
      department: "Design",
      location: "Remote / Hybrid",
      type: "Full-time",
      salary: "XXXX",
      description:
        "Create visually stunning designs that communicate our brand message effectively.",
      responsibilities: [
        "Design marketing materials and digital assets",
        "Create social media graphics",
        "Develop brand identities and style guides",
        "Collaborate with marketing team",
        "Maintain design consistency across all platforms",
      ],
      requirements: [
        "Proficiency in Adobe Creative Suite",
        "Strong portfolio showcasing design skills",
        "Understanding of design principles",
        "Ability to work with brand guidelines",
        "Excellent communication and time management skills",
      ],
      image:
        "/tech-icons/c6.webp",
    },
  ];

  const benefits = [
    "Competitive salary and equity packages",
    "Comprehensive health, dental, and vision coverage",
    "Flexible remote work options worldwide",
    "Annual learning and development budget ($5,000)",
    "Cutting-edge hardware and development tools",
    "Annual team retreats and conferences",
    "Unlimited PTO and flexible working hours",
    "Stock options and performance bonuses",
  ];

  const handleSubmit = async (e?: any) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    console.log("Careers: handleSubmit called (controlled state)");

    const first = firstName.trim();
    const last = lastName.trim();
    const mail = email.trim();
    const phoneVal = phone.trim();
    const linked = linkedIn.trim();
    const cover = coverLetter.trim();

    if (!first || !last || !mail) {
      console.log("Careers: validation failed - missing name/email");
      toast({ title: "Validation", description: "First name, last name and email are required." });
      return;
    }

    if (!resumeFile && !resumeFileName) {
      console.log("Careers: validation failed - missing resume");
      toast({ title: "Validation", description: "Please attach your resume (PDF/DOC) before submitting." });
      return;
    }

    if (!import.meta.env.VITE_SUPABASE_URL) {
      console.log("Careers: missing SUPABASE_URL env");
      toast({ title: "Config", description: "Missing SUPABASE_URL" });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = [{
        first_name: first,
        last_name: last,
        email: mail,
        phone: phoneVal || null,
        linkedin: linked || null,
        resume_file_name: resumeFileName || null,
        cover_letter: cover || null,
        position: isGeneralApplication ? "General Application" : selectedJob?.title || null,
        job_id: isGeneralApplication ? null : selectedJob?.id || null,
        created_at: new Date().toISOString(),
      }];

      console.log("Careers: inserting payload", payload);
      const res = await supabase.insertInto("job_applications", payload);
      console.log("Careers: insert result", res);

      toast({ title: "Application submitted", description: "We'll review your application shortly." });

      // reset modal state
      setShowApplication(false);
      setSelectedJob(null);
      setIsGeneralApplication(false);
      setResumeFileName("");
      setResumeFile(null);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setLinkedIn("");
      setCoverLetter("");
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast({ title: "Error", description: error?.message || "Failed to submit application." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFileName(file.name);
      setResumeFile(file);
    }
  };

  // JobModal is defined here so it has access to benefits and colors
  const JobModal = ({ job, onClose, onApply }: any) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
          <div className="flex-1 flex items-center gap-4 flex-wrap">
            <img
              src={job.image}
              alt={job.title}
              className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
            />
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ color: colors.primaryHex }}>
                {job.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1"><Briefcase size={16} />{job.department}</span>
                <span className="flex items-center gap-1"><MapPin size={16} />{job.location}</span>
                <span className="flex items-center gap-1"><Clock size={16} />{job.type}</span>
                <span className="font-semibold" style={{ color: colors.primaryHex }}>{job.salary}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors ml-4" aria-label="Close job details modal"><X size={24} /></button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.primaryHex }}>Job Description</h3>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.primaryHex }}>Key Responsibilities</h3>
              <ul className="space-y-3">
                {job.responsibilities.map((resp: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3" style={{ color: colors.secondaryHex }}>
                    <CheckCircle size={20} className="mt-0.5 flex-shrink-0" style={{ color: `rgb(${colors.primaryRgb})` }} />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.primaryHex }}>Requirements</h3>
              <ul className="space-y-3">
                {job.requirements.map((req: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3" style={{ color: colors.secondaryHex }}>
                    <CheckCircle size={20} className="mt-0.5 flex-shrink-0" style={{ color: `rgb(${colors.primaryRgb})` }} />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.primaryHex }}>Quick Apply</h3>
              <p className="text-gray-600 mb-6 text-sm">Ready to join our team? Submit your application now and we'll get back to you within 48 hours.</p>
              <button onClick={onApply} className="px-8 py-4 rounded-xl font-semibold shadow-lg transition-transform duration-300 hover:scale-105 hover:opacity-90 flex items-center justify-center text-white" style={{ backgroundColor: colors.primaryHex }}>
                Apply Now
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
            <div className="bg-cyan-50 rounded-2xl p-6" style={{ color: colors.secondaryHex }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.secondaryHex }}>What We Offer</h3>
              <ul className="space-y-2 text-sm">
                {benefits.slice(0, 4).map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2"><CheckCircle size={16} style={{ color: `rgb(${colors.primaryRgb})` }} />{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-24 overflow-hidden mt-16">
        <div className="absolute inset-0">
          <img src="/tech-icons/c1.jfif" alt="Join Our Team" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(44,61,79,0.9), rgba(0,180,187,0.8))" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6" style={{ color: colors.white }}>Join Our Team</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-80 text-center" style={{ color: colors.white }}>
              Help us shape the future of artificial intelligence. We're looking for passionate individuals who want to make a meaningful impact through innovative AI solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-bold mb-6"><span style={{ color: colors.primaryHex }}>Why work </span><span style={{ color: colors.secondaryHex }}>with us?</span></h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: colors.secondaryHex }}>At Panabotics, you'll work alongside brilliant minds on projects that push the boundaries of what's possible with AI. We foster a culture of innovation, learning, and collaboration where your ideas can truly make an impact.</p>
              <div className="grid sm:grid-cols-2 gap-4">{benefits.map((benefit, index) => (<div key={index} className="flex items-center gap-3" style={{ color: colors.secondaryHex }}><CheckCircle size={18} className="flex-shrink-0" style={{ color: `rgb(${colors.primaryRgb})` }} /><span className="text-sm">{benefit}</span></div>))}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="relative">
              <img src="/tech-icons/c2.jfif" alt="Team collaboration" className="rounded-2xl shadow-2xl w-full max-w-xl mx-auto" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primaryHex }}>Internship &amp; Job Opportunities</h2>
            <p style={{ color: colors.secondaryHex }}>Discover exciting opportunities to advance your career in AI</p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{jobs.map((job, index) => (
            <motion.div key={job.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="bg-white rounded-2xl shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer hover:shadow-[0_8px_24px_rgba(0,180,187,0.4)]" onClick={() => setSelectedJob(job)}>
              <div className="relative h-48 overflow-hidden">
                <img src={job.image} alt={job.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white"><span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: colors.primaryHex }}>{job.department}</span></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-500 transition-colors" style={{ color: colors.secondaryHex }}>{job.title}</h3>
                <p className="mb-4 text-sm line-clamp-2" style={{ color: colors.secondaryHex }}>{job.description}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs mb-4" style={{ color: colors.secondaryHex }}>
                  <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{job.type}</span>
                </div>
                <div className="flex items-center justify-between"><span className="font-semibold" style={{ color: colors.primaryHex }}>{job.salary}</span><ArrowRight size={18} className="text-gray-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" /></div>
              </div>
            </motion.div>
          ))}</div>
        </div>
      </section>

      {/* Don't See Your Role */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto bg-white rounded-3xl p-12 shadow-lg">
            <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primaryHex }}>Don't See Your Role?</h2>
            <p className="mb-8 leading-relaxed" style={{ color: colors.secondaryHex }}>We're always looking for talented individuals who share our passion for AI. Send us your resume and let's explore opportunities together. We believe great talent comes in many forms.</p>

            <button onClick={() => { setIsGeneralApplication(true); setShowApplication(true); }} className="px-8 py-4 rounded-xl font-semibold shadow-lg transition-transform duration-300 hover:scale-105 hover:opacity-90 text-white mx-auto flex items-center" style={{ backgroundColor: colors.primaryHex }}>
              Send General Application
              <ArrowRight size={18} className="ml-2" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      {selectedJob && !showApplication && (
        <JobModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={() => { setIsGeneralApplication(false); setShowApplication(true); }}
        />
      )}

      {showApplication && (
        <ApplicationModal
          job={selectedJob}
          isGeneral={isGeneralApplication}
          onClose={() => {
            setShowApplication(false);
            setSelectedJob(null);
            setIsGeneralApplication(false);
            setResumeFileName("");
            setResumeFile(null);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setLinkedIn("");
            setCoverLetter("");
          }}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          linkedIn={linkedIn}
          setLinkedIn={setLinkedIn}
          coverLetter={coverLetter}
          setCoverLetter={setCoverLetter}
          resumeFileName={resumeFileName}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default Careers;
