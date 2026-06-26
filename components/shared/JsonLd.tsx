export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://queuecap.com/#organization",
        name: "QueueCap",
        legalName: "QueueCap",
        url: "https://queuecap.com",
        logo: {
          "@type": "ImageObject",
          url: "https://queuecap.com/logo.png",
          width: 512,
          height: 512,
        },
        image: "https://queuecap.com/logo.png",
        description:
          "Premium event management and media production company creating experiences people never forget.",
        telephone: "+918595827471",
        email: "enquiry@queuecap.com",
        sameAs: [
          "https://www.instagram.com/queuecap/",
          "https://www.youtube.com/@queuecap",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://queuecap.com/#localbusiness",
        name: "QueueCap",
        description:
          "Premium event management and media production company creating experiences people never forget.",
        url: "https://queuecap.com",
        image: "https://queuecap.com/logo.png",
        logo: "https://queuecap.com/logo.png",
        telephone: "+918595827471",
        email: "enquiry@queuecap.com",
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
        priceRange: "₹₹₹",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Event Management & Media Production Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate Event Management" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Conference & Summit Production" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Professional Videography" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Video Generation" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Live Streaming" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Activations & Experiential Marketing" } },
          ],
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "87",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
