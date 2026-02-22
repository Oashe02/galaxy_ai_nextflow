'use client';

import React, { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  Panel,
  useReactFlow,
} from '@xyflow/react';
import { useWorkflowStore } from '@/store/useWorkflowStore';
import { Maximize, MousePointer2 } from 'lucide-react';
import { 
  TextNode, 
  LLMNode, 
  UploadImageNode, 
  UploadVideoNode, 
  CropImageNode, 
  ExtractFrameNode 
} from '@/components/nodes/CustomNodes';

export default function WorkflowCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onSelectionChange,
  } = useWorkflowStore();

  const { fitView } = useReactFlow();

  const nodeTypes = useMemo(() => ({
    text: TextNode,
    llm: LLMNode,
    uploadImage: UploadImageNode,
    uploadVideo: UploadVideoNode,
    cropImage: CropImageNode,
    extractFrame: ExtractFrameNode,
  }), []);

  return (
    <div className="w-full h-full relative bg-black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes}
        colorMode="dark"
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        minZoom={0.2}
        maxZoom={4}
        // Krea-like connection line
        connectionLineStyle={{ stroke: '#8B5CF6', strokeWidth: 2 }}
        snapToGrid={true}
        snapGrid={[20, 20]}
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1} 
          color="#27272A" 
        />
        
        <Controls 
          className="!left-4 !bottom-4 !bg-[#0A0A0A] !border-zinc-800"
        />
        
        <MiniMap 
          className="!right-4 !bottom-4 !bg-[#0A0A0A] !border-zinc-800"
          nodeStrokeWidth={3}
          maskColor="rgba(0, 0, 0, 0.7)"
          nodeColor={(n) => {
            switch (n.type) {
              case 'llm': return '#8B5CF6';
              case 'text': return '#3B82F6';
              case 'uploadImage': return '#10B981';
              case 'uploadVideo': return '#EF4444';
              case 'cropImage': return '#F59E0B';
              case 'extractFrame': return '#06B6D4';
              default: return '#3F3F46';
            }
          }}
        />

        <Panel position="top-right" className="flex gap-2">
          <button 
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all shadow-sm"
          >
            <MousePointer2 className="w-4 h-4" />
            Select
          </button>
          <button 
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all shadow-sm"
            onClick={() => fitView({ duration: 400 })}
          >
            <Maximize className="w-4 h-4" />
            Fit View
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
}
