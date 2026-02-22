import { create } from 'zustand';
import {
    type Edge,
    type Node,
    type OnNodesChange,
    type OnEdgesChange,
    type OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    type Connection,
} from '@xyflow/react';

interface WorkflowState {
    nodes: Node[];
    edges: Edge[];
    selectedNodes: string[];
    executionState: Record<string, 'idle' | 'running' | 'success' | 'failed'>;

    // Actions
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    addNode: (node: Node) => void;
    updateExecutionState: (nodeId: string, state: 'idle' | 'running' | 'success' | 'failed') => void;
    setSelectedNodes: (nodeIds: string[]) => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
    nodes: [],
    edges: [],
    selectedNodes: [],
    executionState: {},

    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    onConnect: (connection: Connection) => {
        set({
            edges: addEdge({ ...connection, animated: true, style: { stroke: '#8B5CF6' } }, get().edges),
        });
    },

    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),

    addNode: (node) => set((state) => ({
        nodes: [...state.nodes, node]
    })),

    updateExecutionState: (nodeId, state) => {
        set((s) => ({
            executionState: { ...s.executionState, [nodeId]: state },
        }));
    },

    setSelectedNodes: (nodeIds) => set({ selectedNodes: nodeIds }),
}));
