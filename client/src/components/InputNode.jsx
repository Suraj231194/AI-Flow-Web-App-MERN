import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const InputNode = ({ data }) => {
    return (
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-[350px] overflow-hidden transition-all hover:shadow-2xl hover:border-indigo-300">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-2 flex items-center justify-between">
                <span className="text-white font-semibold text-sm tracking-wide">User Prompt</span>
            </div>
            <div className="p-4 bg-slate-50">
                <textarea
                    className="nowheel nodrag w-full h-32 p-3 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none shadow-sm placeholder:text-slate-400"
                    placeholder="Start typing your creative prompt here..."
                    value={data.value}
                    onChange={(evt) => data.onChange(evt.target.value)}
                />
            </div>
            <Handle
                type="source"
                position={Position.Right}
                className="!bg-indigo-500 !w-3 !h-3 !border-2 !border-white shadow-lg"
            />
        </div>
    );
};

export default memo(InputNode);
