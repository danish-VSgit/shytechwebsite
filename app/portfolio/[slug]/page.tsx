import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client, isSanityConfigured } from "@/sanity/lib/client";
import { portfolioBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Portfolio } from "@/sanity/lib/types";
import { ArrowLeft, Calendar, User, Play, Tag, Star, Quote } from "lucide-react";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isSanityConfigured) return {};
  const { slug } = await params;
  let project: Portfolio | null = null;
  try {
    project = await client.fetch<Portfolio | null>(portfolioBySlugQuery, { slug });
  } catch {
    return {};
  }
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.seo?.metaTitle ?? `${project.title} | SHYTECH Portfolio`,
    description: project.seo?.metaDescription ?? project.description,
    keywords: project.seo?.keywords,
    openGraph: {
      title: project.seo?.metaTitle ?? project.title,
      description: project.seo?.metaDescription ?? project.description ?? "",
      images: project.seo?.ogImage
        ? [urlFor(project.seo.ogImage).width(1200).height(630).url()]
        : project.coverImage
        ? [urlFor(project.coverImage).width(1200).height(630).url()]
        : [],
    },
    robots: project.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-[#475569] leading-relaxed mb-4 text-[1.05rem]">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-[#0f172a] mt-8 mb-3" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold text-[#0f172a] mt-6 mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-[#2563EB] pl-6 py-2 my-6 bg-[#eff6ff] rounded-r-xl italic text-[#334155]">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => <ul className="list-none space-y-2 my-4">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-2.5 text-[#475569]">
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-semibold text-[#0f172a]">{children}</strong>,
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-[#2563EB] underline hover:text-[#1d4ed8]">{children}</a>
    ),
  },
};

export default async function PortfolioDetailPage({ params }: Props) {
  if (!isSanityConfigured) notFound();
  const { slug } = await params;
  let project: Portfolio | null = null;
  try {
    project = await client.fetch<Portfolio | null>(portfolioBySlugQuery, { slug });
  } catch {
    notFound();
  }
  if (!project) notFound();

  const coverImageUrl = project.coverImage ? urlFor(project.coverImage).width(1200).height(600).url() : null;

  return (
    <main className="min-h-screen bg-white">
      {/* Back */}
      <div className="pt-28 pb-6 container-width">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-[#2563EB] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
      </div>

      {/* Hero */}
      <div className="container-width mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#eff6ff] text-[#2563EB] text-xs font-bold uppercase tracking-wider border border-[#bfdbfe]">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-3 py-1 rounded-full bg-[#fef3c7] text-[#92400e] text-xs font-bold uppercase tracking-wider border border-[#fde68a]">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-4 leading-tight" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              {project.title}
            </h1>
            {project.description && (
              <p className="text-lg text-[#475569] leading-relaxed mb-6">{project.description}</p>
            )}
            <div className="flex flex-wrap gap-4 text-sm text-[#64748b]">
              {project.client && (
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#2563EB]" />
                  <span className="font-medium text-[#334155]">{project.client}</span>
                </div>
              )}
              {project.year && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#2563EB]" />
                  <span>{project.year}</span>
                </div>
              )}
            </div>

            {project.services && project.services.length > 0 && (
              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] mb-2">Services Provided</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.services.map((svc) => (
                    <span key={svc} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f8fafc] border border-[#E2E8F0] text-xs text-[#475569]">
                      <Tag className="w-2.5 h-2.5 text-[#2563EB]" />
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.videoUrl && (
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 btn-primary w-fit"
              >
                <Play className="w-4 h-4" />
                Watch Project Video
              </a>
            )}
          </div>

          {/* Cover image */}
          {coverImageUrl && (
            <div className="relative h-72 md:h-[400px] rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-lg">
              <Image src={coverImageUrl} alt={project.title} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          )}
        </div>
      </div>

      {/* Full description */}
      {project.fullDescription && (
        <section className="container-width max-w-3xl mx-auto mb-16 pb-16 border-b border-[#E2E8F0]">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-6" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Project Story</h2>
          <PortableText value={project.fullDescription} components={portableTextComponents} />
        </section>
      )}

      {/* Photo gallery */}
      {project.images && project.images.length > 0 && (
        <section className="container-width mb-16">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-6" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Project Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.images.map((img, i) => (
              <div key={i} className="relative h-56 rounded-xl overflow-hidden border border-[#E2E8F0] group">
                <Image
                  src={urlFor(img).width(600).height(400).url()}
                  alt={img.alt ?? `${project.title} gallery ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {img.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f172a]/80 to-transparent p-3">
                    <p className="text-white text-xs">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <section className="container-width mb-12">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-[#f1f5f9] text-[#475569] text-sm border border-[#E2E8F0]">
                #{tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <section className="container-width mb-16">
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-[#eff6ff] to-white border border-[#bfdbfe]">
            <Quote className="w-8 h-8 text-[#2563EB] mb-4" />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: project.testimonial.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
              ))}
            </div>
            <p className="text-[#334155] leading-relaxed italic text-lg mb-6">&ldquo;{project.testimonial.review}&rdquo;</p>
            <div className="flex items-center gap-3">
              {project.testimonial.photo && (
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#E2E8F0]">
                  <Image src={urlFor(project.testimonial.photo).width(80).height(80).url()} alt={project.testimonial.name} fill className="object-cover" sizes="40px" />
                </div>
              )}
              <div>
                <p className="font-semibold text-[#0f172a]">{project.testimonial.name}</p>
                <p className="text-sm text-[#64748b]">
                  {project.testimonial.role}
                  {project.testimonial.company && ` · ${project.testimonial.company}`}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container-width mb-20">
        <div className="rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Ready for your own success story?
          </h2>
          <p className="text-white/80 mb-6">Let&apos;s create something extraordinary together.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-[#2563EB] font-semibold px-6 py-3 rounded-xl hover:bg-[#f8fafc] transition-colors shadow-lg">
              Start Your Project
            </Link>
            <Link href="/portfolio" className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              More Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
