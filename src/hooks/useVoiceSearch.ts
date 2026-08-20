import * as React from "react";

interface VoiceSearchOptions {
  onResult: (transcript: string) => void;
  onError?: (error: string) => void;
  lang?: string;
}

// Declare SpeechRecognition interface for TypeScript window support
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

export function useVoiceSearch({ onResult, onError, lang = "en-US" }: VoiceSearchOptions) {
  const [isListening, setIsListening] = React.useState(false);
  const [speechSupported, setSpeechSupported] = React.useState(true);
  const [interimTranscript, setInterimTranscript] = React.useState("");

  const recognitionRef = React.useRef<any>(null);

  React.useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setSpeechSupported(false);
    }
  }, []);

  const startListening = React.useCallback(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setSpeechSupported(false);
      onError?.("Voice search is not supported by your browser. Please type your query.");
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = lang;

      recognition.onstart = () => {
        setIsListening(true);
        setInterimTranscript("");
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptSegment = event.results[i][0].transcript;
          currentTranscript += transcriptSegment;
          if (event.results[i].isFinal) {
            onResult(currentTranscript.trim());
            setIsListening(false);
            setInterimTranscript("");
            return;
          }
        }
        setInterimTranscript(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        setInterimTranscript("");
        if (event.error === "no-speech") {
          onError?.("No speech detected. Please try speaking again.");
        } else if (event.error === "not-allowed") {
          onError?.("Microphone permission denied. Please enable microphone access.");
        } else {
          onError?.(`Voice recognition notice: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      setIsListening(false);
      onError?.("Failed to launch microphone voice recognition.");
    }
  }, [lang, onError, onResult]);

  const stopListening = React.useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  const toggleListening = React.useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return {
    isListening,
    speechSupported,
    interimTranscript,
    startListening,
    stopListening,
    toggleListening,
  };
}
