import { BaseNode } from './BaseNode';
import { Layers, Type } from 'lucide-react';

export function TextNode({ data, selected }: any) {
  return (
    <BaseNode
      title="Text Node"
      selected={selected}
      icon={<Type className="w-3.5 h-3.5 text-blue-400" />}
      outputs={[{ id: 'text', label: 'Text' }]}
    >
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Input Text</label>
        <textarea 
          value={data.text || ''}
          onChange={(e) => {
          }}
          placeholder="Enter prompt or text..."
          className="w-full h-24 bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs focus:outline-none focus:border-purple-500 transition-colors resize-none placeholder:text-zinc-700"
        />
      </div>
    </BaseNode>
  );
}

export function LLMNode({ data, selected }: any) {
  return (
    <BaseNode
      title="Run Any LLM"
      selected={selected}
      icon={<Layers className="w-3.5 h-3.5 text-purple-400" />}
      inputs={[
        { id: 'system_prompt', label: 'System' },
        { id: 'user_message', label: 'User' },
        { id: 'images', label: 'Images' }
      ]}
      outputs={[{ id: 'output', label: 'Result' }]}
    >
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Model</label>
          <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-purple-500 transition-colors cursor-pointer">
            <option>Gemini 1.5 Pro</option>
            <option>Gemini 1.5 Flash</option>
            <option>Gemini 2.0 Flash</option>
          </select>
        </div>
        
        <div className="p-2 border border-dashed border-zinc-800 rounded-lg text-center">
          <span className="text-[10px] text-zinc-600 font-medium">Connect inputs to run</span>
        </div>
      </div>
    </BaseNode>
  );
}

export function UploadImageNode({ data, selected }: any) {
  return (
    <BaseNode
      title="Upload Image"
      selected={selected}
      icon={<Layers className="w-3.5 h-3.5 text-green-400" />}
      outputs={[{ id: 'image', label: 'Image URL' }]}
    >
      <div className="space-y-3">
        <div className="h-28 bg-zinc-950 border border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center gap-2 group/upload cursor-pointer hover:border-purple-500/50 transition-colors">
          <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover/upload:bg-zinc-800 transition-colors">
            <Layers className="w-4 h-4 text-zinc-500 group-hover/upload:text-purple-400" />
          </div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase">Upload Image</span>
        </div>
      </div>
    </BaseNode>
  );
}

export function CropImageNode({ data, selected }: any) {
  return (
    <BaseNode
      title="Crop Image"
      selected={selected}
      icon={<Layers className="w-3.5 h-3.5 text-orange-400" />}
      inputs={[{ id: 'image', label: 'Image' }]}
      outputs={[{ id: 'output', label: 'Cropped' }]}
    >
      <div className="grid grid-cols-2 gap-2 mt-1">
        {['X', 'Y', 'W', 'H'].map((label) => (
          <div key={label} className="space-y-1">
            <label className="text-[9px] font-bold text-zinc-600 tracking-widest">{label}%</label>
            <input 
              type="number" 
              defaultValue={label === 'W' || label === 'H' ? 100 : 0}
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-[10px] focus:outline-none focus:border-purple-500" 
            />
          </div>
        ))}
      </div>
    </BaseNode>
  );
}

export function UploadVideoNode({ data, selected }: any) {
  return (
    <BaseNode
      title="Upload Video"
      selected={selected}
      icon={<Layers className="w-3.5 h-3.5 text-red-500" />}
      outputs={[{ id: 'video', label: 'Video URL' }]}
    >
      <div className="space-y-3">
        <div className="h-28 bg-zinc-950 border border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center gap-2 group/upload cursor-pointer hover:border-purple-500/50 transition-colors">
          <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover/upload:bg-zinc-800 transition-colors">
            <Layers className="w-4 h-4 text-zinc-500 group-hover/upload:text-purple-400" />
          </div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase">Upload Video</span>
        </div>
      </div>
    </BaseNode>
  );
}

export function ExtractFrameNode({ data, selected }: any) {
  return (
    <BaseNode
      title="Extract Frame"
      selected={selected}
      icon={<Layers className="w-3.5 h-3.5 text-cyan-400" />}
      inputs={[{ id: 'video', label: 'Video' }]}
      outputs={[{ id: 'output', label: 'Frame' }]}
    >
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Timestamp</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="0"
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-[10px] focus:outline-none focus:border-purple-500" 
          />
          <select className="bg-zinc-950 border border-zinc-800 rounded px-1 text-[9px] text-zinc-400">
            <option>sec</option>
            <option>%</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
}
