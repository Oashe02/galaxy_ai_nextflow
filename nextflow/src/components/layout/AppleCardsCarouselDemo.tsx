"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-8 bg-white">
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="bg-[#0A0A0A] p-8 md:p-14 rounded-3xl mb-4 border border-white/5">
      <p className="text-zinc-400 text-base md:text-2xl font-sans max-w-3xl mx-auto leading-relaxed">
        <span className="font-bold text-white block mb-4">
          {title}
        </span>
        {description}
      </p>
      <div className="mt-12 rounded-2xl overflow-hidden border border-white/10 aspect-video relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
            </div>
        </div>
      </div>
    </div>
  );
};

const data = [
  {
    category: "Workflow",
    title: "Nodes for everything.",
    src: "https://images.unsplash.com/photo-1633103403328-86d77366b1a9?q=80&w=2070&auto=format&fit=crop",
    content: <DummyContent title="Extensive Node Library" description="From LLMs to Image Filters, our library has everything you need to build the future of AI content generation." />,
  },
  {
    category: "AI Generation",
    title: "Cinematic quality visuals.",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop",
    content: <DummyContent title="Ultra-Realistic Output" description="Connect Flux, Midjourney, or Stable Diffusion nodes to create stunning 8K visuals in seconds." />,
  },
  {
    category: "Automation",
    title: "Deploy with one click.",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop",
    content: <DummyContent title="Trigger.dev Integration" description="Automate your creative process. Schedule runs, set webhooks, and scale your generation effortlessly." />,
  },
  {
    category: "Video",
    title: "Animate your imagination.",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop",
    content: <DummyContent title="Dynamic Animation Nodes" description="Morph styles, interpolation frames, and generate motion vectors with our specialized video suite." />,
  },
  {
    category: "Customization",
    title: "Train your own LoRA.",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop",
    content: <DummyContent title="Personalized Models" description="Upload your dataset and train custom Flux LoRAs directly within the workflow canvas." />,
  },
];
