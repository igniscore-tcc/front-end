"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import es from "@/i18n/es.json";
import pt from "@/i18n/pt.json";

const translations = { pt, es };

export type Locale = keyof typeof translations;

interface LocaleContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (typeof translations)["pt"] | (typeof translations)["es"];
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>("pt");

    useEffect(() => {
        const browserLanguage = navigator.language.toLowerCase();

        if (browserLanguage.startsWith("es")) {
            setLocale("es");
        } else {
            setLocale("pt");
        }
    }, []);

    return (
        <LocaleContext.Provider
            value={{
                locale,
                setLocale,
                t: translations[locale],
            }}
        >
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    const context = useContext(LocaleContext);

    if (!context) {
        throw new Error("useLocale deve ser usado dentro de LocaleProvider");
    }

    return context;
}
