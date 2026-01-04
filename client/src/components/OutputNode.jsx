import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Loader2, AlertCircle, Sparkles } from 'lucide-react';

const OutputNode = ({ data }) => {
    return (
        <div className={`bg-white rounded-xl shadow-xl border w-[350px] overflow-hidden transition-all hover:shadow-2xl 
      ${data.isError ? 'border-red-200' : 'border-slate-200 hover:border-teal-300'}`}>

            <Handle
                type="target"
                position={Position.Left}
                className="!bg-teal-500 !w-3 !h-3 !border-2 !border-white shadow-lg"
            />

            <div className={`px-4 py-2 flex items-center gap-2 border-b
        ${data.isError ? 'bg-red-50 border-red-100' : 'bg-gradient-to-r from-teal-500 to-emerald-500 border-transparent'}`}>

                {data.isError ? <AlertCircle className="w-4 h-4 text-red-600" /> : <Sparkles className="w-4 h-4 text-white" />}
                <span className={`font-semibold text-sm tracking-wide ${data.isError ? 'text-red-700' : 'text-white'}`}>
                    AI Response
                </span>
            </div>

            <div className="p-4 bg-slate-50 min-h-[160px]">
                {data.isLoading ? (
                    <div className="h-full flex flex-col items-center justify-center gap-3 text-slate-400 py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
                        <span className="text-xs font-medium animate-pulse">Generating magic...</span>
                    </div>
                ) : data.isError ? (
                    <div className="text-sm text-red-600 bg-red-50/50 p-3 rounded-lg border border-red-100">
                        {data.value}
                    </div>
                ) : (
                    <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-100 shadow-sm min-h-[100px]">
                        {data.value || (
                            <span className="text-slate-400 italic text-xs">Waiting for your creativity...</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(OutputNode);
