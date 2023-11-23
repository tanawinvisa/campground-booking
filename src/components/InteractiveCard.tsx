import React from "react";

export default function InteractiveCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative  w-[300px] h-[280px] rounded-lg shadow-lg bg-white border-[1px] border-gray-500 dark:bg-[#1a1a2e] dark:border-[#303040] 
                    hover:shadow-2xl hover:bg-neutral-200 hover:scale-105 transition-all duration-300 ease-in-out"
      style={{ borderRadius: "10px" }}
    >
      {children}
    </div>
  );
}
