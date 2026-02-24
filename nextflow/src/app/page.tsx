'use client';

import { useState } from "react";
import { SignedIn, SignedOut, SignUpButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Link from "next/link";
import { UserPlus, ArrowRight, Layout } from "lucide-react";
import { AppleCardsCarouselDemo } from "@/components/layout/AppleCardsCarousel";
import { ModelLogos } from "@/components/layout/ModelLogos";
import { BentoGrid } from "@/components/layout/BentoGrid";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const [activeWord, setActiveWord] = useState<'scratch' | 'character' | null>(null);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-x-hidden">
      <main className="relative pt-16 pb-4 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
              <span className="text-white">The most powerful AI</span>
              <br />
              <span className="text-white/40">suite for Creatives.</span>
            </h1>
            
            <p className="text-zinc-500 text-base md:text-2xl mx-auto tracking-tight font-medium max-w-3xl">
              Generate, enhance, and edit images, videos, or 3D meshes for free with AI.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ClerkLoaded>
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="h-14 w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#1d63ff] hover:bg-[#1652d9] text-white px-8 rounded-2xl text-[15px] font-bold transition-all shadow-lg shadow-blue-500/10 cursor-pointer">
                    <UserPlus className="w-5 h-5" />
                    Sign Up
                  </button>
                </SignUpButton>
                <Link href="/workflow" className="h-14 w-full sm:w-auto flex items-center justify-center gap-2.5 bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-white px-8 rounded-2xl text-[15px] font-bold transition-all cursor-pointer">
                  <Layout className="w-5 h-5 opacity-70" />
                  Launch App
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/workflow" className="h-14 w-full sm:w-auto flex items-center justify-center gap-3 bg-[#1d63ff] hover:bg-[#1652d9] text-white px-10 rounded-2xl text-lg font-bold transition-all shadow-xl">
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </SignedIn>
            </ClerkLoaded>
            
            <ClerkLoading>
              <div className="h-14 w-44 bg-zinc-900 animate-pulse rounded-2xl" />
            </ClerkLoading>
          </div>
        </div>

        <div className="mt-12 max-w-7xl mx-auto px-4">
          <div className="relative group rounded-[40px] border border-white/10 bg-[#050505] aspect-[16/10] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-50" />
            
            <div className="absolute top-10 left-10 w-48 h-10 bg-zinc-800/20 rounded-xl" />
            <div className="absolute top-10 right-10 w-10 h-10 bg-zinc-800/20 rounded-full" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 cursor-pointer">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-black border-b-[8px] border-b-transparent ml-1" />
              </div>
            </div>
            
            <div className="absolute bottom-12 left-12 flex gap-3">
              <div className="w-32 h-4 bg-zinc-800/30 rounded-full" />
              <div className="w-16 h-4 bg-zinc-800/30 rounded-full" />
            </div>
          </div>
        </div>

        <p className="text-zinc-400 text-sm text-center mx-auto tracking-tight mt-12 mb-20">
          Workflow showing image generation, video animation, asset management, and video upscaling in NextFlow.
        </p>

        <section className="mb-0">
          <AppleCardsCarouselDemo />
        </section>

        <section className="mb-0">
          <ModelLogos />
        </section>

        <section className="mb-0">
          <BentoGrid />
        </section>

        <Footer />
      </main>
    </div>
  );
}
