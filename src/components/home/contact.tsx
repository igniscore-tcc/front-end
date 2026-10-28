"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Contact() {
    const { t } = useLocale();
    const content = t.contact;

    return (
        <section
            id="contato"
            aria-labelledby="contact-title"
            className="relative mt-24 overflow-hidden px-6 py-24 md:px-10 lg:px-16"
        >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#FF5A1F_0%,#6D28D9_100%)]" />

            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    rotate: [0, 8, 0],
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl"
            />

            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -bottom-40 -right-32 h-[500px] w-[500px] rounded-full bg-[#FF5A1F]/20 blur-3xl"
            />

            <motion.div
                animate={{
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute inset-0 bg-[url('/backgroud-gradient.svg')] bg-cover bg-center opacity-[0.08]"
            />

            <div className="relative z-10 flex flex-col items-center gap-8 text-center">
                <div className="flex flex-col gap-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white/70">{content.eyebrow}</p>

                    <h2
                        id="contact-title"
                        className="max-w-5xl text-4xl font-medium leading-[1.1] text-white md:text-5xl lg:text-6xl"
                    >
                        {content.title} <span className="text-white/70">IgnisCore</span>
                    </h2>

                    <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/85 md:text-xl">
                        {content.description}
                    </p>
                </div>

                <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                        <Link
                            href="/login"
                            aria-label={content.demoAriaLabel}
                            className="group relative flex items-center justify-center gap-3 overflow-hidden bg-white px-8 py-4 font-semibold text-[#0B0F19] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
                        >
                            <span className="relative z-10">{content.demoButton}</span>

                            <ArrowUpRight
                                width={20}
                                height={20}
                                className="relative z-10 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                            />

                            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,90,31,0.08),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </Link>
                    </motion.div>

                    <Link
                        href="#como-funciona"
                        className="border border-white/20 px-8 py-4 text-white/90 backdrop-blur-xl transition-all duration-500 hover:border-white/40 hover:bg-white/10"
                    >
                        {content.secondaryButton}
                    </Link>
                </div>
            </div>
        </section>
    );
}
