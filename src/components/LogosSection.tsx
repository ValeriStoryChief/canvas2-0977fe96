export const LogosSection = () => {
  const logos = [
    { name: "Shopify", width: "w-24" },
    { name: "HubSpot", width: "w-24" },
    { name: "Semrush", width: "w-24" },
    { name: "Mailchimp", width: "w-28" },
    { name: "Buffer", width: "w-20" },
    { name: "Hootsuite", width: "w-28" },
  ];

  return (
    <section className="py-16 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Trusted by 10,000+ content teams worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className={`${logo.width} h-8 flex items-center justify-center opacity-40 hover:opacity-70 transition-opacity`}
            >
              <span className="text-lg font-semibold text-foreground tracking-tight">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
