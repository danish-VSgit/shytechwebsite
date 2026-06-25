import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client, isSanityConfigured } from "@/sanity/lib/client";
import { blogBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Blog } from "@/sanity/lib/types";
import { Calendar, Clock, ArrowLeft, User, Tag } from "lucide-react";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isSanityConfigured) return {};
  const { slug } = await params;
  let post: Blog | null = null;
  try {
    post = await client.fetch<Blog | null>(blogBySlugQuery, { slug });
  } catch {
    return {};
  }
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.excerpt,
    keywords: post.seo?.keywords,
    openGraph: {
      title: post.seo?.metaTitle ?? post.title,
      description: post.seo?.metaDescription ?? post.excerpt,
      images: post.seo?.ogImage
        ? [urlFor(post.seo.ogImage).width(1200).height(630).url()]
        : post.coverImage
        ? [urlFor(post.coverImage).width(1200).height(630).url()]
        : [],
    },
    robots: post.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset: unknown; alt?: string; caption?: string } }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <div className="relative rounded-2xl overflow-hidden border border-[#E2E8F0]">
            <Image
              src={urlFor(value as Parameters<typeof urlFor>[0]).width(800).url()}
              alt={value.alt ?? "Blog image"}
              width={800}
              height={450}
              className="w-full h-auto"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-[#94a3b8] mt-3 italic">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-3xl font-bold text-[#0f172a] mt-10 mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-[#0f172a] mt-8 mb-3" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold text-[#0f172a] mt-6 mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-lg font-semibold text-[#334155] mt-5 mb-2">{children}</h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-[#475569] leading-relaxed mb-4 text-[1.05rem]">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-[#2563EB] pl-6 py-2 my-6 bg-[#eff6ff] rounded-r-xl italic text-[#334155]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-none space-y-2 my-4 ml-0">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-2 my-4 ml-0 text-[#475569]">{children}</ol>
    ),
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
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-[#0f172a]">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-[#334155]">{children}</em>
    ),
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-[#2563EB] underline hover:text-[#1d4ed8] transition-colors">
        {children}
      </a>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-[#f1f5f9] text-[#e11d48] px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
  },
};

export default async function BlogPostPage({ params }: Props) {
  if (!isSanityConfigured) notFound();
  const { slug } = await params;
  let post: Blog | null = null;
  try {
    post = await client.fetch<Blog | null>(blogBySlugQuery, { slug });
  } catch {
    notFound();
  }
  if (!post) notFound();

  const coverImageUrl = post.coverImage ? urlFor(post.coverImage).width(1200).height(600).url() : null;

  return (
    <main className="min-h-screen bg-white">
      {/* Back nav */}
      <div className="pt-28 pb-6 container-width">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-[#2563EB] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      {/* Cover image */}
      {coverImageUrl && (
        <div className="container-width mb-8">
          <div className="relative h-72 md:h-[480px] rounded-2xl overflow-hidden border border-[#E2E8F0]">
            <Image src={coverImageUrl} alt={post.title} fill className="object-cover" priority sizes="(max-width: 1280px) 100vw, 1280px" />
          </div>
        </div>
      )}

      {/* Article */}
      <article className="container-width max-w-3xl mx-auto">
        {/* Meta */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories?.map((cat) => (
              <span key={cat} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eff6ff] text-[#2563EB] text-xs font-semibold border border-[#bfdbfe]">
                <Tag className="w-3 h-3" />
                {cat.replace(/-/g, " ")}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] leading-tight mb-6" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748b] pb-6 border-b border-[#E2E8F0]">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.photo && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#E2E8F0]">
                    <Image src={urlFor(post.author.photo).width(64).height(64).url()} alt={post.author.name} fill className="object-cover" sizes="32px" />
                  </div>
                )}
                <span className="flex items-center gap-1.5 font-medium text-[#334155]">
                  <User className="w-3.5 h-3.5 text-[#94a3b8]" />
                  {post.author.name}
                  {post.author.role && <span className="text-[#94a3b8] font-normal">· {post.author.role}</span>}
                </span>
              </div>
            )}
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#94a3b8]" />
                {new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            )}
            {post.readingTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#94a3b8]" />
                {post.readingTime} min read
              </span>
            )}
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-lg text-[#475569] leading-relaxed mb-8 font-light italic border-l-4 border-[#2563EB]/30 pl-5">{post.excerpt}</p>

        {/* Portable Text content */}
        {post.content && (
          <div className="prose-content">
            <PortableText value={post.content} components={portableTextComponents} />
          </div>
        )}

        {/* Author card */}
        {post.author && (
          <div className="mt-12 p-6 rounded-2xl bg-[#f8fafc] border border-[#E2E8F0]">
            <div className="flex items-start gap-4">
              {post.author.photo && (
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#E2E8F0] shrink-0">
                  <Image src={urlFor(post.author.photo).width(112).height(112).url()} alt={post.author.name} fill className="object-cover" sizes="56px" />
                </div>
              )}
              <div>
                <p className="font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{post.author.name}</p>
                {post.author.role && <p className="text-sm text-[#2563EB] font-medium">{post.author.role}</p>}
                {post.author.bio && <p className="text-sm text-[#64748b] mt-1 leading-relaxed">{post.author.bio}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Related posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-[#E2E8F0]">
            <h2 className="text-xl font-bold text-[#0f172a] mb-6" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {post.relatedPosts.map((related) => (
                <Link key={related._id} href={`/blog/${related.slug.current}`} className="group block rounded-xl overflow-hidden border border-[#E2E8F0] bg-white hover:border-[#2563EB]/25 transition-all hover:-translate-y-0.5 hover:shadow-md">
                  {related.coverImage && (
                    <div className="relative h-36 overflow-hidden bg-[#f1f5f9]">
                      <Image src={urlFor(related.coverImage).width(400).height(240).url()} alt={related.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="400px" />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-[#0f172a] group-hover:text-[#2563EB] transition-colors line-clamp-2">{related.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 mb-16 p-8 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] text-center">
          <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Ready to create something extraordinary?</h2>
          <p className="text-white/80 mb-6">Let&apos;s talk about how QueueCap can make your next event unforgettable.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#2563EB] font-semibold px-6 py-3 rounded-xl hover:bg-[#f8fafc] transition-colors shadow-lg">
            Get in Touch
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </article>
    </main>
  );
}
