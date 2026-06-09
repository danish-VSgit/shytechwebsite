export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "SHYTECH",
    description:
      "Premium event management and media production company creating experiences people never forget.",
    url: "https://shytech.agency",
    logo: "https://shytech.agency/logo.png",
    telephone: "+911234567890",
    email: "hello@shytech.agency",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Premium Tower, Business District",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.0760,
      longitude: 72.8777,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://instagram.com/shytech",
      "https://youtube.com/@shytech",
      "https://linkedin.com/company/shytech",
    ],
    priceRange: "₹₹₹",
    servesCuisine: undefined,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Event Management & Media Production Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate Event Management" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wedding Planning" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Professional Videography" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Video Generation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Live Streaming" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Promotions" } },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "87",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
