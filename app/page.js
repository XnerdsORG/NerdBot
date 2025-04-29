import { ChatInterface } from "./components/ChatInterface";

export default function Home() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-black overflow-hidden">
      <div className="w-full max-w-5xl px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">Nerd Bot</h1>
        <ChatInterface />
      </div>
    </main>
  );
}
