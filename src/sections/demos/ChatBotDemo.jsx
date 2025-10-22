import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "next-i18next";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const model = "gemini-2.5-flash-preview-09-2025";
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
const SYSTEM_INSTRUCTION = `
Actúas como Ethan Foster, un asistente de agente inmobiliario. Tu objetivo principal es calificar leads obteniendo de manera natural y conversacional esta información esencial:
1. Tipo de propiedad (casa, apartamento/condominio, terreno).
2. Ubicación preferida (ciudad o barrio).
3. Rango de presupuesto.

Reglas de Comportamiento y Tono:
- Tono: Profesional, amable y directo. Orientado a resultados. Elimina frases exageradas o redundantes (ej: "¡Qué emocionante!", "Eso es útil").
- Inicio de la Conversación:
    - Si el usuario inicia con un saludo (ej: "Hola", "Buenos días"), responde con un saludo amable y una transición inmediata a la calificación.
    - Estructura: 'Saludo + 'Soy Ethan Foster. Estoy aquí para ayudarte a encontrar tu propiedad ideal.' + Primera pregunta de calificación'.
- Desarrollo: Mantén las respuestas breves y conversacionales. Solo proporciona detalles extensos si el usuario lo solicita.
- Cierre: Una vez obtenida la información clave o en una pausa natural, invita a programar una visita o consulta.
- Formato: Usa solo lenguaje natural. Sin Markdown (negritas, listas, etc.). Responde en el mismo idioma del usuario. Por defecto, inglés.
`;
const ChatbotDemo = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation("common");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatChatHistory = (history) => {
    return history.map((msg) => ({
      role: msg.role === "model" ? "model" : "user",
      parts: [{ text: msg.text }],
    }));
  };

  const fetchGeminiResponse = async (history, retries = 3) => {
    if (apiKey === "") {
      console.error(
        "API Key is required. Please ensure NEXT_PUBLIC_GEMINI_API_KEY is set in your environment."
      );
      return "Error: La clave API no está configurada. Consulta la consola para las instrucciones de configuración.";
    }

    const payload = {
      contents: formatChatHistory(history),
      systemInstruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
    };

    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(
            `API call failed with status: ${response.status} ${response.statusText}`
          );
        }

        const result = await response.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (text) {
          return text;
        } else {
          return "Sorry, I couldn't generate a response. Please try again.";
        }
      } catch (error) {
        if (i < retries - 1) {
          const delay = Math.pow(2, i) * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          console.error("Gemini API Max Retries Reached:", error);
          return "I'm having trouble connecting right now. Please check the console for errors.";
        }
      }
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const newHistory = [...messages, { role: "user", text: userMessage }];
    setMessages(newHistory);
    setInput("");
    setIsLoading(true);

    try {
      const modelResponseText = await fetchGeminiResponse(newHistory);

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "model", text: modelResponseText },
      ]);
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "model",
          text: t("chat-bot.conection-failed"),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const userBubble =
    "bg-gray-950 dark:bg-white text-white dark:text-black self-end rounded-br-none";
  const modelBubble =
    "bg-gray-200 dark:bg-zinc-700 text-gray-900 dark:text-gray-100 self-start rounded-tl-none";

  return (
    <>
      <style>{` 
                /* Definición de la animación de los puntos */
                @keyframes blink {
                    0% { opacity: 0.2; }
                    20% { opacity: 1; }
                    100% { opacity: 0.2; }
                }

                .typing-dots span {
                    animation: blink 1.4s infinite;
                }

                .typing-dots span:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .typing-dots span:nth-child(3) {
                    animation-delay: 0.4s;
                }
          `}</style>

      <div className="flex flex-col h-full bg-white dark:bg-zinc-950 border-t border-zinc-700   shadow-2xl transition-all p-10">
        <h2 className="text-xl font-bold p-4 pb-5 border-b border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-100">
          🧑‍💼Ethan Foster - {t("chat-bot.title")}
        </h2>
        <p className="text-sm p-4 text-gray-500 dark:text-zinc-400 border-b border-gray-200 dark:border-zinc-700">
          {t("chat-bot.intro")}
        </p>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center p-8 text-gray-500 dark:text-zinc-400">
              {t("chat-bot.type-message")}
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs sm:max-w-md p-3 rounded-xl shadow-md transition-all 
                                ${
                                  msg.role === "user" ? userBubble : modelBubble
                                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-zinc-700 p-3 rounded-xl rounded-tl-none text-gray-600 dark:text-zinc-300 typing-dots font-extrabold text-lg">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-zinc-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder={t("chat-bot.type-message")}
              className="flex-1 p-3 border border-gray-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:text-white transition-colors"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              className={`px-4 py-3 rounded-lg font-semibold transition-colors 
                            ${
                              isLoading
                                ? "bg-zinc-500 opacity-50 cursor-not-allowed"
                                : "bg-zinc-400 dark:bg-white hover:bg-zinc-500 text-white dark:text-black"
                            }`}
              disabled={isLoading}
            >
              {t("send")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotDemo;
