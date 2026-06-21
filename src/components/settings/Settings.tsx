"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/Input";

export default function Settings() {
  return (
    <div className="">
      <div className="">
        <img
          src="/bannerProfile.png"
          alt=""
          className="w-full h-[128px] object-cover"
        />

        <div className="flex gap-8 h-[144px] items-end border-b border-gray-300 mx-16">
          <img
            src="/imgProfile.png"
            alt=""
            className="relative -top-16 shadow-xl rounded-xl"
          />

          <h3 className="relative -top-16 text-2xl font-semibold">AXIA</h3>
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-12 mx-16 border-b border-gray-300 pb-12">
        <h5>Informações da empresa</h5>

        <div className="flex justify-between gap-6">
          <Input
            placeholder="CNPJ"
            autoComplete="organization"
            value={"22.128.376/0001-19"}
            disabled
          />

          <Input
            placeholder="CNPJ"
            autoComplete="organization"
            value={"22.128.376/0001-19"}
            disabled
          />
        </div>
      </div>

      <div className="flex gap-8 mt-12 mx-16 border-b border-gray-300 pb-12">
        <h5>Informações da empresa</h5>

        <div className="flex gap-8">
          <img src="/imgProfile.png" alt="" className="shadow-xl rounded-xl" />

          <input
            type="file"
            className="border h-[144px] w-[350px] flex items-center text-center border-[#FF5A1F] rounded-xl"
          ></input>
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
