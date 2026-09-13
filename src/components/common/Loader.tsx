"use client";

import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm">
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3  border border-slate-200 bg-black p-1 shadow-sm rounded-2xl">
        <ClipLoader color="#fff" size={45} speedMultiplier={0.9} />
      </div>
    </div>
  );
}
