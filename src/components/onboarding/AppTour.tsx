"use client";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from "react";

export default function AppTour() {
    useEffect(() => {
        const startTour = async () => {
            try {
                const response = await fetch("/api/auth/me", {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    return;
                }

                const user = await response.json();

                // onboarding = true → já concluiu
                // onboarding = false → precisa fazer o tour
                if (user.onboarding) {
                    return;
                }

                const tour = driver({
                    showProgress: true,
                    allowClose: true,
                    nextBtnText: "Próximo",
                    prevBtnText: "Voltar",
                    doneBtnText: "Concluir",
                    progressText: "{{current}} de {{total}}",

                    steps: [
                        {
                            element: "#dashboard",
                            popover: {
                                title: "Dashboard",
                                description: "Acompanhe os principais indicadores da sua operação em um único lugar.",
                            },
                        },
                        {
                            element: "#clientes",
                            popover: {
                                title: "Clientes",
                                description: "Gerencie seus clientes e consulte todas as informações da sua base.",
                            },
                        },
                        {
                            element: "#produtos",
                            popover: {
                                title: "Produtos",
                                description: "Controle produtos, preços, lotes e informações de validade.",
                            },
                        },
                        {
                            element: "#vendas",
                            popover: {
                                title: "Vendas",
                                description: "Registre e acompanhe as vendas realizadas pela sua empresa.",
                            },
                        },
                        {
                            element: "#vencimentos",
                            popover: {
                                title: "Vencimentos",
                                description: "Acompanhe os próximos vencimentos e mantenha sua operação em dia.",
                            },
                        },
                    ],

                    onDestroyed: async () => {
                        try {
                            await fetch("/api/auth/onboarding", {
                                method: "POST",
                                credentials: "include",
                            });
                        } catch (error) {
                            console.error("Erro ao concluir onboarding:", error);
                        }
                    },
                });

                tour.drive();
            } catch (error) {
                console.error("Erro ao verificar onboarding:", error);
            }
        };

        startTour();
    }, []);

    return null;
}
