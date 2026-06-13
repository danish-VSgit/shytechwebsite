interface PersonJsonLdProps {
  name: string;
  jobTitle?: string;
  company?: string;
  description?: string;
  image?: string;
  url: string;
  sameAs?: string[];
}

export default function PersonJsonLd({ name, jobTitle, company, description, image, url, sameAs }: PersonJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: jobTitle || undefined,
    description: description || undefined,
    image: image || undefined,
    url,
    worksFor: company ? { "@type": "Organization", name: company } : undefined,
    sameAs: sameAs && sameAs.length > 0 ? sameAs : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
