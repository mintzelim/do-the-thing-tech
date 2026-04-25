import { useState } from "react";
import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import "../pixel-art-refined.css";

type ContactType = "question" | "partnership" | "bug";

export default function Contact() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "question" as ContactType,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMutation = trpc.contact.submit.useMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await contactMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        type: formData.type,
        message: formData.message,
      });

      toast.success("Message sent! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        type: "question",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mobile-frame">
      <Navigation />

      <div className="mobile-content">
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <button
            onClick={() => navigate("/")}
            className="mobile-button-small"
            style={{ marginBottom: 0 }}
          >
            BACK
          </button>
          <h1 className="mobile-heading-1" style={{ margin: 0, flex: 1 }}>
            CONTACT US
          </h1>
        </div>

        <div className="mobile-card" style={{ marginBottom: "20px" }}>
          <p className="mobile-body" style={{ marginBottom: "16px" }}>
            Have questions, partnership ideas, or found a bug? We'd love to hear from you!
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Name Field */}
          <div>
            <label className="mobile-body-lg" style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
              YOUR NAME
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="mobile-input"
              disabled={isSubmitting}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="mobile-body-lg" style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
              YOUR EMAIL
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="mobile-input"
              disabled={isSubmitting}
            />
          </div>

          {/* Type Field */}
          <div>
            <label className="mobile-body-lg" style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
              WHAT'S THIS ABOUT?
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mobile-input"
              style={{ cursor: "pointer" }}
              disabled={isSubmitting}
            >
              <option value="question">Question</option>
              <option value="partnership">Partnership</option>
              <option value="bug">Bug Report</option>
            </select>
          </div>

          {/* Message Field */}
          <div>
            <label className="mobile-body-lg" style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
              YOUR MESSAGE
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what's on your mind..."
              className="mobile-textarea"
              style={{ minHeight: "150px" }}
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mobile-button"
            disabled={isSubmitting}
            style={{ opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
          >
            {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
          </button>
        </form>

        <div className="mobile-card" style={{ marginTop: "24px", background: "#f0f0f0" }}>
          <p className="mobile-body-sm" style={{ marginBottom: "8px", color: "var(--pixel-text-light)" }}>
            📧 Email: support@dothething.my
          </p>
          <p className="mobile-body-sm" style={{ color: "var(--pixel-text-light)" }}>
            We typically respond within 24 hours.
          </p>
        </div>
      </div>

      {/* Footer Navigation */}
      <footer className="border-t-2 border-border p-4 bg-card text-center space-y-3 mt-auto">
        <div className="flex gap-2 justify-center flex-wrap">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 border-2 border-border bg-background hover:bg-accent text-foreground font-vt323 text-sm"
          >
            HOME
          </button>
          <button
            onClick={() => navigate("/about")}
            className="px-4 py-2 border-2 border-border bg-background hover:bg-accent text-foreground font-vt323 text-sm"
          >
            ABOUT
          </button>
          <button
            onClick={() => navigate("/blog")}
            className="px-4 py-2 border-2 border-border bg-background hover:bg-accent text-foreground font-vt323 text-sm"
          >
            BLOG
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="px-4 py-2 border-2 border-border bg-background hover:bg-accent text-foreground font-vt323 text-sm"
          >
            CONTACT
          </button>
          <button
            onClick={() => navigate("/privacy")}
            className="px-4 py-2 border-2 border-border bg-background hover:bg-accent text-foreground font-vt323 text-sm"
          >
            PRIVACY
          </button>
          <button
            onClick={() => navigate("/terms")}
            className="px-4 py-2 border-2 border-border bg-background hover:bg-accent text-foreground font-vt323 text-sm"
          >
            TERMS
          </button>
        </div>
        <p className="font-vt323 text-xs text-muted-foreground">
          DoTheThing - Task Management for ADHD Brains
        </p>
      </footer>
    </div>
  );
}
