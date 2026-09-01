"use client";

import Image from "next/image";
import Link from "next/link";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import LoginForm from "@/components/auth/LoginForm";

const navigation = [
  {
    label: "Desafios",
    href: "/#desafios",
  },
  {
    label: "Soluções",
    href: "/#solucoes",
  },
  {
    label: "Preços",
    href: "/#precos",
  },
  {
    label: "Contato",
    href: "/#contato",
  },
];

const whatsappUrl =
  "https://wa.me/551999679283?text=Olá,%20quero%20agendar%20uma%20demonstração%20do%20IgnisCore";

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-background">
      <div className="flex items-center justify-between px-6 py-5 md:px-10 lg:px-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-4 transition-opacity hover:opacity-80"
        >
          <div
          className="h-[48px] w-[36px] bg-primary"
          role="img"
          aria-label="IgnisCore Logo"
          style={{
            maskImage: "url('/igniscore.svg')",
            WebkitMaskImage: "url('/igniscore.svg')",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskSize: "contain",
            WebkitMaskSize: "contain",
          }}
        />

          <span className="text-2xl font-bold leading-[1.3] tracking-[0.01em] text-primary">
            IgnisCore
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="
                    text-muted-foreground
                    transition-colors
                    hover:text-primary
                  "
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Login */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="
                  h-12
                  rounded-none
                  border-0
                  bg-primary
                  px-6
                  font-medium
                  text-primary-foreground
                  shadow-none
                  transition-all
                  hover:bg-primary/90
                  hover:shadow-[0_0_25px_rgba(255,90,31,0.25)]
                "
              >
                Entrar
              </Button>
            </DialogTrigger>

            {/* Modal */}
            <DialogContent
              className="
                rounded-2xl
                border
                border-border
                bg-background
                p-8
                shadow-2xl
                sm:max-w-md
              "
            >
              <DialogHeader className="sr-only">
                <DialogTitle>Login</DialogTitle>
              </DialogHeader>

              <LoginForm />
            </DialogContent>
          </Dialog>

          {/* CTA */}
          <Button
            asChild
            className="
              h-12
              rounded-none
              border
              border-primary
              bg-transparent
              px-6
              font-medium
              text-primary
              shadow-none
              transition-all
              hover:bg-primary
              hover:text-primary-foreground
              hover:shadow-[0_0_30px_rgba(255,90,31,0.25)]
            "
          >
            <Link href={whatsappUrl} target="_blank">
              Solicitar Demonstração
            </Link>
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="
                size-11
                rounded-none
                border-0
                bg-primary
                text-primary-foreground
                shadow-none
                hover:bg-primary/90
                hover:text-primary-foreground
                lg:hidden
              "
            >
              <Menu className="size-6" strokeWidth={2} />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="
              w-full
              max-w-sm
              rounded-none
              border-l
              border-border
              bg-background
              px-6
              sm:max-w-md
            "
          >
            <SheetHeader className="border-b border-border pb-6">
              <SheetTitle className="flex items-center gap-3 text-left text-primary">
                <Image
                  src="/igniscore.png"
                  alt="IgnisCore Logo"
                  width={28}
                  height={38}
                  className="object-contain"
                />

                <span className="text-xl font-bold">IgnisCore</span>
              </SheetTitle>
            </SheetHeader>

            <nav className="mt-10">
              <ul className="flex flex-col">
                {/* Navigation */}
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="
                        flex
                        border-b
                        border-border
                        py-5
                        text-xl
                        font-medium
                        text-muted-foreground
                        transition-colors
                        hover:text-primary
                      "
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}

                {/* Login mobile */}
                <li className="mt-8">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="
                          h-12
                          rounded-none
                          border-0
                          w-full
                          bg-primary
                          px-6
                          font-medium
                          text-primary-foreground
                          shadow-none
                          transition-all
                          hover:bg-primary/90
                          hover:shadow-[0_0_25px_rgba(255,90,31,0.25)]
                        "
                      >
                        Entrar
                      </Button>
                    </DialogTrigger>

                    {/* Modal mobile */}
                    <DialogContent
                      className="
                        w-[calc(100%-2rem)]
                        rounded-2xl
                        border
                        border-border
                        bg-background
                        p-6
                        shadow-2xl
                        sm:max-w-md
                      "
                    >
                      <DialogHeader className="sr-only">
                        <DialogTitle>Login</DialogTitle>
                      </DialogHeader>

                      <LoginForm />
                    </DialogContent>
                  </Dialog>
                </li>

                {/* CTA mobile */}
                <li className="mt-3">
                  <Button
                    asChild
                    className="
                      h-14
                      w-full
                      rounded-none
                      border
                      border-primary
                      bg-transparent
                      text-base
                      font-medium
                      text-primary
                      shadow-none
                      transition-all
                      hover:bg-primary
                      hover:text-primary-foreground
                      hover:shadow-[0_0_30px_rgba(255,90,31,0.25)]
                    "
                  >
                    <Link href={whatsappUrl} target="_blank">
                      Solicitar Demonstração
                    </Link>
                  </Button>
                </li>
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
