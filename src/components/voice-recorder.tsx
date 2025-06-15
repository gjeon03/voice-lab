"use client";

import { createMediaRecorder } from "@/utils/media-recorder";
import { useRef, useState } from "react";

export default function VoiceRecorder() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = async () => {
    const recorder = await createMediaRecorder(() => {
      setIsRecording(false);
      console.log("Recording stopped.");
    });

    if (recorder) {
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      console.log("Recording started...");
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      handleStopRecording();
    } else {
      handleStartRecording();
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
