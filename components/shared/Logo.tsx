import Image from "next/image";

export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl shadow-[0_4px_12px_rgba(37,99,235,0.3)]"
      style={{ width: size, height: size }}
    >
      <Image
        src="/branding/queuecap-logo.png"
        alt="QueueCap logo"
        fill
        sizes={`${size}px`}
        className="object-cover"
      />
    </div>
  );
}
