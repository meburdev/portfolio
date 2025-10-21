import React, { useState, useRef, useEffect } from "react";

// === CONSTANTES DE LA API GEMINI ===
// MEJOR PRÁCTICA (NEXT.JS): Obtener la clave de las variables de entorno para seguridad.
// En este Canvas, si la variable de entorno es nula, usamos "" para permitir la inyección automática.
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const model = "gemini-2.5-flash-preview-09-2025";
// Construimos la URL con la clave.
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
const SYSTEM_INSTRUCTION =
  "You are a professional and friendly Real Estate Sales Agent Assistant. Your main goal is to qualify the user as a lead by asking about their budget, preferred location (city/neighborhood), and the type of property they are looking for (house, apartment, land). Use a welcoming and results-oriented tone, and always encourage scheduling a property tour or consultation. IMPORTANT: Respond using only natural, conversational language and keep your responses brief and concise until the user asks for more detail. Avoid using Markdown formatting such as bold text, italics, or lists in your responses unless absolutely necessary to convey a piece of data.";

/**
 * Componente principal para la demostración del Chatbot Conversacional.
 * Demuestra la gestión del estado de la sesión (historial del chat) para mantener el contexto.
 * * NOTA PARA LOCALHOST: Para que esta demo funcione localmente en tu proyecto Next.js,
 * debes obtener una clave Gemini API Key y guardarla en un archivo .env.local:
 * * NEXT_PUBLIC_GEMINI_API_KEY="TU_CLAVE_AQUÍ"
 */
const ChatbotDemo = () => {
  // Definición de estado para el historial del chat: [{ role: 'user' | 'model', text: '...' }]
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatChatHistory = (history) => {
    return history.map((msg) => ({
      role: msg.role === "model" ? "model" : "user", // Mapear 'user' de React al rol de la API
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

    // 🔎 Paso de diagnóstico: imprime la URL construida
    console.log("Fetching Gemini API from URL:", apiUrl);

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
          const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s...
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
          text: "Error: I failed to connect with the AI model.",
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
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 border-t border-zinc-700   shadow-2xl transition-all p-10">
      <h2 className="text-xl font-bold p-4 pb-5 border-b border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-100">
        🧑‍💼 Real Estate Sales AI Assistant
      </h2>
      <p className="text-sm p-4 text-gray-500 dark:text-zinc-400 border-b border-gray-200 dark:border-zinc-700">
        Welcome! I'm here to help you find your dream property. Tell me about
        your ideal home—where are you looking, and what's your budget?
      </p>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center p-8 text-gray-500 dark:text-zinc-400">
            Type a message to start the session...
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
            <div className="bg-gray-100 dark:bg-zinc-700 p-3 rounded-xl rounded-tl-none text-gray-600 dark:text-zinc-300 animate-pulse">
              Thinking...
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
            placeholder="Type your message..."
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
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotDemo;
