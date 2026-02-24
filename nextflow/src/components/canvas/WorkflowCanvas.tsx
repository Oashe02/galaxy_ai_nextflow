'use client';

import React, { useMemo, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  Panel,
  useReactFlow,
  ConnectionMode,
  type NodeMouseHandler,
  type IsValidConnection,
} from '@xyflow/react';
import { useWorkflowStore, getHandleType, wouldCreateCycle } from '@/store/useWorkflowStore';
import { Maximize, MousePointer2, Trash2, Copy } from 'lucide-react';
import { 
  TextNode, 
  LLMNode, 
  UploadImageNode, 
  UploadVideoNode, 
  CropImageNode, 
  ExtractFrameNode 
} from '@/components/nodes/CustomNodes';

export default function WorkflowCanvas() {
  const nodes = useWorkflowStore(s => s.nodes);
  const edges = useWorkflowStore(s => s.edges);
  const isRunning = useWorkflowStore(s => s.running);
  const onNodesChange = useWorkflowStore(s => s.handleNodesChange);
  const onEdgesChange = useWorkflowStore(s => s.handleEdgesChange);
  const onConnect = useWorkflowStore(s => s.handleConnect);
  const onSelectionChange = useWorkflowStore(s => s.handleSelectionChange);
  const setVp = useWorkflowStore(s => s.setViewport);
  const sel = useWorkflowStore(s => s.selected);
  const delSelected = useWorkflowStore(s => s.deleteSelected);
  const clone = useWorkflowStore(s => s.cloneNode);

  const { fitView } = useReactFlow();

  const nodeTypes = useMemo(() => ({
    text: TextNode,
    llm: LLMNode,
    uploadImage: UploadImageNode,
    uploadVideo: UploadVideoNode,
    cropImage: CropImageNode,
    extractFrame: ExtractFrameNode,
  }), []);

  const checkConnection: IsValidConnection = useCallback((conn) => {
    const src = nodes.find(n => n.id === conn.source);
    const tgt = nodes.find(n => n.id === conn.target);
    if (!src || !tgt || !conn.sourceHandle || !conn.targetHandle) return false;
    const from = getHandleType(src.type ?? '', conn.sourceHandle);
    const to = getHandleType(tgt.type ?? '', conn.targetHandle);
    if (from !== to && from !== 'any' && to !== 'any') return false;
    if (wouldCreateCycle(edges, conn.source, conn.target)) return false;
    return true;
  }, [nodes, edges]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') return;

      if ((e.key === 'Delete' || e.key === 'Backspace') && sel.length > 0) {
        e.preventDefault();
        delSelected();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'd' && sel.length === 1) {
        e.preventDefault();
        clone(sel[0]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sel, delSelected, clone]);

  const onDblClick: NodeMouseHandler = useCallback((_ev, node) => {
    console.log('dblclick:', node.id);
  }, []);

  const animatedEdges = useMemo(() => {
    return edges.map(e => ({
      ...e,
      animated: isRunning ? true : e.animated,
      style: isRunning 
        ? { stroke: '#A855F7', strokeWidth: 3, filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.8))' } 
        : e.style,
    }));
  }, [edges, isRunning]);

  return (
    <div className="w-full h-full relative bg-[#050505]">
      {/* Decorative background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[50%] bg-purple-500/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[25%] -right-[10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>
      <ReactFlow
        nodes={nodes}
        edges={animatedEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange} 
        onMoveEnd={(_ev, vp) => setVp(vp)}
        onNodeDoubleClick={onDblClick}
        isValidConnection={checkConnection}
        nodeTypes={nodeTypes}
        colorMode="dark"
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        minZoom={0.05}
        maxZoom={3}
        connectionLineStyle={{ stroke: '#A855F7', strokeWidth: 3, strokeDasharray: '5,5' }}
        connectionMode={ConnectionMode.Loose}
        snapToGrid
        snapGrid={[20, 20]}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        deleteKeyCode={null} 
        multiSelectionKeyCode="Shift"
        selectionOnDrag
        panOnScroll
        selectNodesOnDrag={false}
      >
        <Background 
          variant={BackgroundVariant.Lines} 
          gap={30} size={1} color="rgba(255,255,255,0.03)" 
        />
        <Controls 
          className="!left-6 !bottom-6 !bg-black/60 !backdrop-blur-xl !border-white/5 !rounded-2xl !shadow-2xl !p-1"
          showInteractive={false}
        />
        <MiniMap 
          className="!right-6 !bottom-6 !bg-black/60 !backdrop-blur-xl !border-white/5 !rounded-2xl !shadow-2xl overflow-hidden"
          nodeStrokeWidth={4}
          maskColor="rgba(0, 0, 0, 0.6)"
          pannable zoomable
          nodeColor={(n) => {
            switch (n.type) {
              case 'llm': return '#A855F7';
              case 'text': return '#3B82F6';
              case 'uploadImage': return '#10B981';
              case 'uploadVideo': return '#EF4444';
              case 'cropImage': return '#F59E0B';
              case 'extractFrame': return '#06B6D4';
              default: return '#52525B';
            }
          }}
        />

        <Panel position="top-right" className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/5 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-300 shadow-xl">
            <MousePointer2 className="w-4 h-4 text-purple-400" /> Interaction Mode
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/5 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-300 shadow-xl"
            onClick={() => fitView({ duration: 800, padding: 0.2 })}
          >
            <Maximize className="w-4 h-4 text-purple-400" /> Center View
          </button>
        </Panel>

        {sel.length > 0 && (
          <Panel position="bottom-center" className="flex gap-2 mb-8 scale-110 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-2xl border border-purple-500/20 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest px-3 border-r border-white/5">{sel.length} SELECTED</span>
              {sel.length === 1 && (
                <button
                  onClick={() => clone(sel[0])}
                  className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300"
                  title="Duplicate (⌘D)"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={delSelected}
                className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-rose-500/80 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all duration-300"
                title="Delete (⌫)"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
}
