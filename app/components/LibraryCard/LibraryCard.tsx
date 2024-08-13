import React from "react";
import ChevronrightIcon from "@/app/svgs/ChevronrightIcon";

interface LibraryCardProps {
  title?: string;
  subtitle: string;
  showDescription: boolean;
  showIcon?: boolean;
  iconRight?: boolean;
  Icon?: React.ReactNode;
  showShadow?: boolean;
  subtitleClassName?: string;
  hasPadding?: boolean;
}

const LibraryCard: React.FC<LibraryCardProps> = ({
  title,
  subtitle,
  showDescription,
  showIcon,
  iconRight,
  Icon,
  showShadow,
  subtitleClassName,
  hasPadding = true,
}) => {
  return (
    <div className="mt-[1.5rem]">
      <div
        className={`flex items-center justify-between bg-white rounded-md ${
          showDescription ? "" : ""
        } ${showShadow ? "custom-box-shadow" : ""} ${
          hasPadding ? "p-[1.2rem]" : ""
        }`}
      >
        {iconRight ? (
          <div className="flex items-center justify-between w-full">
            <div>
              <h2 className="text-[1.6rem] font-bold">{title}</h2>
              {subtitle && (
                <p className={`text-[1.4rem] font-normal ${subtitleClassName}`}>
                  {subtitle}
                </p>
              )}
            </div>
            <div className="ml-[1.6rem]">{Icon}</div>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="mr-[1.6rem]">{Icon}</div>
            <div>
              <h2 className="text-[1.6rem] leading-tight font-bold">{title}</h2>
              {showDescription && subtitle && (
                <p
                  className={`text-[1.4rem] leading-normal	 font-normal ${subtitleClassName}`}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}
        <div>{showIcon && <ChevronrightIcon />}</div>
      </div>
    </div>
  );
};

export default LibraryCard;
