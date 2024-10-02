import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";

interface Props {
  num: number;
  className?: string;
}

const Star: React.FC<Props> = ({ num, className }) => {
  return (
    <div className={twMerge("space-x-0.5 text-orange-400", className)}>
      {[...Array(num)].map((_, i) => (
        <FontAwesomeIcon key={i} icon={faStar} />
      ))}
    </div>
  );
};

export default Star;
