import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  ConnectionMode,
} from 'reactflow';
import 'reactflow/dist/style.css';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { Play, Save, Zap } from 'lucide-react';

import InputNode from './components/InputNode';
import OutputNode from './components/OutputNode';
import './index.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const nodeTypes = {
  inputNode: InputNode,
  outputNode: OutputNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'inputNode',
    position: { x: 100, y: 150 },
    data: { value: '' },
  },
  {
    id: '2',
    type: 'outputNode',
    position: { x: 600, y: 150 },
    data: { value: '', isLoading: false, isError: false },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isRunning, setIsRunning] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } }, eds)),
    [setEdges]
  );

  const handlePromptChange = (val) => {
    setPrompt(val);
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          node.data = { ...node.data, value: val, onChange: handlePromptChange };
        }
        return node;
      })
    );
  };

  React.useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          node.data = { ...node.data, onChange: handlePromptChange };
        }
        return node;
      })
    );
  }, [setNodes]);

  const handleRunFlow = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first!");
      return;
    }

    setIsRunning(true);
    setResponse('');

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '2') {
          node.data = { ...node.data, isLoading: true, isError: false, value: '' };
        }
        return node;
      })
    );

    try {
      const res = await axios.post(`${API_URL}/ask-ai`, { prompt });
      const aiResponse = res.data.response;
      setResponse(aiResponse);

      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === '2') {
            node.data = { ...node.data, isLoading: false, value: aiResponse };
          }
          return node;
        })
      );
      toast.success("AI response generated!");
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.details?.error?.message || error.response?.data?.error || error.message || 'Unknown error';

      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === '2') {
            node.data = { ...node.data, isLoading: false, isError: true, value: `Error: ${errorMessage}` };
          }
          return node;
        })
      );
      toast.error("Failed to generate response");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSave = async () => {
    if (!prompt || !response) {
      toast.warning("Generate a flow response before saving.");
      return;
    }

    try {
      await axios.post(`${API_URL}/save`, { prompt, response });
      toast.success("Flow saved to database successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save flow to database.");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-50">
      <Toaster position="top-center" richColors />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">AI Flow Builder</h1>
            <p className="text-xs text-slate-500 font-medium">Visual Prompt Engineering</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleRunFlow}
            disabled={isRunning || !prompt}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed
             text-white font-medium rounded-lg shadow-lg hover:shadow-indigo-500/20 transition-all active:scale-95"
          >
            <Play className={`w-4 h-4 ${isRunning ? 'animate-spin' : 'fill-current'}`} />
            {isRunning ? 'Running...' : 'Run Flow'}
          </button>

          <button
            onClick={handleSave}
            disabled={isRunning || !response}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 
            text-slate-700 font-medium rounded-lg shadow-sm transition-all active:scale-95 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            Save Flow
          </button>
        </div>
      </header>

      {/* Canvas */}
      <div className="flex-1 w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          className="bg-slate-50"
        >
          <Background color="#cbd5e1" gap={20} size={1} />
          <Controls className="!bg-white !border-slate-200 !shadow-lg !rounded-lg" />
        </ReactFlow>
      </div>
    </div>
  );
}
