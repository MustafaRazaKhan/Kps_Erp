"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="relative border-t border-slate-200"
      style={{
        background: "linear-gradient(to bottom, #ffffff, #fff0f6)",
      }}
    >
      <div>
        {/* Bottom */}
        <div>
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold">Krishna Public School</span>. All
            rights reserved.
          </p>

          {/* <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="transition-all duration-300"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--theme-bg-color)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-all duration-300"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--theme-bg-color)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="transition-all duration-300"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--theme-bg-color)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              Contact
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
