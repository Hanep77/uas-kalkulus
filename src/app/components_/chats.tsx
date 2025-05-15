"use client";

import { useEffect, useRef } from "react"

export default function Chats({ chatBot, isLoading }: { chatBot: { role: string, text: string }[], isLoading: boolean }) {
  const bottomRef = useRef<HTMLDivElement>(null)

  const parseText = (message: string) => {
    if (!message) {
      return "loading...";
    }

    const parts = message.split('\n\n');

    const boldify = (str: string) => {
      return str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    };

    const intro = parts[0] ? `<p class="mb-4">${boldify(parts[0])}</p>` : '';

    const listItems =
      parts[1]?.split('\n')
        .filter(line => line.trim().startsWith('*'))
        .map(item => {
          const content = item.slice(1).trim();
          return `<li>${boldify(content)}</li>`;
        })
        .join('') || '';

    const list = listItems
      ? `<ul class="list-disc pl-6 space-y-2">${listItems}</ul>`
      : '';

    const closing = parts[2] ? `<p class="mt-4">${boldify(parts[2])}</p>` : '';

    return intro + list + closing;
  }

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [chatBot]);

  return <div className="flex flex-col gap-4 h-[500px] overflow-y-auto mb-4 p-4">
    {chatBot.map((item, i) => {
      if (item.role == "user") {
        return <div key={i} className="flex justify-end">
          <div className="inline-block bg-zinc-300 py-1 px-4 rounded-s-xl rounded-tr-xl">{item?.text}</div>
        </div>
      }
      return <div key={i}>
        <div className="inline-block bg-zinc-300 py-1 px-4 rounded-e-xl rounded-tl-xl" dangerouslySetInnerHTML={{ __html: parseText(item?.text) }}></div>
      </div>
    })}

    {isLoading && <div>
      <div className="inline-block bg-zinc-300 py-1 px-4 rounded-e-xl rounded-tl-xl animate-pulse">Loading...</div>
    </div>
    }
    <div ref={bottomRef} />
  </div>
}
