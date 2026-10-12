type BgImageProps = {
  /** Image path in /public. The fallback shows until the file exists. */
  src: string;
  className?: string;
  /** Any CSS background layer(s) — a gradient or another url(). */
  fallback?: string;
  position?: string;
};

export default function BgImage({
  src,
  className = "",
  fallback = "linear-gradient(135deg, #1a2440 0%, #0b1220 100%)",
  position = "center",
}: BgImageProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 bg-cover ${className}`}
      style={{ backgroundImage: `url(${src}), ${fallback}`, backgroundPosition: position }}
    />
  );
}
