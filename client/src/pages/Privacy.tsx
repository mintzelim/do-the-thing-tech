import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "../pixel-art-refined.css";

export default function Privacy() {
  const [, navigate] = useLocation();

  return (
    <div className="mobile-frame">
      <Navigation />
      
      <div className="mobile-content">
        <div className="max-w-4xl mx-auto">
          <h1 className="mobile-heading-1" style={{ marginBottom: "24px" }}>PRIVACY POLICY</h1>

          <div className="mobile-card" style={{ marginBottom: "20px", fontFamily: "'Roboto Mono', monospace" }}>
            <h2 className="mobile-heading-2" style={{ fontFamily: 'VT323, monospace' }}>Last Updated: April 2026</h2>
            
            <div className="mobile-body" style={{ marginTop: "16px", lineHeight: "1.8", fontFamily: "'Roboto Mono', monospace", fontSize: '14px' }}>
              <p style={{ marginBottom: "16px" }}>
                Do The Thing ("we," "us," "our," or "Company") operates the Do The Thing website and application. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
              </p>

              <h3 className="mobile-heading-3" style={{ marginTop: "24px", marginBottom: "12px", fontFamily: 'VT323, monospace' }}>Information Collection and Use</h3>
              <p style={{ marginBottom: "16px" }}>
                We collect several different types of information for various purposes to provide and improve our Service to you.
              </p>

              <h4 style={{ fontWeight: "bold", marginTop: "16px", marginBottom: "8px", fontFamily: 'VT323, monospace' }}>Types of Data Collected:</h4>
              <ul style={{ marginLeft: "20px", marginBottom: "16px" }}>
                <li style={{ marginBottom: "8px" }}>Personal Data: Email address, name, usage data</li>
                <li style={{ marginBottom: "8px" }}>Usage Data: Browser type, IP address, pages visited, time spent</li>
                <li style={{ marginBottom: "8px" }}>Cookies: Session cookies for authentication</li>
                <li style={{ marginBottom: "8px" }}>Task Data: Tasks you create are stored locally in your browser</li>
              </ul>

              <h3 className="mobile-heading-3" style={{ marginTop: "24px", marginBottom: "12px", fontFamily: 'VT323, monospace' }}>Use of Data</h3>
              <p style={{ marginBottom: "16px" }}>
                Do The Thing uses the collected data for various purposes:
              </p>
              <ul style={{ marginLeft: "20px", marginBottom: "16px" }}>
                <li style={{ marginBottom: "8px" }}>To provide and maintain our Service</li>
                <li style={{ marginBottom: "8px" }}>To notify you about changes to our Service</li>
                <li style={{ marginBottom: "8px" }}>To allow you to participate in interactive features</li>
                <li style={{ marginBottom: "8px" }}>To provide customer support</li>
                <li style={{ marginBottom: "8px" }}>To gather analysis or valuable information to improve our Service</li>
              </ul>

              <h3 className="mobile-heading-3" style={{ marginTop: "24px", marginBottom: "12px", fontFamily: 'VT323, monospace' }}>Security of Data</h3>
              <p style={{ marginBottom: "16px" }}>
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>

              <h3 className="mobile-heading-3" style={{ marginTop: "24px", marginBottom: "12px", fontFamily: 'VT323, monospace' }}>Third-Party Services</h3>
              <p style={{ marginBottom: "16px" }}>
                Our Service may contain links to other sites that are not operated by us. This Privacy Policy does not apply to third-party websites and we are not responsible for their privacy practices. We encourage you to review the privacy policy of any third-party service before providing your information.
              </p>

              <h3 className="mobile-heading-3" style={{ marginTop: "24px", marginBottom: "12px", fontFamily: 'VT323, monospace' }}>Changes to This Privacy Policy</h3>
              <p style={{ marginBottom: "16px" }}>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
              </p>

              <h3 className="mobile-heading-3" style={{ marginTop: "24px", marginBottom: "12px", fontFamily: 'VT323, monospace' }}>Contact Us</h3>
              <p style={{ marginBottom: "16px" }}>
                If you have any questions about this Privacy Policy, please contact us through the feedback form on our website or email support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
