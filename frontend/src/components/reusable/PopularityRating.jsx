import React from "react";

const PopularityRating = ({ score }) => {
  // const percentage = Math.min(Math.max(score / 10, 0), 1) * 100; // Convert to percentage
  const percentage = score
  const colors = [
    { threshold: 20, color: "bg-red-500" },
    { threshold: 40, color: "bg-orange-500" },
    { threshold: 60, color: "bg-yellow-500" },
    { threshold: 80, color: "bg-lime-500" },
    { threshold: 100, color: "bg-green-700" },
  ];
  const color = colors.find((c) => percentage <= c.threshold)?.color || "bg-gray-500";

  return (
    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${color} text-white font-bold`}>
      {percentage.toFixed(2)}
    </div>
  );
};

export default PopularityRating;
