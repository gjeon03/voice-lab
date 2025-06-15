"use client";

import {
  SpeechRecognitionLanguage,
  useSpeechRecognition,
} from "@/hooks/use-speech-recognition";
import { useVoiceRecorder } from "@/hooks/use-voice-recorder";
import { downloadBlob } from "@/utils/download-blob";
import { useState } from "react";

const languageOptions: { code: SpeechRecognitionLanguage; label: string }[] = [
  { code: "ko-KR", label: "한국어" },
  { code: "en-US", label: "English (US)" },
  { code: "ja-JP", label: "日本語" },
  { code: "zh-CN", label: "中文 (简体)" },
  { code: "fr-FR", label: "Français" },
  { code: "es-ES", label: "Español" },
];

export default function VoiceRecorder() {
  //   const [audioBlob, setAudioBlob] = useState<Blob>();
  //   const { isRecording, startRecording, stopRecording } = useVoiceRecorder({
  //     onComplete: (blob) => {
  //       console.log("녹음 완료!", blob);
  //       setAudioBlob(blob);
  //     },
  //   });
  const [lang, setLang] = useState<SpeechRecognitionLanguage>("ko-KR");
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition({
    lang,
    onError: (event) => {
      console.log("음성 인식 에러 발생:", event.error);

      // 녹음 중인 경우 녹음을 중단
      // stopRecording(); // MediaRecorder 중단
    },
  });

  //   const handleDownload = () => {
  //     if (audioBlob) {
  //       downloadBlob(audioBlob, `voice-${Date.now()}.webm`);
  //     }
  //   };

  const handleToggleRecording = () => {
    // if (isRecording) {
    //   stopRecording();
    //   //   stopListening();
    // } else {
    //   startRecording();
    //   //   startListening();
    // }
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleResetTranscript = () => {
    resetTranscript();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 px-4 text-center">
      <h1 className="text-2xl font-bold">Voice Recorder</h1>
      {/* <button
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
      </button> */}

      {/* 언어 선택 */}
      <select
        className="select border"
        value={lang}
        onChange={(e) => setLang(e.target.value as SpeechRecognitionLanguage)}
        disabled={isListening}
      >
        {languageOptions.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>

      <button
        className={`px-4 py-2 text-white rounded cursor-pointer w-48 ${
          isListening ? "bg-red-500" : "bg-blue-500"
        }`}
        onClick={handleToggleRecording}
      >
        {isListening ? "음성 인식 중지" : "음성 인식 시작"}
      </button>

      {/* 음성 인식 상태 표시 */}

      {/* STT 상태 표시 */}
      <span className="text-sm text-gray-500">
        {isListening ? "🎙️ 음성 인식 중..." : "🛑 음성 인식 대기 중"}
      </span>

      {/* 녹음 텍스트 */}
      <div className="min-h-[4rem] mt-2 text-gray-700 whitespace-pre-line">
        {transcript || "🎤 음성을 입력해보세요..."}
      </div>

      {/* 리셋 버튼 */}
      <button
        className="mt-2 px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
        onClick={handleResetTranscript}
        disabled={!transcript}
      >
        🧹 텍스트 지우기
      </button>
    </div>
  );
}
