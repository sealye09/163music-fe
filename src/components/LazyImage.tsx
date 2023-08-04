import { useState, useEffect, FC } from "react";
import { twMerge } from "tailwind-merge";
import BlurImage from "@/assets/images/blur.jpeg";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  blurImage?: string;
}

const LazyImage: FC<LazyImageProps> = ({ src, alt, blurImage, className, ...rest }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  // 图片加载完成后，将图片的 src 替换为真实的图片地址
  useEffect(() => {
    const image = new Image();
    image.src = src as string;
    image.onload = () => {
      setIsLoading(false);
      setImageSrc(src as string);
    };
  }, [src]);

  return (
    <div className={twMerge("relative")}>
      {isLoading && (
        <img
          className={twMerge(
            "absolute inset-0 w-full h-full object-cover filter blur-sm",
            className
          )}
          src={blurImage || BlurImage}
          alt={alt}
        />
      )}
      <img
        className={twMerge(className, isLoading ? "opacity-0" : "opacity-100")}
        src={imageSrc}
        alt={alt}
        {...rest}
      />
    </div>
  );
};

export default LazyImage;
