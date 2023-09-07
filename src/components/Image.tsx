import { useState, useEffect, FC, useRef } from "react";
import { twMerge } from "tailwind-merge";

import PicSkeleton from "./Skeleton/PicSkeleton";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  height?: string;
  width?: string;
  blurImage?: string;
}

const SImage: FC<LazyImageProps> = ({ height, width, src, alt, blurImage, className, ...rest }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const blurImageRef = useRef<HTMLImageElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isBlurImageLoading, setIsBlurImageLoading] = useState(true);

  const blurImageSrc = blurImage ? blurImage : src + "?param=10y10";

  // 图片加载
  useEffect(() => {
    if (!src || !imgRef.current) return;
    imgRef.current.src = src;
    imgRef.current.onload = () => {
      console.log("图片加载完成");
      setIsLoading(false);
    };
  }, [src]);

  // 模糊图片加载
  useEffect(() => {
    if (!blurImageSrc || !blurImageRef.current) return;
    blurImageRef.current.src = blurImageSrc;
    blurImageRef.current.onload = () => {
      console.log("模糊图片加载完成");
      setIsBlurImageLoading(false);
    };
  }, [blurImageSrc]);

  return (
    <div className={twMerge("relative", height, width)}>
      {isBlurImageLoading && <PicSkeleton className="absolute inset-0 w-full h-full rounded-md" />}

      {isLoading && (
        <img
          className={twMerge(
            "absolute inset-0 w-full h-full object-cover filter blur-sm",
            className
          )}
          ref={blurImageRef}
          alt={alt}
        />
      )}

      <img
        className={twMerge(isLoading ? "opacity-0" : "opacity-100", "h-full w-full", className)}
        ref={imgRef}
        alt={alt}
        {...rest}
      />
    </div>
  );
};

export default SImage;
