import { useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface SafeImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  fallback?: string;
  alt: string;
}

export function SafeImage({
  src,
  fallback = "/images/hero-church.jpg",
  alt,
  className,
  loading = "lazy",
  onError,
  ...rest
}: SafeImageProps) {
  const [current, setCurrent] = useState(src);
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={current}
      alt={alt}
      loading={loading}
      className={cn("transition-opacity duration-500", loaded ? "opacity-100" : "opacity-0", className)}
      onLoad={() => setLoaded(true)}
      onError={(event) => {
        const img = event.currentTarget;
        if (img.dataset.fallback === "1") {
          onError?.(event);
          return;
        }
        img.dataset.fallback = "1";
        setCurrent(fallback);
        onError?.(event);
      }}
      {...rest}
    />
  );
}
