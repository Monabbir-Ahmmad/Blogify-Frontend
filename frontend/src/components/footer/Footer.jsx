import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="bg-background border-t border-divider text-sm opacity-70 p-6 mt-auto"
    >
      <div className="w-full mx-auto max-w-screen-xl flex flex-col-reverse md:flex-row items-center justify-between gap-4">
        <span>
          © 2023{" "}
          <Link to="/" className="hover:underline">
            Blogify™
          </Link>
          . All Rights Reserved.
        </span>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <Link to="/" className="hover:underline">
            About
          </Link>

          <Link to="/" className="hover:underline">
            Privacy Policy
          </Link>

          <Link to="/" className="hover:underline">
            Licensing
          </Link>

          <Link to="/" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
