"use client";

const INVESTORS = [
  { name: "ANDREESSEN HOROWITZ", color: "text-zinc-400" },
  { name: "BCV", color: "text-blue-600" },
  { name: "GRADIENT", color: "text-zinc-800", isStrong: true },
  { name: "Pebblebed", color: "text-zinc-800" },
  { name: "HF0", color: "text-zinc-800", isIcon: true },
  { name: "Abstract.", color: "text-zinc-800" },
];

export function Footer() {
  return (
    <footer className="w-full bg-white overflow-hidden">

      <div className="border-t border-zinc-100 mt-4" />

      {/* Main Footer Sitemap */}
      <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 lg:grid-cols-4 gap-12 border-b border-zinc-100">
        <div className="space-y-6">
           <h3 className="text-sm font-black text-black">NextFlow</h3>
           <ul className="space-y-4">
             {["Log In", "Pricing", "Enterprise", "Gallery"].map(link => (
               <li key={link} className="text-zinc-500 hover:text-black cursor-pointer transition-colors text-sm font-medium">{link}</li>
             ))}
           </ul>
        </div>
        <div className="space-y-6">
           <h3 className="text-sm font-black text-black">Products</h3>
           <ul className="space-y-4">
             {["Image Generator", "Video Generator", "Enhancer", "Realtime", "Edit"].map(link => (
               <li key={link} className="text-zinc-500 hover:text-black cursor-pointer transition-colors text-sm font-medium">{link}</li>
             ))}
           </ul>
        </div>
        <div className="space-y-6">
           <h3 className="text-sm font-black text-black">Resources</h3>
           <ul className="space-y-4">
             {["Pricing", "Careers", "Terms of Service", "Privacy Policy", "Documentation"].map(link => (
               <li key={link} className="text-zinc-500 hover:text-black cursor-pointer transition-colors text-sm font-medium">{link}</li>
             ))}
           </ul>
        </div>
        <div className="space-y-6">
           <h3 className="text-sm font-black text-black">About</h3>
           <ul className="space-y-4">
             {["Blog", "Discord"].map(link => (
               <li key={link} className="text-zinc-500 hover:text-black cursor-pointer transition-colors text-sm font-medium">{link}</li>
             ))}
           </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <span className="text-zinc-400 text-sm font-medium">© 2026 NextFlow</span>
      </div>
    </footer>
  );
}
