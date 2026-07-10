"use client";

import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/Input";
import { FileInput, Label } from "flowbite-react";

export default function Settings() {
  const { company, loading, error } = useCompanyProfile();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!company) return null;

  return (
    <div className="">
      <div className="">
        <Image
          src="/bannerProfile.png"
          alt="IgnisCore Logo"
          width={1200}
          height={128}
          className="w-full object-cover"
        />

        <div className="flex gap-8 h-[144px] items-end border-b border-gray-300 mx-16">
          <Image
            src="/imgProfile.png"
            alt="IgnisCore Logo"
            width={144}
            height={144}
            className="relative -top-16 shadow-xl rounded-xl"
          />

          <h3 className="relative -top-16 text-2xl font-semibold">{company.name}</h3>
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-12 mx-16 border-b border-gray-300 pb-12">
        <h5>Informações da empresa</h5>

        <div className="flex justify-between gap-6">
          <Input
            placeholder="Email"
            autoComplete="organization"
            value={company.email}
            disabled
          />

          <Input
            placeholder="CNPJ"
            autoComplete="organization"
            value={company.cnpj}
            disabled
          />
        </div>
      </div>

      <div className="flex gap-8 mt-12 mx-16 border-b border-gray-300 pb-12">
        <h5>Informações da empresa</h5>

        <div className="flex gap-8">
          <Image
            src="/imgProfile.png"
            alt="IgnisCore Logo"
            width={144}
            height={144}
            className="shadow-xl rounded-xl"
          />

          <div className="flex w-2xl items-center justify-center">
            <Label
              htmlFor="dropzone-file"
              className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#FF5A1F] bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 text-[#FF5A1F] dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-[#FF5A1F] dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-[#FF5A1F] dark:text-gray-400">
                  PNG ou JPG(MAX. 200x200px)
                </p>
              </div>
              <FileInput id="dropzone-file" className="hidden" />
            </Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8 mx-16 gap-6">
        <Button className="px-6 py-6 bg-gray-200 cursor-pointer text-black">
          Descartar
        </Button>
        <Button className="px-6 py-6 bg-[#FF5A1F] cursor-pointer">
          Salvar alterações
        </Button>
      </div>
    </div>
  );
}
