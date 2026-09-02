"use client";

import { useEffect, useRef, useState } from "react";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Building2,
  FileText,
  ImageIcon,
  Mail,
  Upload,
  X,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   Skeleton                                 */
/* -------------------------------------------------------------------------- */

function SettingsSkeleton() {
  return (
    <div className="w-full bg-muted/20">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="flex w-full items-center gap-4 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
          <Skeleton className="h-16 w-16 shrink-0 rounded-xl sm:h-20 sm:w-20" />

          <div className="min-w-0 space-y-2">
            <Skeleton className="h-6 w-40 sm:h-7 sm:w-56" />
            <Skeleton className="h-4 w-32 sm:w-44" />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="w-full space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        {/* Heading */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-32 sm:h-7" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>

        {/* Company */}
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-start gap-3">
              <Skeleton className="h-5 w-5 shrink-0 rounded" />

              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-72 max-w-full" />
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="grid gap-6 pt-6 lg:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-3 w-64 max-w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-3 w-64 max-w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Branding */}
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-start gap-3">
              <Skeleton className="h-5 w-5 shrink-0 rounded" />

              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-72 max-w-full" />
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            <div className="flex flex-col gap-8 xl:flex-row xl:items-center">
              <div className="flex shrink-0 flex-col items-center gap-3 xl:w-40">
                <Skeleton className="h-28 w-28 rounded-xl sm:h-32 sm:w-32" />
                <Skeleton className="h-8 w-28" />
              </div>

              <Skeleton className="min-h-48 w-full rounded-xl" />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
          <Skeleton className="h-10 w-full sm:w-28" />
          <Skeleton className="h-10 w-full sm:w-40" />
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Settings                                  */
/* -------------------------------------------------------------------------- */

export default function Settings() {
  const { company, loading, error } = useCompanyProfile();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");

  /* ------------------------------------------------------------------------ */
  /*                         Cleanup object URLs                              */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  /* ------------------------------------------------------------------------ */
  /*                                  Loading                                 */
  /* ------------------------------------------------------------------------ */

  if (loading) {
    return <SettingsSkeleton />;
  }

  /* ------------------------------------------------------------------------ */
  /*                                   Error                                  */
  /* ------------------------------------------------------------------------ */

  if (error) {
    return (
      <div className="flex w-full items-center justify-center px-4 py-16">
        <Card className="w-full max-w-lg">
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <X className="h-5 w-5 text-destructive" />

            <div>
              <p className="font-medium">
                Não foi possível carregar as configurações
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {error}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!company) {
    return null;
  }

  /* ------------------------------------------------------------------------ */
  /*                              File handling                               */
  /* ------------------------------------------------------------------------ */

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }

    const imageUrl = URL.createObjectURL(file);

    setSelectedImage(imageUrl);
    setFileName(file.name);
  };

  const handleRemoveImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }

    setSelectedImage(null);
    setFileName("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full bg-muted/20">

      <header className="border-b bg-background">
        <div className="flex w-full items-center gap-4 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
          <Avatar className="h-16 w-16 shrink-0 sm:h-20 sm:w-20">
            <AvatarImage
              src={selectedImage || "/imgProfile.png"}
              alt={company.name}
              className="object-cover"
            />

            <AvatarFallback className="text-xl sm:text-2xl">
              {company.name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">
              {company.name}
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Configurações da empresa
            </p>
          </div>
        </div>
      </header>

      <main className="w-full space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        {/* Heading */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Configurações
          </h2>

          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Gerencie as informações e a identidade visual da sua empresa.
          </p>
        </div>

        <Card className="w-full shadow-none">
          <CardHeader>
            <div className="flex items-start gap-3">
              <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

              <div className="min-w-0">
                <CardTitle className="text-base">
                  Informações da empresa
                </CardTitle>

                <CardDescription className="mt-1">
                  Consulte os dados cadastrais da sua empresa.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="grid gap-6 pt-6 lg:grid-cols-2">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="company-email">E-mail</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="company-email"
                  type="email"
                  value={company.email}
                  disabled
                  className="pl-9"
                />
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground">
                O e-mail da empresa não pode ser alterado aqui.
              </p>
            </div>

            {/* CNPJ */}
            <div className="space-y-2">
              <Label htmlFor="company-cnpj">CNPJ</Label>

              <div className="relative">
                <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="company-cnpj"
                  value={company.cnpj}
                  disabled
                  className="pl-9"
                />
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground">
                O CNPJ é um dado cadastral e não pode ser alterado aqui.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full shadow-none">
          <CardHeader>
            <div className="flex items-start gap-3">
              <ImageIcon className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

              <div className="min-w-0">
                <CardTitle className="text-base">
                  Identidade visual
                </CardTitle>

                <CardDescription className="mt-1">
                  Personalize a imagem de perfil da sua empresa.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            <div className="flex flex-col gap-8 xl:flex-row xl:items-center">
              {/* Preview */}
              <div className="flex w-full shrink-0 flex-col items-center gap-3 xl:w-40">
                <Avatar className="h-28 w-28 sm:h-32 sm:w-32">
                  <AvatarImage
                    src={selectedImage || "/imgProfile.png"}
                    alt={company.name}
                    className="object-cover"
                  />

                  <AvatarFallback className="text-3xl">
                    {company.name?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {selectedImage && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveImage}
                    className="text-destructive hover:bg-transparent hover:text-destructive"
                  >
                    Remover imagem
                  </Button>
                )}
              </div>

              {/* Upload */}
              <div className="w-full min-w-0">
                <input
                  ref={fileInputRef}
                  id="company-logo"
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <Label
                  htmlFor="company-logo"
                  className="
                    group
                    flex
                    min-h-44
                    w-full
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-dashed
                    bg-background
                    px-4
                    py-8
                    text-center
                    transition-colors
                    hover:border-primary
                    hover:bg-muted/30
                    sm:min-h-48
                    sm:px-6
                  "
                >
                  <Upload className="mb-4 h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />

                  <p className="text-sm font-medium">
                    Clique para selecionar uma imagem
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    ou arraste e solte o arquivo aqui
                  </p>

                  <p className="mt-3 text-xs text-muted-foreground">
                    PNG ou JPG · máximo recomendado de 200 × 200px
                  </p>

                  {fileName && (
                    <div className="mt-4 max-w-full truncate rounded-md border bg-muted/40 px-3 py-2 text-xs font-medium">
                      {fileName}
                    </div>
                  )}
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex w-full flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className=""
            onClick={handleRemoveImage}
          >
            Descartar
          </Button>

          <Button
            type="button"
            className=""
          >
            Salvar alterações
          </Button>
        </div>
      </main>
    </div>
  );
}