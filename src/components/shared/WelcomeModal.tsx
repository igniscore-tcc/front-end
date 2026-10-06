"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

interface WelcomeModalProps {
    open: boolean;
    onContinue: () => void;
}

export function WelcomeModal({ open, onContinue }: WelcomeModalProps) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.94,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.96,
                            y: 10,
                        }}
                        transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative w-full max-w-lg overflow-hidden border border-border bg-background shadow-2xl"
                    >
                        {/* Accent */}
                        <div className="absolute inset-x-0 top-0 h-1 bg-primary" />

                        <div className="px-8 py-10 text-center md:px-12 md:py-12">
                            {/* Icon */}
                            <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        delay: 0.15,
                                        duration: 0.45,
                                        type: "spring",
                                        stiffness: 180,
                                    }}
                                    className="absolute inset-0 bg-primary/10"
                                />

                                <motion.div
                                    initial={{ scale: 0, rotate: -20 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{
                                        delay: 0.25,
                                        duration: 0.5,
                                        type: "spring",
                                        stiffness: 200,
                                    }}
                                    className="relative flex h-14 w-14 items-center justify-center bg-primary"
                                >
                                    <CheckCircle2 size={30} className="text-primary-foreground" />
                                </motion.div>
                            </div>

                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 }}
                                className="mt-7 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary"
                            >
                                <Sparkles size={14} />
                                Assinatura confirmada
                            </motion.div>

                            {/* Heading */}
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-4 text-3xl font-medium tracking-tight md:text-4xl"
                            >
                                Bem-vindo ao IgnisCore
                            </motion.h2>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.45 }}
                                className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground"
                            >
                                Sua assinatura foi confirmada e sua empresa está pronta para começar. Agora vamos
                                conhecer rapidamente sua nova plataforma de gestão.
                            </motion.p>

                            {/* Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-8 border border-border bg-muted/20 p-4"
                            >
                                <div className="flex items-center justify-center gap-3">
                                    <CheckCircle2 size={16} className="text-primary" />

                                    <span className="text-sm font-medium">Sua conta está pronta para começar</span>
                                </div>
                            </motion.div>

                            {/* Button */}
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.55 }}
                                type="button"
                                onClick={onContinue}
                                className="group mt-6 flex w-full items-center justify-center gap-3 bg-primary px-6 py-4 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                            >
                                Conhecer o IgnisCore
                                <ArrowRight
                                    size={18}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </motion.button>

                            <p className="mt-4 text-xs text-muted-foreground">
                                Você poderá acessar o sistema normalmente após esta etapa.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
