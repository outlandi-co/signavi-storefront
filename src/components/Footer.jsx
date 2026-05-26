import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="site-footer">
      <h3>SignaVi Store</h3>
      <p>From iteration to creation.</p>

      <div className="social-row">
        <a href="https://www.facebook.com/signavi" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com/signavistudio/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://www.tiktok.com/@signavi.studio?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <FaTiktok />
        </a>
      </div>
    </footer>
  )
}
