'use client';

import WorkflowCanvas from '@/components/canvas/WorkflowCanvas';
import { useWorkflowStore } from '@/store/useWorkflowStore';
import { Search, Play, History, Type, Image as ImageIcon, Video, Layers, Settings, User, Scissors, Crop, Share2 } from 'lucide-react';
import { ReactFlowProvider } from '@xyflow/react';

const NODE_TYPES = [
  { name: 'Text Node', icon: Type, type: 'text', color: 'text-blue-400' },
  { name: 'Upload Image', icon: ImageIcon, type: 'uploadImage', color: 'text-green-400' },
  { name: 'Upload Video', icon: Video, type: 'uploadVideo', color: 'text-red-400' },
  { name: 'Run Any LLM', icon: Play, type: 'llm', color: 'text-purple-400' },
  { name: 'Crop Image', icon: Crop, type: 'cropImage', color: 'text-orange-400' },
  { name: 'Extract Frame', icon: Share2, type: 'extractFrame', color: 'text-cyan-400' },
];

export default function WorkflowPage() {
  const addNode = useWorkflowStore((state) => state.addNode);

  const handleAddNode = (nodeName: string, type: string) => {
    const id = `${type}-${Date.now()}`;
    addNode({
      id,
      type: type,
      position: { x: 400 + Math.random() * 100, y: 300 + Math.random() * 100 },
      data: { label: nodeName, text: '' },
    });
  };

  return (
    <ReactFlowProvider>
      <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-black text-white selection:bg-purple-500/30">
        <aside className="w-64 border-r border-zinc-900 flex flex-col bg-[#050505] z-20">
          <div className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search nodes..." 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1 mb-3">Quick Access</h3>
                <div className="grid grid-cols-1 gap-2">
                  {NODE_TYPES.map((node) => (
                    <button 
                      key={node.name}
                      onClick={() => handleAddNode(node.name, node.type)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900 transition-all text-sm font-medium group text-zinc-300 hover:text-white"
                    >
                      <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
                        <node.icon className={`w-4 h-4 ${node.color} opacity-70 group-hover:opacity-100 transition-all`} />
                      </div>
                      {node.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-auto p-4 border-t border-zinc-900 text-[10px] text-zinc-600 font-medium bg-black/50 backdrop-blur-sm">
            NEXTFLOW v0.1.0 • ALPHA
          </div>
        </aside>

        <main className="flex-1 relative flex flex-col">
          <div className="h-12 border-b border-zinc-900 bg-[#050505] flex items-center justify-between px-4 z-10">
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-semibold tracking-tight text-zinc-200">Untitled Workflow</h2>
              <div className="h-4 w-px bg-zinc-800" />
              <span className="text-[11px] text-zinc-500 font-medium bg-zinc-900/50 px-2 py-0.5 rounded border border-zinc-800">Draft</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-purple-500/10 active:scale-95">
                <Play className="w-3.5 h-3.5 fill-current" />
                Run Workflow
              </button>
              <button className="p-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-full transition-colors">
                <Settings className="w-4 h-4 text-zinc-400" />
              </button>
            </div>
          </div>

          <div className="flex-1">
            <WorkflowCanvas />
          </div>
        </main>

        <aside className="w-72 border-l border-zinc-900 flex flex-col bg-[#050505] z-20">
          <div className="p-4 border-b border-zinc-900 flex items-center justify-between">
            <h3 className="text-xs font-bold text-zinc-200 flex items-center gap-2">
              <History className="w-3.5 h-3.5 text-purple-400" />
              Workflow History
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
                <History className="w-6 h-6 text-zinc-700" />
              </div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">No history yet</p>
              <p className="text-[10px] max-w-[180px] mt-2 text-zinc-600 leading-relaxed font-medium">
                Executions will appear here after you run your workflow.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </ReactFlowProvider>
  );
}
