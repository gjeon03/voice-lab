"use client";

import { useVoiceRecorder } from "@/hooks/use-voice-recorder";
import { downloadBlob } from "@/utils/download-blob";
import { useState } from "react";

export default function VoiceRecorder() {
  const [audioBlob, setAudioBlob] = useState<Blob>();
  const { isRecording, startRecording, stopRecording } = useVoiceRecorder({
    onComplete: (blob) => {
      console.log("녹음 완료!", blob);
      setAudioBlob(blob);
    },
  });

  const handleDownload = () => {
    if (audioBlob) {
      downloadBlob(audioBlob, `voice-${Date.now()}.webm`);
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 px-4 text-center">
      <h1 className="text-2xl font-bold">Voice Recorder</h1>
      <button
        className={`px-4 py-2 text-white rounded cursor-pointer w-48 ${
          isRecording ? "bg-red-500" : "bg-blue-500"
        }`}
        onClick={handleToggleRecording}
      >
        {isRecording ? "Stop" : "Start"} Recording
      </button>
      <button
        className="px-3 py-1 bg-green-500 text-white rounded disabled:opacity-50"
        onClick={handleDownload}
        disabled={!audioBlob}
      >
        📥 다운로드
      </button>
    </div>
  );
}
