export const Footer = () => {
  const footerLinks = {
    Platform: ["Canvas", "Content Calendar", "AI Writing", "Multi-Channel Publishing", "Analytics"],
    Solutions: ["Content Teams", "Marketing Agencies", "Enterprise", "Startups"],
    Resources: ["Blog", "Help Center", "API Docs", "Webinars", "Community"],
    Company: ["About", "Careers", "Press", "Contact", "Partners"],
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" stroke="currentColor" fill="none"/>
                </svg>
              </div>
              <span className="font-display font-bold text-xl">StoryChief</span>
            </div>
            <p className="text-sm text-background/60 max-w-xs">
              The all-in-one content marketing platform for modern teams.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-background/60 hover:text-background transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            © 2024 StoryChief. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
