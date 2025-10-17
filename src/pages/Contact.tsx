import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";
import colors from "../components/colors";
import supabase from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
};

type FormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
};

const Contact = () => {
  const location = useLocation();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("animate-fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((element, index) => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.opacity = "0";
      htmlElement.style.transform = "translateY(30px)";
      htmlElement.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      elements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.opacity = "";
        htmlElement.style.transform = "";
        htmlElement.style.transition = "";
        htmlElement.classList.remove("animate-fade-in");
      });
    };
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) newErrors.phone = "Please enter a valid phone number";

    if (!formData.company.trim()) newErrors.company = "Company name is required";
    if (!formData.service) newErrors.service = "Please select a service";

    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 20) newErrors.message = "Please provide more details (at least 20 characters)";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.keys(newErrors)[0] as keyof FormErrors;
      const element = document.getElementById(firstError as string);
      if (element) element.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }

    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (errors[id as keyof FormErrors]) setErrors((prev) => ({ ...prev, [id]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!import.meta.env.VITE_SUPABASE_URL) {
      toast({ title: "Config", description: "Missing SUPABASE_URL" });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = [{
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        service: formData.service,
        message: formData.message.trim(),
        created_at: new Date().toISOString(),
      }];

      await supabase.insertInto("contact_messages", payload);
      toast({ title: "Message sent", description: "We'll get back to you soon." });

      setFormData({ firstName: "", lastName: "", email: "", phone: "", company: "", service: "", message: "" });
    } catch (err: any) {
      console.error("contact submit error:", err);
      toast({ title: "Error", description: err?.message || "Failed to send your message." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ willChange: "transform", color: colors.primaryHex }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Get In Touch
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            Ready to transform your business with AI? Let's discuss your project
            and explore how our innovative solutions can drive your success.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 transition-shadow duration-300 hover:shadow-[0_8px_24px_-4px_rgba(0,180,187,0.4)]"
          >
            <h2
              className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
              style={{ color: colors.primaryHex }}
            >
              Send us a message
            </h2>
            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { id: "firstName", label: "First Name", placeholder: "John", required: true },
                  { id: "lastName", label: "Last Name", placeholder: "Doe", required: true },
                ].map(({ id, label, placeholder, required }) => (
                  <div key={id}>
                    <label
                      htmlFor={id}
                      className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                    >
                      {label} {required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="text"
                      id={id}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border ${
                        errors[id] ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-[rgba(0,180,187,0.5)] focus:border-transparent transition-colors`}
                      placeholder={placeholder}
                      value={formData[id as keyof FormData]}
                      onChange={handleChange}
                    />
                    {errors[id] && (
                      <p className="mt-1 text-sm text-red-600">{errors[id]}</p>
                    )}
                  </div>
                ))}
              </div>

              {[
                {
                  id: "email",
                  label: "Email Address",
                  type: "email",
                  placeholder: "john@company.com",
                  required: true,
                },
                {
                  id: "phone",
                  label: "Phone Number",
                  type: "tel",
                  placeholder: "+1 (555) 123-4567",
                  required: true,
                },
                {
                  id: "company",
                  label: "Company",
                  type: "text",
                  placeholder: "Your Company Name",
                  required: true,
                },
              ].map(({ id, label, type, placeholder, required }) => (
                <div key={id}>
                  <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                  >
                    {label} {required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type={type}
                    id={id}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border ${
                      errors[id] ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-[rgba(0,180,187,0.5)] focus:border-transparent transition-colors`}
                    placeholder={placeholder}
                    value={formData[id as keyof FormData]}
                    onChange={handleChange}
                  />
                  {errors[id] && (
                    <p className="mt-1 text-sm text-red-600">{errors[id]}</p>
                  )}
                </div>
              ))}

              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                >
                  Service Interest <span className="text-red-500">*</span>
                </label>
                <select
                  id="service"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border ${
                    errors.service ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-[rgba(0,180,187,0.5)] focus:border-transparent transition-colors`}
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  <option value="ai">Artificial Intelligence</option>
                  <option value="ml">Machine Learning</option>
                  <option value="cv">Computer Vision</option>
                  <option value="analytics">Data Analytics</option>
                  <option value="automation">Automation</option>
                  <option value="consulting">AI Consulting</option>
                </select>
                {errors.service && (
                  <p className="mt-1 text-sm text-red-600">{errors.service}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-[rgba(0,180,187,0.5)] focus:border-transparent transition-colors resize-none`}
                  placeholder="Tell us about your project, goals, and requirements..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: colors.primaryHex,
                  color: colors.white,
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <h2
                className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
                style={{ color: colors.primaryHex }}
              >
                Contact Information
              </h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                Have questions? We'd love to hear from you. Choose the best way
                to reach out to our team.
              </p>
            </div>

            {[
              {
                icon: Mail,
                title: "Email",
                subtitle: "Send us an email anytime",
                contact: "info@panabotics.com",
                href: "mailto:info@panabotics.com",
              },
              {
                icon: Phone,
                title: "Phone",
                subtitle: "Call us during business hours",
                contact: "+92 (315) 330-7820",
                href: "tel:+923153307820",
              },
              {
                icon: MapPin,
                title: "Office",
                subtitle: "Visit our headquarter",
                contact: (
                  <>
                    Model Town
                    <br />
                    Near Ittefaq Hospital
                    <br />
                    Lahore, Pakistan
                  </>
                ),
                href: null,
              },
              {
                icon: Clock,
                title: "Business Hours",
                subtitle: "We're here when you need us",
                contact: (
                  <>
                    Monday - Friday: 9:00 AM - 6:00 PM PST
                    <br />
                    Saturday - Sunday: On-call support
                  </>
                ),
                href: null,
              },
            ].map(({ icon: Icon, title, subtitle, contact, href }, i) => (
              <div
                key={i}
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl transition-shadow duration-300 hover:shadow-[0_8px_24px_-4px_rgba(0,180,187,0.15)]"
              >
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `rgba(${colors.primaryRgb}, 0.9)` }}
                >
                  <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                    {title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-1 sm:mb-2">
                    {subtitle}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="font-medium hover:underline text-sm sm:text-base"
                      style={{ color: colors.primaryHex }}
                    >
                      {contact}
                    </a>
                  ) : (
                    <p className="text-gray-600 text-sm sm:text-base">
                      {contact}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* CTA Section */}
            <div
              className="rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white transition-shadow duration-300 hover:shadow-[0_8px_24px_-4px_rgba(0,180,187,0.3)]"
              style={{ backgroundColor: colors.primaryHex }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                Ready to Get Started?
              </h3>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                Schedule a free consultation to discuss your AI project and
                discover how we can help you achieve your goals.
              </p>
              <button
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-[1.02] hover:opacity-100 text-sm sm:text-base"
                style={{
                  backgroundColor: colors.white,
                  color: colors.primaryHex,
                }}
              >
                Send us a message
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
