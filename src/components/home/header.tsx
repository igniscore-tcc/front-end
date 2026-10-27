"use client";

import Image from "next/image";
import Link from "next/link";

import { Globe, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import LoginForm from "@/components/auth/LoginForm";
import { useLocale } from "@/components/providers/locale-provider";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const whatsappUrl = "https://wa.me/551999679283?text=Olá,%20quero%20agendar%20uma%20demonstração%20do%20IgnisCore";

export default function Header() {
    const { locale, setLocale } = useLocale();

    return (
        <header className="fixed left-0 top-0 z-50 w-full bg-background">
            <div className="flex items-center justify-between px-6 py-5 md:px-10 lg:px-16">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-4 transition-opacity hover:opacity-80">
                    <div
                        className="h-12 w-9 bg-primary"
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

                    <span className="text-2xl font-bold leading-[1.3] tracking-[0.01em] text-primary">IgnisCore</span>
                </Link>

                {/* Desktop navigation */}
                <nav className="hidden lg:block">
                    <ul className="flex items-center gap-8">
                        {navigation.map(item => (
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
                    <Select value={locale} onValueChange={value => setLocale(value as "pt" | "es")}>
                        <SelectTrigger
                            aria-label="Selecionar idioma"
                            className="
            h-11
            rounded-none
            border-border
            bg-background
            px-3
            w-44.5
            text-sm
            font-medium
            shadow-none
            transition-colors
            hover:border-primary/60
            hover:bg-muted/50
            focus:ring-0
            focus:ring-offset-0
            data-[state=open]:border-primary
            [&>svg:last-child]:text-muted-foreground
        "
                        >
                            <Globe className="size-4 shrink-0 text-primary" />
                            <SelectValue placeholder="Idioma" />
                        </SelectTrigger>

                        <SelectContent
                            align="end"
                            position="popper"
                            className="rounded-none border-border bg-background p-1 shadow-xl"
                        >
                            <SelectItem
                                value="pt"
                                className="cursor-pointer rounded-none py-2.5 pl-3 pr-8 focus:bg-primary/10 focus:text-foreground"
                            >
                                <span className="flex items-center gap-2.5">
                                    <span className="text-base">🇧🇷</span>
                                    <span>Português</span>
                                </span>
                            </SelectItem>

                            <SelectItem
                                value="es"
                                className="cursor-pointer rounded-none py-2.5 pl-3 pr-8 focus:bg-primary/10 focus:text-foreground"
                            >
                                <span className="flex items-center gap-2.5">
                                    <span className="text-base">🇪🇸</span>
                                    <span>Español</span>
                                </span>
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Login */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                className="
                  h-11
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
                  cursor-pointer
                "
                            >
                                Entrar
                            </Button>
                        </DialogTrigger>

                        {/* Modal */}
                        <DialogContent
                            className="
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
              h-11
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
              cursor-pointer
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
                cursor-pointer
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
                                {navigation.map(item => (
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
                          cursor-pointer
                        "
                                            >
                                                Entrar
                                            </Button>
                                        </DialogTrigger>

                                        {/* Modal mobile */}
                                        <DialogContent
                                            className="
                        w-[calc(100%-2rem)]
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
                      cursor-pointer
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
