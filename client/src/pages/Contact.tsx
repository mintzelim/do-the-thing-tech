import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { updateMetaTags, pageMetaTags } from "@/lib/metaTags";
import { SITE_IDENTITY } from "@/lib/siteIdentity";
import "../pixel-art-refined.css";
import "../utility-pages.css";

type ContactType = "question" | "partnership" | "bug";

export default function Contact() {
  const [, navigate] = useLocation();

  useEffect(() => {
    updateMetaTags(pageMetaTags.contact);
  }, []);

  const [formData, setFormData] = useState({ name: "", email: "", type: "question" as ContactType, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactMutation = trpc.contact.submit.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    try {
      await contactMutation.mutateAsync(formData);
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", type: "question", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mobile-frame utility-page">
      <Navigation />
      <main className="utility-shell">
        <div className="utility-hero">
          <button onClick={() => navigate("/")} className="utility-back">BACK</button>
          <h1 className="utility-title">CONTACT US</h1>
        </div>

        <div className="utility-intro">
          <p>Have questions, partnership ideas, or found a bug? We'd love to hear from you!</p>
        </div>

        <form onSubmit={handleSubmit} className="utility-contact-form">
          <div>
            <label>YOUR NAME</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="mobile-input" disabled={isSubmitting} />
          </div>
          <div>
            <label>YOUR EMAIL</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="mobile-input" disabled={isSubmitting} />
          </div>
          <div>
            <label>WHAT'S THIS ABOUT?</label>
            <select name="type" value={formData.type} onChange={handleChange} className="mobile-input" disabled={isSubmitting}>
              <option value="question">Question</option>
              <option value="partnership">Partnership</option>
              <option value="bug">Bug Report</option>
            </select>
          </div>
          <div>
            <label>YOUR MESSAGE</label>
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us what's on your mind..." className="mobile-textarea" disabled={isSubmitting} />
          </div>
          <button type="submit" className="utility-submit" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}>
            {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
          </button>
        </form>

        <div className="utility-contact-details">
          <p><strong>{SITE_IDENTITY.name}</strong> is an online-only task-breakdown service for people with ADHD and executive-function friction.</p>
          <p>{SITE_IDENTITY.ownershipStatement}</p>
          <p>📧 Email: <a href={`mailto:${SITE_IDENTITY.supportEmail}`}>{SITE_IDENTITY.supportEmail}</a></p>
          <p>☎ Phone: <a href={SITE_IDENTITY.telephoneHref}>{SITE_IDENTITY.telephone}</a></p>
          <address>📍 Address: {SITE_IDENTITY.addressLine}</address>
          <p><small>{SITE_IDENTITY.productReviewedLabel}</small></p>
          <p>We typically respond within 24 hours.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
