import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, User, Calendar } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { blogsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Blog } from "@/sanity/lib/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog | SHYTECH",
  description:
    "Expert insights on event management, wedding planning, videography trends, AI in media production, and digital marketing from the SHYTECH team.",
};

// Static fallback posts shown before Sanity is populated
const staticPosts = [
  {
    id: "1",
    title: "10 Trends Defining Luxury Events in 2025",
    excerpt: "From immersive AR experiences to sustainable luxury, the event industry is evolving fast. Here's what your clients will expect — and how to deliver it.",
    category: "Event Trends",
    author: "Aryan Shah",
    readTime: "7 min read",
    date: "May 20, 2025",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    slug: "luxury-event-trends-2025",
  },
  {
    id: "2",
    title: "Why AI Video Generation is the Future of Brand Advertising",
    excerpt: "AI-generated video content is no longer science fiction. We break down how brands are using it today — and how it can slash your production costs by 70%.",
    category: "AI Production",
    author: "Karan Mehta",
    readTime: "5 min read",
    date: "May 12, 2025",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    slug: "ai-video-generation-brand-advertising",
  },
  {
    id: "3",
    title: "The Complete Guide to Planning a Destination Wedding",
    excerpt: "Destination weddings are magical — and complex. Our comprehensive guide covers venue selection, guest logistics, legal requirements, and media coverage.",
    category: "Wedding Planning",
    author: "Priya Verma",
    readTime: "12 min read",
    date: "April 28, 2025",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    slug: "destination-wedding-planning-guide",
  },
  {
    id: "4",
    title: "How to Run a Flawless Corporate Summit with 1000+ Attendees",
    excerpt: "Large-scale conferences require military-precision planning. We share our internal checklist and the systems that ensure zero failures on event day.",
    category: "Corporate Events",
    author: "Aryan Shah",
    readTime: "9 min read",
    date: "April 15, 2025",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    slug: "corporate-summit-planning-guide",
  },
  {
    id: "5",
    title: "Live Streaming Best Practices: Reaching Your Global Audience",
    excerpt: "Professional live streaming goes far beyond hitting the record button. Here are the technical and creative standards that separate amateur from professional.",
    category: "Live Streaming",
    author: "Karan Mehta",
    readTime: "6 min read",
    date: "March 30, 2025",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    slug: "live-streaming-best-practices",
  },
  {
    id: "6",
    title: "Social Media Content Strategy for Event Brands in 2025",
    excerpt: "Your event's social media presence can make or break its reach. We reveal the content formats, posting cadences, and engagement strategies that work right now.",
    category: "Digital Marketing",
    author: "Sneha Kapoor",
    readTime: "8 min read",
    date: "March 18, 2025",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    slug: "social-media-strategy-event-brands",
  },
];

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function SanityBlogGrid({ posts }: { posts: Blog[] }) {
  const [featured, ...rest] = posts;

  return (
    <>
      {/* Featured post */}
      <section className="pb-16">
        <div className="container-width">
          <Link href={`/blog/${featured.slug.current}`} className="group block">
            <div className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)] transition-all duration-500">
              <div className="relative h-80 md:h-[500px] bg-[#f1f5f9]">
                {featured.coverImage && (
                  <Image
                    src={urlFor(featured.coverImage).width(1200).height(600).url()}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="100vw"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/85 via-[#0f172a]/50 to-transparent" />
              </div>
              <div className="absolute inset-0 flex items-end p-8 md:p-12">
                <div className="max-w-xl">
                  {featured.featured && (
                    <span className="px-3 py-1 rounded-full bg-[#2563EB] text-white text-xs font-bold tracking-wider uppercase mb-4 inline-block">
                      Featured
                    </span>
                  )}
                  {featured.categories?.[0] && (
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold tracking-wider uppercase mb-4 inline-block ml-2">
                      {featured.categories[0].replace(/-/g, " ")}
                    </span>
                  )}
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 group-hover:text-white/90 transition-colors" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    {featured.title}
                  </h2>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4 hidden md:block">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-white/60">
                    {featured.author && <span className="flex items-center gap-1"><User className="w-3 h-3" /> {featured.author.name}</span>}
                    {featured.readingTime && <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readingTime} min read</span>}
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(featured.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Remaining posts grid */}
      {rest.length > 0 && (
        <section className="pb-32 bg-[#f8fafc]">
          <div className="container-width pt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group block rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white hover:border-[#2563EB]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)]"
                >
                  <div className="relative h-52 overflow-hidden bg-[#f1f5f9]">
                    {post.coverImage && (
                      <Image
                        src={urlFor(post.coverImage).width(600).height(360).url()}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/40 to-transparent" />
                    {post.categories?.[0] && (
                      <div className="absolute top-4 left-4">
                        <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-wider uppercase text-[#2563EB]">
                          {post.categories[0].replace(/-/g, " ")}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-[#0f172a] mb-2 group-hover:text-[#2563EB] transition-colors line-clamp-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#64748b] leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-[#94a3b8]">
                        {post.author && <span>{post.author.name}</span>}
                        {post.readingTime && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readingTime} min</span>
                          </>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function StaticBlogGrid() {
  const [featured, ...rest] = staticPosts;
  return (
    <>
      <section className="pb-16">
        <div className="container-width">
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)] transition-all duration-500">
              <div className="relative h-80 md:h-[500px]">
                <Image src={featured.image} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="100vw" priority />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/85 via-[#0f172a]/50 to-transparent" />
              </div>
              <div className="absolute inset-0 flex items-end p-8 md:p-12">
                <div className="max-w-xl">
                  <span className="px-3 py-1 rounded-full bg-[#2563EB] text-white text-xs font-bold tracking-wider uppercase mb-4 inline-block">{featured.category}</span>
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{featured.title}</h2>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4 hidden md:block">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-white/60">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {featured.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readTime}</span>
                    <span>{featured.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
      <section className="pb-32 bg-[#f8fafc]">
        <div className="container-width pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white hover:border-[#2563EB]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
                <div className="relative h-52 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-wider uppercase text-[#2563EB]">{post.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-[#0f172a] mb-2 group-hover:text-[#2563EB] transition-colors line-clamp-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>{post.title}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-[#94a3b8]">
                      <span>{post.author}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default async function BlogPage() {
  let posts: Blog[] = [];
  try {
    posts = await client.fetch<Blog[]>(blogsQuery);
  } catch {
    posts = [];
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-36 pb-12 bg-gradient-to-b from-[#f8fafc] to-white">
        <div className="container-width text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563EB]/20 bg-[#eff6ff] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#2563EB]">Insights & Ideas</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#0f172a] mb-6" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            The SHYTECH <span className="accent-text">Journal</span>
          </h1>
          <p className="text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Expert perspectives on events, media, trends, and the future of experiential storytelling.
          </p>
        </div>
      </section>

      {posts.length > 0 ? <SanityBlogGrid posts={posts} /> : <StaticBlogGrid />}
    </div>
  );
}
