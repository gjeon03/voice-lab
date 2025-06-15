"use client";

import { useRef, useState } from "react";

export default function VoiceRecorder() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("getUserMedia not supported on your browser!");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);

      recorder.start();
      console.log("Recording started...");

      recorder.ondataavailable = (event) => {
        // 녹음된 오디오 데이터를 여기에서 처리합니다.
        console.log("Audio data available:", event.data);
      };

      recorder.onstop = () => {
        setIsRecording(false);
        console.log("Recording stopped.");
      };
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();

      // 녹음은 중지되지만, 스트림은 계속 유지됩니다.
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
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
