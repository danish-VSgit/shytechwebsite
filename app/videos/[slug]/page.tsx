import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client, isSanityConfigured } from "@/sanity/lib/client";
import { videoBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Video } from "@/sanity/lib/types";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isSanityConfigured) return {};
  const { slug } = await params;
  let video: Video | null = null;
  try {
    video = await client.fetch<Video | null>(videoBySlugQuery, { slug });
  } catch { return {}; }
  if (!video) return { title: "Video Not Found" };
  return {
    title: video.seo?.metaTitle ?? `${video.title} | SHYTECH Videos`,
    description: video.seo?.metaDescription ?? video.description,
    openGraph: {
      title: video.seo?.metaTitle ?? video.title,
      description: video.seo?.metaDescription ?? video.description ?? "",
      images: video.thumbnail ? [urlFor(video.thumbnail).width(1200).height(630).url()] : [],
    },
    robots: video.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

function getEmbedUrl(url: string): string | null {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return null;
}

export default async function VideoDetailPage({ params }: Props) {
  if (!isSanityConfigured) notFound();
  const { slug } = await params;
  let video: Video | null = null;
  try {
    video = await client.fetch<Video | null>(videoBySlugQuery, { slug });
  } catch { notFound(); }
  if (!video) notFound();

  const embedUrl = video.videoType === "url" && video.videoUrl ? getEmbedUrl(video.videoUrl) : null;
  const fileUrl = video.videoFile?.asset?.url ?? null;
  const thumbnailUrl = video.thumbnail ? urlFor(video.thumbnail).width(1200).height(675).url() : null;

  return (
    <main className="min-h-screen bg-white">
      <div className="pt-28 pb-6 container-width">
        <Link href="/videos" className="inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-[#2563EB] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Videos
        </Link>
      </div>

      <div className="container-width max-w-5xl mx-auto pb-20">
        {/* Video player */}
        <div className="mb-8">
          {embedUrl ? (
            <div className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-xl" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ) : fileUrl ? (
            <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-xl">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video controls className="w-full" poster={thumbnailUrl ?? undefined}>
                <source src={fileUrl} />
              </video>
            </div>
          ) : thumbnailUrl ? (
            <div className="relative h-96 rounded-2xl overflow-hidden border border-[#E2E8F0]">
              <Image src={thumbnailUrl} alt={video.title} fill className="object-cover" priority sizes="100vw" />
            </div>
          ) : null}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-2 mb-4">
          {video.category && (
            <span className="px-3 py-1 rounded-full bg-[#eff6ff] text-[#2563EB] text-xs font-bold uppercase tracking-wider border border-[#bfdbfe]">
              {video.category.replace(/-/g, " ")}
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          {video.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748b] mb-6 pb-6 border-b border-[#E2E8F0]">
          {video.duration && <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#2563EB]" /> {video.duration}</span>}
          {video.publishedAt && <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#2563EB]" /> {new Date(video.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>}
          {video.event && <span>Event: <Link href={`/events/${video.event.slug.current}`} className="text-[#2563EB] hover:underline">{video.event.title}</Link></span>}
        </div>

        {video.description && (
          <p className="text-lg text-[#475569] leading-relaxed mb-8">{video.description}</p>
        )}

        {/* External link fallback */}
        {video.videoType === "url" && video.videoUrl && !embedUrl && (
          <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 mb-8">
            Watch Video <ArrowRight className="w-4 h-4" />
          </a>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Want a video like this?
          </h2>
          <p className="text-white/80 mb-5">Our production team is ready to bring your vision to life.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#2563EB] font-semibold px-6 py-3 rounded-xl hover:bg-[#f8fafc] transition-colors shadow-lg">
            Start Your Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
