import { Handle, Position } from '@xyflow/react';
import { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BaseNodeProps {
  id?: string;
  selected?: boolean;
  title: string;
  icon?: ReactNode;
  children?: ReactNode;
  inputs?: Array<{ id: string; label: string }>;
  outputs?: Array<{ id: string; label: string }>;
  executing?: boolean;
}

export function BaseNode({
  selected,
  title,
  icon,
  children,
  inputs = [],
  outputs = [],
  executing = false,
}: BaseNodeProps) {
  return (
    <div className={cn(
      "group relative min-w-[260px] rounded-2xl bg-black/60 backdrop-blur-2xl border transition-all duration-500",
      selected && !executing 
        ? "border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.15)] ring-1 ring-purple-500/20 translate-y-[-2px]" 
        : "border-white/5 hover:border-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]",
      executing && "node-executing border-purple-400"
    )}>
      {/* Node Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-black/40 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase leading-none mb-1">Node</span>
          <span className="text-xs font-bold tracking-tight text-white uppercase leading-none">{title}</span>
        </div>
      </div>

      {/* Node Content */}
      <div className="p-4 nodrag nopan">
        {children}
      </div>

      {/* Handles - Inputs (Left) */}
      <div className="absolute top-14 -left-[6px] flex flex-col gap-8">
        {inputs.map((input) => (
          <div key={input.id} className="relative flex items-center">
            <Handle
              type="target"
              position={Position.Left}
              id={input.id}
              className="!w-3 !h-3 !bg-zinc-800 !border-2 !border-black hover:!bg-purple-500 hover:!border-purple-400/50 transition-all duration-300 shadow-lg"
            />
            <div className="absolute left-6 px-1.5 py-0.5 rounded bg-black/80 border border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-[-10px] group-hover:translate-x-0">
               <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap">
                {input.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Handles - Outputs (Right) */}
      <div className="absolute top-14 -right-[6px] flex flex-col gap-8">
        {outputs.map((output) => (
          <div key={output.id} className="relative flex items-center justify-end">
            <div className="absolute right-6 px-1.5 py-0.5 rounded bg-black/80 border border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-[10px] group-hover:translate-x-0">
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap">
                {output.label}
              </span>
            </div>
            <Handle
              type="source"
              position={Position.Right}
              id={output.id}
              className="!w-3 !h-3 !bg-zinc-800 !border-2 !border-black hover:!bg-purple-500 hover:!border-purple-400/50 transition-all duration-300 shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
