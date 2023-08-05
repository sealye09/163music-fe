import { useState, useEffect, FC, useRef } from "react";
import { twMerge } from "tailwind-merge";
import BlurImage from "@/assets/images/blur.jpeg";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  blurImage?: string;
}

const SImage: FC<LazyImageProps> = ({ src, alt, blurImage, className, ...rest }) => {
  const imgRef = useRef<HTMLImageElement>(new Image());
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!src) return;
    imgRef.current.src = src;
    imgRef.current.onload = () => {
      console.log("图片加载完成");
      setIsLoading(false);
      setImageSrc(src);
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

export default SImage;
