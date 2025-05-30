"use client";
import { useState, useEffect } from "react";
import logoImg from "public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { RiShoppingBagLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Input } from "@/components/input/index";
import { Sidebar } from "@/components/sideBar/sideBar";
import { ThemeButton } from "../themeChange/themeButton";
import { UserType } from "@/types/user";

interface Props {
  user?: UserType; // Tipagem do objeto de usuário, ajuste conforme necessário
}

export function Header({ user }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Verifica se o token JWT está presente no localStorage
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true); // Define isLoggedIn como true se o token existir
    } else {
      setIsLoggedIn(false); // Define isLoggedIn como false se o token não existir
    }
  }, []);

  return (
    <>
      <header className="w-full h-16 bg-primario text-white dark:bg-zinc-900 dark:text-white px-4 md:px-6 transition-colors">
        <div className="max-w-screen-xl mx-auto">
          <nav className="flex items-center justify-between w-full gap-4">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src={logoImg}
                alt="Logo do site pegasus"
                width={150}
                height={80}
                quality={100}
                priority={true}
              />
            </Link>

            {/* Input de busca (esconde em telas pequenas) */}
            <div className="hidden md:flex flex-1 max-w-sm">
              <Input />
            </div>

            {/* Grupo de ícones e botões */}
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                href="/favoritos"
                className="flex items-center hover:text-gray-400 dark:hover:text-sky-500 transition-colors"
              >
                <FaRegHeart size={22} />
                <span className="hidden sm:inline ml-2">Favoritos</span>
              </Link>

              <Link
                href="/carrinho-de-compra"
                className="flex items-center hover:text-gray-400 dark:hover:text-sky-500 transition-colors"
              >
                <RiShoppingBagLine size={24} />
                <span className="hidden sm:inline ml-2">Carrinho</span>
              </Link>

              <div className="text-zinc-900 dark:text-white"><ThemeButton /></div>
              

              {isLoggedIn ? (
                <button
                  onClick={toggleSidebar}
                  className="flex items-center hover:text-gray-400 dark:hover:text-sky-500 transition-colors"
                >
                  <FaUserCircle size={24} />
                </button>
              ) : (
                <Link href="/login">
                  <button className="text-sm border border-zinc-900 dark:border-white rounded px-2 py-1 hover:bg-zinc-100 dark:hover:text-sky-500 transition-colors">
                    Faça Login
                  </button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} user={user} />
    </>
  );
}
