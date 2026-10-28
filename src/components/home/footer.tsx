
"use client";

import Link from "next/link";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale } from "@/components/providers/locale-provider";

export default function Footer() {
    const { t } = useLocale();
    const content = t.footer;

    const navigation = [
        {
            title: content.navigation.title,
            links: [
                { label: content.navigation.challenges, href: "#desafios" },
                { label: content.navigation.solutions, href: "#solucoes" },
                { label: content.navigation.pricing, href: "#precos" },
                { label: content.navigation.contact, href: "#contato" },
            ],
        },
        {
            title: content.institutional.title,
            links: [
                { label: content.institutional.terms, href: "/termos" },
                { label: content.institutional.faq, href: "/faq" },
                { label: content.institutional.privacy, href: "/privacidade" },
            ],
        },
    ];

    return (
        <footer className="relative overflow-hidden border-t border-border bg-background px-6 pb-8 pt-16 md:px-10 lg:px-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,90,31,0.08),transparent_35%)]" />

            <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr]">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center border border-primary/20 bg-primary/10">
                            <Image
                                width={28}
                                height={28}
                                src="/igniscore.png"
                                alt="IgnisCore"
                                className="object-contain"
                            />
                        </div>

                        <div className="flex flex-col">
                            <h3 className="text-2xl font-medium text-foreground">
                                IgnisCore
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                {content.tagline}
                            </p>
                        </div>
                    </div>

                    <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                        {content.description}
                    </p>

                    <div className="flex flex-col gap-4">
                        <a
                            href="mailto:suporte@igniscore.com"
                            className="flex items-center gap-3 text-muted-foreground transition-colors duration-300 hover:text-primary"
                        >
                            <Mail width={18} height={18} />
                            <span>suporte@igniscore.com</span>
                        </a>

                        <a
                            href="tel:+5519996779283"
                            className="flex items-center gap-3 text-muted-foreground transition-colors duration-300 hover:text-primary"
                        >
                            <Phone width={18} height={18} />
                            <span>(19) 99677-9283</span>
                        </a>
                    </div>
                </div>

                {navigation.map((group) => (
                    <div key={group.title} className="flex flex-col gap-6">
                        <h4 className="text-lg font-medium text-foreground">
                            {group.title}
                        </h4>

                        <ul className="flex flex-col gap-4">
                            {group.links.map((item) => (
                                <li key={item.label}>
                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="group flex items-center gap-2 text-muted-foreground transition-colors duration-300 hover:text-primary"
                                        >
                                            <span>{item.label}</span>

                                            <ArrowUpRight
                                                width={16}
                                                height={16}
                                                className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                            />
                                        </Link>
                                    </motion.div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="relative z-10 mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
                <p className="text-center text-sm text-muted-foreground md:text-left">
                    © {new Date().getFullYear()} IgnisCore. {content.copyright}
                </p>

                <div className="flex items-center gap-6">
                    <Link
                        href="/privacidade"
                        className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
                    >
                        {content.privacy}
                    </Link>

                    <Link
                        href="/termos"
                        className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
                    >
                        {content.terms}
                    </Link>
                </div>
            </div>
        </footer>
    );
}
