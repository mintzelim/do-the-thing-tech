import { useEffect } from "react";
import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { updateMetaTags, pageMetaTags } from "@/lib/metaTags";
import "../pixel-art-refined.css";

export default function Terms() {
  const [, navigate] = useLocation();

  // Update meta tags when component mounts
  useEffect(() => {
    updateMetaTags(pageMetaTags.terms);
  }, []);

  return (
    <div className="mobile-frame">
      <Navigation />
      
      <div className="mobile-content">
        <div className="max-w-4xl mx-auto">
          <h1 className="mobile-heading-1" style={{ marginBottom: "24px" }}>TERMS OF SERVICE</h1>

          <div className="mobile-card" style={{ marginBottom: "20px", fontFamily: "'Roboto Mono', monospace" }}>
            <h2 className="mobile-heading-2" style={{ fontFamily: 'VT323, monospace' }}>Last Updated: April 2026</h2>
            
            <div className="mobile-body" style={{ marginTop: "16px", lineHeight: "1.8", fontFamily: "'Roboto Mono', monospace", fontSize: '14px' }}>
              <p style={{ marginBottom: "16px" }}>
                These Terms of Service ("Terms") govern your use of the Do The Thing website and application (the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h3 className="mobile-heading-3" style={{ marginTop: "24px", marginBottom: "12px", fontFamily: 'VT323, monospace' }}>1. Use License</h3>
              <p style={{ marginBottom: "16px" }}>
                Permission is granted to temporarily download one copy of the materials (information or software) on Do The Thing's Service for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul style={{ marginLeft: "20px", marginBottom: "16px" }}>
                <li style={{ marginBottom: "8px" }}>Modifying or copying the materials</li>
                <li style={{ marginBottom: "8px" }}>Using the materials for any commercial purpose or for any public display</li>
                <li style={{ marginBottom: "8px" }}>Attempting to decompile or reverse engineer any software contained on the Service</li>
                <li style={{ marginBottom: "8px" }}>Removing any copyright or other proprietary notations from the materials</li>
                <li style={{ marginBottom: "8px" }}>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              </ul>

              <h3 className="mobile-heading-3" style={{ marginTop: "24px", marginBottom: "12px", fontFamily: 'VT323, monospace' }}>2. Disclaimer</h3>
              <p style={{ marginBottom: "16px" }}>
                The materials on Do The Thing's Service are provided on an 'as is' basis. Do The Thing makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>

              <h3 className="mobile-heading-3" style={{ marginTop: "24px", marginBottom: "12px", fontFamily: 'VT323, monospace' }}>3. Limitations</h3>
              <p style={{ marginBottom: "16px" }}>
                In no event shall Do The Thing or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Do The Thing's Service, even if Do The Thing or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>

              <h3 className="mobile-heading-3" style={{ marginTop: "24px", marginBottom: "12px", fontFamily: 'VT323, monospace' }}>4. Accuracy of Materials</h3>
              <p style={{ marginBottom: "16px" }}>
                The materials appearing on Do The Thing's Service could include technical, typographical, or photographic errors. Do The Thing does not warrant that any of the materials on its Service are accurate, complete, or current. Do The Thing may make changes to the materials contained on its Service at any time without notice.
              </p>

              <h3 className="mobile-heading-3" style={{ marginTop: "24px", marginBottom: "12px", fontFamily: 'VT323, monospace' }}>5. Links</h3>
              <p style={{ marginBottom: "16px" }}>
                Do The Thing has not reviewed all of the sites linked to its Service and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Do The Thing of the site. Use of any such linked website is at the user's own risk.
              </p>

              <h3 className="mobile-heading-3" style={{ marginTop: "24px", marginBottom: "12px", fontFamily: 'VT323, monospace' }}>6. Modifications</h3>
              <p style={{ marginBottom: "16px" }}>
                Do The Thing may revise these terms of service for its Service at any time without notice. By using this Service, you are agreeing to be bound by the then current version of these terms of service.
              </p>

              <h3 className="mobile-heading-3" style={{ marginTop: "24px", marginBottom: "12px", fontFamily: 'VT323, monospace' }}>7. Governing Law</h3>
              <p style={{ marginBottom: "16px" }}>
                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Do The Thing operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>

              <h3 className="mobile-heading-3" style={{ marginTop: "24px", marginBottom: "12px", fontFamily: 'VT323, monospace' }}>8. Contact Information</h3>
              <p style={{ marginBottom: "16px" }}>
                If you have any questions about these Terms of Service, please contact us through the feedback form on our website or email support.
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
