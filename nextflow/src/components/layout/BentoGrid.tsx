"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BentoGrid = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 bg-black">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[18rem]">
        {/* Row 1 */}
        <BentoCard
          className="md:col-span-2 md:row-span-1 bg-zinc-900 overflow-hidden group"
          title="Industry-leading inference speed"
          bgImage="https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2070&auto=format&fit=crop"
          textColor="text-white"
        />
        <BentoCard
          className="md:col-span-1 bg-zinc-100 flex flex-col justify-center items-center text-center p-8"
          title="Pixels upscaling"
          header="22K"
          textColor="text-black"
        />
        <BentoCard
          className="md:col-span-1 bg-zinc-100 p-8 flex flex-col justify-end"
          title="Fine-tune models with your own data"
          header="Train"
          textColor="text-black"
        />

        {/* Row 2 */}
        <BentoCard
          className="md:col-span-1 bg-zinc-900 overflow-hidden group"
          title="Native image generation"
          header="4K"
          bgImage="https://images.unsplash.com/photo-1544465531-53c29370ad03?q=80&w=2070&auto=format&fit=crop"
          textColor="text-white"
        />
        <BentoCard
          className="md:col-span-2 bg-zinc-900 overflow-hidden group p-12 flex flex-col justify-center items-center text-center"
          title="Ultra-realistic flagship model"
          header="NextFlow 1"
          bgImage="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
          textColor="text-white"
          titleSize="text-4xl md:text-6xl"
        />
        <div className="md:col-span-1 grid grid-rows-2 gap-4">
            <BentoCard
                className="bg-white p-6 flex flex-col justify-center"
                title="Safely generate proprietary data"
                header="Do not train"
                textColor="text-black"
                headerSize="text-xl"
            />
            <BentoCard
                className="bg-zinc-100 p-6 flex flex-col justify-center items-center"
                title="Models"
                header="64+"
                textColor="text-black"
                headerSize="text-4xl"
            />
        </div>

        {/* Row 3 - Mini cards */}
        <BentoCard
          className="md:col-span-1 bg-zinc-900 overflow-hidden group"
          title="Asset manager"
          bgImage="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=2070&auto=format&fit=crop"
          textColor="text-white"
        />
        <BentoCard
          className="md:col-span-1 bg-zinc-100 p-8 flex flex-col justify-center items-center text-center"
          title="Watch the progress"
          header="Realtime"
          textColor="text-black"
        />
         <BentoCard
          className="md:col-span-1 bg-zinc-900 overflow-hidden group"
          title="Style transfer"
          bgImage="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2070&auto=format&fit=crop"
          textColor="text-white"
        />
        <BentoCard
          className="md:col-span-1 bg-zinc-100 p-8 flex flex-col justify-center items-center text-center"
          title="Interactive Design"
          header="Canvas"
          textColor="text-black"
        />
      </div>
    </section>
  );
};

const BentoCard = ({ 
    className, 
    title, 
    header, 
    bgImage, 
    textColor = "text-white",
    headerSize = "text-5xl",
    titleSize = "text-xl"
}: { 
    className?: string; 
    title?: string;
    header?: string;
    bgImage?: string;
    textColor?: string;
    headerSize?: string;
    titleSize?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative rounded-[2rem] p-4 transition-all duration-300",
        className
      )}
    >
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}
      <div className="relative z-10 h-full flex flex-col">
        {header && (
          <h3 className={cn("font-black tracking-tighter mb-1", headerSize, textColor)}>
            {header}
          </h3>
        )}
        {title && (
          <p className={cn("font-semibold tracking-tight", titleSize, textColor, !header && "mt-auto")}>
            {title}
          </p>
        )}
      </div>
    </motion.div>
  );
};
