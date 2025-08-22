"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);       // menu mobile
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // foca no input quando a busca abrir
  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  // fecha busca com ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="px-[10%] w-full flex h-16 items-center justify-between">
        {/* logo minimal */}
        <Link
          href="/"
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 rounded-md"
        >
          <span className="inline-block h-7 w-7 rounded-md bg-black" />
          <span className="text-sm font-semibold tracking-tight">Meu E-commerce</span>
        </Link>

        {/* navegação desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm text-zinc-700 hover:text-black">Home</Link>
          <Link href="/produtos" className="text-sm text-zinc-700 hover:text-black">Produtos</Link>
          <Link href="/sobre" className="text-sm text-zinc-700 hover:text-black">Sobre</Link>
        </nav>

        {/* ações à direita */}
        <div className="flex items-center gap-2">
          {/* busca expansível */}
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="relative hidden items-center md:flex"
          >
            <button
              type="button"
              aria-label={searchOpen ? "Fechar busca" : "Abrir busca"}
              onClick={() => setSearchOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-md border border-zinc-200 hover:bg-zinc-50 active:scale-[0.98] transition"
            >
              {/* ícone lupa (svg) */}
              <svg width="18" height="18" viewBox="0 0 24 24" className="text-zinc-800">
                <path
                  d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar produtos..."
              onBlur={(e) => {
                // fecha se perder foco e estiver vazio
                if (!e.currentTarget.value) setSearchOpen(false);
              }}
              className={[
                "ml-2 h-9 rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none placeholder:text-zinc-400",
                "transition-[width,opacity] duration-300 ease-out",
                searchOpen ? "w-64 opacity-100" : "w-0 opacity-0 px-0 border-transparent"
              ].join(" ")}
            />
          </form>

          {/* carrinho minimal */}
          <Link
            href="/carrinho"
            aria-label="Carrinho"
            className="grid h-9 w-9 place-items-center rounded-md border border-zinc-200 hover:bg-zinc-50 active:scale-[0.98] transition"
          >
            <span aria-hidden>🛒</span>
          </Link>

          {/* menu mobile */}
          <button
            className="grid h-9 w-9 place-items-center rounded-md border border-zinc-200 hover:bg-zinc-50 md:hidden"
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* drawer mobile minimal */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <nav className="mx-auto grid max-w-6xl gap-1 px-4 py-3">
            <Link href="/" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm hover:bg-zinc-50">
              Home
            </Link>
            <Link href="/produtos" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm hover:bg-zinc-50">
              Produtos
            </Link>
            <Link href="/sobre" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm hover:bg-zinc-50">
              Sobre
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
