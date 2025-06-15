"use client";

import { useVoiceRecorder } from "@/hooks/use-voice-recorder";

export default function VoiceRecorder() {
  const { isRecording, startRecording, stopRecording } = useVoiceRecorder(
    (blob) => {
      console.log("녹음된 오디오:", blob);
    }
  );

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Voice Recorder</h1>
      <button
        className={`px-4 py-2 text-white rounded cursor-pointer w-48 ${
          isRecording ? "bg-red-500" : "bg-blue-500"
        }`}
        onClick={handleToggleRecording}
      >
        {isRecording ? "Stop" : "Start"} Recording
      </button>
    </div>
  );
}
