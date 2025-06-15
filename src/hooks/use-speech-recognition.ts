import { useRef, useState } from "react";

export type SpeechRecognitionLanguage =
  // 아시아
  | "ko-KR" // 한국어 (대한민국)
  | "ja-JP" // 일본어 (일본)
  | "zh-CN" // 중국어 (중국 - 간체)
  | "zh-TW" // 중국어 (대만 - 번체)
  | "zh-HK" // 중국어 (홍콩 - 번체)
  | "th-TH" // 태국어 (태국)
  | "hi-IN" // 힌디어 (인도)
  | "id-ID" // 인도네시아어 (인도네시아)
  | "ms-MY" // 말레이어 (말레이시아)

  // 유럽
  | "en-GB" // 영어 (영국)
  | "en-US" // 영어 (미국)
  | "en-AU" // 영어 (호주)
  | "en-CA" // 영어 (캐나다)
  | "en-IN" // 영어 (인도)
  | "de-DE" // 독일어 (독일)
  | "fr-FR" // 프랑스어 (프랑스)
  | "fr-CA" // 프랑스어 (캐나다)
  | "it-IT" // 이탈리아어 (이탈리아)
  | "es-ES" // 스페인어 (스페인)
  | "es-MX" // 스페인어 (멕시코)
  | "pt-BR" // 포르투갈어 (브라질)
  | "pt-PT" // 포르투갈어 (포르투갈)
  | "nl-NL" // 네덜란드어 (네덜란드)
  | "ru-RU" // 러시아어 (러시아)
  | "pl-PL" // 폴란드어 (폴란드)
  | "sv-SE" // 스웨덴어 (스웨덴)
  | "da-DK" // 덴마크어 (덴마크)
  | "fi-FI" // 핀란드어 (핀란드)
  | "no-NO" // 노르웨이어 (노르웨이)

  // 아프리카 및 중동
  | "ar-SA" // 아랍어 (사우디아라비아)
  | "ar-EG" // 아랍어 (이집트)
  | "tr-TR" // 터키어 (터키)
  | "fa-IR" // 페르시아어 (이란)
  | "he-IL" // 히브리어 (이스라엘)
  | "af-ZA"; // 아프리칸스어 (남아프리카공화국)

interface UseSpeechRecognitionOptions {
  lang?: SpeechRecognitionLanguage;
  onError?: (error: SpeechRecognitionError) => void;
}

export const useSpeechRecognition = ({
  lang = "ko-KR",
  onError,
}: UseSpeechRecognitionOptions = {}) => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startListening = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      console.error("Speech recognition not supported");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        }
      }

      if (finalTranscript) {
        setTranscript((prev) => prev + finalTranscript);
        console.log("Final result:", finalTranscript);
      }
    };

    recognition.onerror = (event: SpeechRecognitionError) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
      onError?.(event);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const resetTranscript = () => {
    setTranscript("");
  };

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
  };
};
