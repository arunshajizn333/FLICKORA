import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const discoverLinks = [
    { label: 'Trending Movies', href: '/' },
    { label: 'Top Rated', href: '/' },
    { label: 'New Releases', href: '/' },
    { label: 'Genres', href: '/' },
  ];

  const companyLinks = [
    { label: 'About Us', href: '/' },
    { label: 'Careers', href: '/' },
    { label: 'Press', href: '/' },
  ];

  const supportLinks = [
    { label: 'Help Center', href: '/' },
    { label: 'Contact Us', href: '/' },
    { label: 'Privacy Policy', href: '/' },
    { label: 'Terms of Service', href: '/' },
  ];

  return (
    <footer className="w-full bg-[#0b0b0f] border-t border-neutral-800/80 text-neutral-400">
      <div className="w-full max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Discover
            </h4>
            <ul className="space-y-2 text-xs">
              {discoverLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-neutral-200 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-neutral-200 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Support & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-neutral-200 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Flickora AI
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed mb-4">
              An intelligent OTT movie discovery and streaming web application.
            </p>
            <p className="text-[11px] text-neutral-600">
              © {currentYear} Flickora AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
