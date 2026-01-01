import { useEffect, useState } from "react";
import axios from "axios";
import { useReactMediaRecorder } from "react-media-recorder";
import { MicOff, Mic, Send } from "lucide-react";
import { ImSpinner2 } from "react-icons/im";
import type { IInputAreaProps } from "./interface";
import {
  GROQ_TRANSLATE_URL,
  TOKEN_TRANSLATE,
} from "../../utils/constants/environment";
import { handleKeyPress } from "../../utils/functions";

export const InputArea = ({
  inputText,
  setInputText,
  handleSend,
}: IInputAreaProps) => {
  const { startRecording, stopRecording, mediaBlobUrl, status } =
    useReactMediaRecorder({ audio: true });

  const [isTranscribing, setIsTranscribing] = useState(false);

  const toggleRecording = () => {
    if (status === "recording") {
      stopRecording();
    } else {
      startRecording();
    }
  };

  /*
    fetches a remote media URL and converts the response into a Blob
    used to handle recorded audio before sending it to transcription.
  */
  const getBlobFromUrl = async (url: string) => {
    try {
      const resBlob = await axios.get(url, {
        responseType: "blob",
      });

      return resBlob.data;
    } catch (error) {
      console.error("Erro ao obter blob da URL: ", error);
    }
  };

  /* sends recorded audio to the Groq Whisper API and converts speech to text */
  const transcribeAudio = async (mediaBlobUrl: string) => {
    setIsTranscribing(true);
    try {
      const blob = await getBlobFromUrl(mediaBlobUrl);

      const file = new File([blob], "audio.webm", {
        type: "audio/webm",
      });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("model", "whisper-large-v3-turbo");
      formData.append("language", "pt");

      const res = await axios.post(GROQ_TRANSLATE_URL, formData, {
        headers: {
          Authorization: `Bearer ${TOKEN_TRANSLATE}`,
        },
      });

      setInputText(res.data.text);
    } catch (err) {
      console.error("Erro ao transcrever áudio em texto:", err);
    } finally {
      setIsTranscribing(false);
    }
  };

  useEffect(() => {
    if (mediaBlobUrl) {
      transcribeAudio(mediaBlobUrl);
    }
  }, [mediaBlobUrl]);

  return (
    <div className="px-6 pb-3 z-50">
      <div className="flex gap-3 items-end">
        <div className="flex flex-row sm:flex-row-reverse w-full gap-3">
          <div className="flex flex-col sm:flex-row sm:justify-between m-auto gap-2">
            <button
              onClick={toggleRecording}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 shadow-lg ${
                status === "recording"
                  ? "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                  : "bg-gradient-to-br from-[#8f5ea0] to-[#1e3a5f] hover:from-[#cd87e4] hover:to-[#39639b]"
              }`}
            >
              {status === "recording" ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </button>
          </div>

          <div className="flex-1 relative items-center">
            <textarea
              value={isTranscribing ? "" : inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, handleSend)}
              placeholder={isTranscribing ? "" : "Digite sua mensagem..."}
              disabled={isTranscribing}
              className="w-full px-5 py-4 pr-12 rounded-2xl border-2 border-gray-200
            focus:border-[#f6d379] focus:outline-none resize-none transition-all duration-200
            text-gray-800 placeholder-gray-400 disabled:bg-gray-100"
            />
            {isTranscribing && (
              <div className="absolute inset-0 gap-2 text-base flex text-gray-400 ml-4 items-center">
                <ImSpinner2 className="animate-spin" />
                Transcrevendo áudio...
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleSend}
          disabled={!inputText.trim()}
          className={` m-auto w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
            inputText.trim()
              ? "bg-gradient-to-br from-[#fff] to-[#f6d379] hover:from-orange-600 hover:to-orange-700"
              : "bg-gray-200 cursor-not-allowed"
          }`}
        >
          <Send
            className={`w-6 h-6 ${
              inputText.trim() ? "text-[#5e3b6d]" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {status === "recording" && (
        <div className="mt-3 flex items-center gap-2 text-red-500 text-sm">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          Gravando áudio...
        </div>
      )}
    </div>
  );
};
