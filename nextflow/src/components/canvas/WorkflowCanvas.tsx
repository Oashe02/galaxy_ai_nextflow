'use client';

import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  Panel,
} from '@xyflow/react';
import { useWorkflowStore } from '@/store/useWorkflowStore';
import { Maximize, MousePointer2 } from 'lucide-react';

export default function WorkflowCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useWorkflowStore();

  return (
    <div className="w-full h-full relative bg-black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode="dark"
        fitView
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
          className="!left-4 !bottom-4 border-zinc-800"
        />
        
        <MiniMap 
          className="!right-4 !bottom-4"
          nodeStrokeWidth={3}
          maskColor="rgba(0, 0, 0, 0.6)"
          // @ts-ignore - custom minimap styling
          nodeColor={(n) => {
            if (n.type === 'input') return '#22C55E';
            if (n.type === 'output') return '#F43F5E';
            return '#3F3F46';
          }}
        />

        <Panel position="top-right" className="flex gap-2">
          <button 
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
            onClick={() => {}}
          >
            <MousePointer2 className="w-4 h-4" />
            Select
          </button>
          <button 
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
            onClick={() => {}}
          >
            <Maximize className="w-4 h-4" />
            Fit View
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
}
