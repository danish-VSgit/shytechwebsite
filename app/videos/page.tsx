import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { videosQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Video } from "@/sanity/lib/types";
import { Play, Clock, ArrowRight, ExternalLink } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Videos | SHYTECH",
  description: "Watch our portfolio of event films, wedding videos, corporate productions, and AI-generated content.",
};

function getEmbedUrl(url: string): string | null {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return null;
}

function VideoCard({ video }: { video: Video }) {
  const thumbnailUrl = video.thumbnail ? urlFor(video.thumbnail).width(600).height(360).url() : null;
  const isExternal = video.videoType === "url" && video.videoUrl;

  return (
    <div className="group rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white hover:border-[#2563EB]/25 hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)] hover:-translate-y-1 transition-all duration-300">
      <Link href={`/videos/${video.slug.current}`}>
        <div className="relative h-52 overflow-hidden bg-[#f1f5f9]">
          {thumbnailUrl ? (
            <Image src={thumbnailUrl} alt={video.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#eff6ff]">
              <Play className="w-12 h-12 text-[#2563EB]/40" />
            </div>
          )}
          <div className="absolute inset-0 bg-[#0f172a]/20 group-hover:bg-[#0f172a]/30 transition-colors" />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-[#2563EB] ml-1" />
            </div>
          </div>
          {video.duration && (
            <div className="absolute bottom-3 right-3">
              <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#0f172a]/70 text-white text-xs font-medium">
                <Clock className="w-3 h-3" /> {video.duration}
              </span>
            </div>
          )}
          {video.category && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                {video.category.replace(/-/g, " ")}
              </span>
            </div>
          )}
          {isExternal && (
            <div className="absolute top-3 right-3">
              <div className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-3.5 h-3.5 text-[#2563EB]" />
              </div>
            </div>
          )}
        </div>
      </Link>
      <div className="p-5">
        <Link href={`/videos/${video.slug.current}`}>
          <h3 className="font-bold text-[#0f172a] mb-1.5 group-hover:text-[#2563EB] transition-colors line-clamp-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            {video.title}
          </h3>
        </Link>
        {video.description && <p className="text-sm text-[#64748b] line-clamp-2 mb-3">{video.description}</p>}
        {video.publishedAt && (
          <p className="text-xs text-[#94a3b8]">
            {new Date(video.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        )}
      </div>
    </div>
  );
}

export default async function VideosPage() {
  let videos: Video[] = [];
  try {
    videos = await client.fetch<Video[]>(videosQuery);
  } catch {
    videos = [];
  }

  const showreels = videos.filter((v) => v.category === "showreel");
  const rest = videos.filter((v) => v.category !== "showreel");

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-36 pb-16 bg-gradient-to-b from-[#f8fafc] to-white">
        <div className="container-width text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563EB]/20 bg-[#eff6ff] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#2563EB]">Video Portfolio</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#0f172a] mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Our <span className="accent-text">Videos</span>
          </h1>
          <p className="text-lg text-[#475569] max-w-2xl mx-auto">
            From cinematic wedding films to AI-generated brand campaigns — watch what we create.
          </p>
        </div>
      </section>

      <div className="container-width pb-20">
        {videos.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🎥</div>
            <h2 className="text-xl font-semibold text-[#334155] mb-2">No videos yet</h2>
            <p className="text-[#64748b] mb-8">Video content will appear here once added via the admin panel.</p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Commission a Video <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-16">
            {showreels.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-[#0f172a] mb-6" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Showreel</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {showreels.map((v) => <VideoCard key={v._id} video={v} />)}
                </div>
              </section>
            )}
            {rest.length > 0 && (
              <section>
                {showreels.length > 0 && (
                  <h2 className="text-2xl font-bold text-[#0f172a] mb-6" style={{ fontFamily: "var(--font-plus-jakarta)" }}>All Videos</h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((v) => <VideoCard key={v._id} video={v} />)}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
