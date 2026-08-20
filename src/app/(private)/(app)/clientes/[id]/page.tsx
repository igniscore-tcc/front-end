"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Building,
  Phone,
  Mail,
  Pencil,
  Receipt,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { useClients } from "@/hooks/useClients";
import { Cliente } from "@/types/cliente";
import { AddClientModal } from "@/components/clients/AddClientModal";

export default function ClientDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const { getClientById, editing, setEditing, saveEdit } = useClients();

  const [client, setClient] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClient() {
      if (!id) return;

      try {
        setLoading(true);

        const data = await getClientById(Number(id));

        setClient(data);
      } catch (error) {
        console.error("Erro ao carregar cliente:", error);
      } finally {
        setLoading(false);
      }
    }

    loadClient();
  }, [id, getClientById]);

  const handleSaveEdit = async (data: any) => {
    await saveEdit(data);

    if (data.id) {
      const updated = await getClientById(data.id);
      setClient(updated);
    }
  };

  const sales = [
    {
      id: 1,
      total: "R$ 3.600,99",
      desconto: "5%",
      data: "05/04/2026",
      tipo: "Cartão",
      status: "Paga",
    },
    {
      id: 2,
      total: "R$ 3.600,99",
      desconto: "5%",
      data: "05/04/2026",
      tipo: "PIX",
      status: "Pendente",
    },
    {
      id: 3,
      total: "R$ 3.600,99",
      desconto: "5%",
      data: "05/04/2026",
      tipo: "PIX",
      status: "Cancelada",
    },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Paga":
        return "default";

      case "Pendente":
        return "secondary";

      case "Cancelada":
        return "destructive";

      default:
        return "outline";
    }
  };

  return (
    <div className="bg-background p-6 md:p-8">
      <div className="mx-auto flex flex-col gap-6">
        {/* Header */}
        <header className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Detalhes do Cliente
            </h1>

            <p className="text-sm text-muted-foreground">
              Visualize e gerencie as informações do cliente.
            </p>
          </div>
        </header>

        {/* Cliente */}
        <Card>
          <CardHeader className="flex flex-col gap-6 border-b pb-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="size-8" />
              </div>

              <div className="space-y-1">
                {loading ? (
                  <>
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-4 w-20" />
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold md:text-2xl">
                      {client?.nome}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      #{client?.number ?? id}
                    </p>
                  </>
                )}
              </div>
            </div>

            <Button onClick={() => client && setEditing(client)}>
              <Pencil className="mr-2 size-4" />
              Editar
            </Button>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2 xl:grid-cols-4">
            {/* CPF / CNPJ */}
            <InfoItem
              icon={<Receipt className="size-4" />}
              label={client?.tipo === "PF" ? "CPF" : "CNPJ"}
              loading={loading}
            >
              {client?.tipo === "PF" ? client?.cpf : client?.cnpj}
            </InfoItem>

            {/* Inscrição */}
            <InfoItem
              icon={<Building className="size-4" />}
              label="Inscrição Estadual"
              loading={loading}
            >
              {client?.tipo === "PJ"
                ? client?.inscricao || "Não informada"
                : "Não se aplica"}
            </InfoItem>

            {/* Email */}
            <InfoItem
              icon={<Mail className="size-4" />}
              label="E-mail"
              loading={loading}
            >
              {client?.email}
            </InfoItem>

            {/* Telefone */}
            <InfoItem
              icon={<Phone className="size-4" />}
              label="Telefone"
              loading={loading}
            >
              {client?.telefone}
            </InfoItem>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card>
          <Tabs defaultValue="vendas">
            <CardHeader className="border-b pb-0">
              <TabsList className="h-auto w-full justify-start rounded-none bg-transparent p-0">
                <TabsTrigger
                  value="vendas"
                  className="rounded-none border-b-2 border-transparent px-4 py-4 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Vendas
                </TabsTrigger>

                <TabsTrigger
                  value="pendencias"
                  className="rounded-none border-b-2 border-transparent px-4 py-4 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Pendências
                </TabsTrigger>

                <TabsTrigger
                  value="contatos"
                  className="rounded-none border-b-2 border-transparent px-4 py-4 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Contatos
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            <TabsContent value="vendas" className="m-0">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Desconto</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {sales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell className="font-medium">{sale.id}</TableCell>

                        <TableCell className="font-semibold">
                          {sale.total}
                        </TableCell>

                        <TableCell>{sale.desconto}</TableCell>

                        <TableCell>{sale.data}</TableCell>

                        <TableCell>{sale.tipo}</TableCell>

                        <TableCell>
                          <Badge variant={getStatusVariant(sale.status)}>
                            {sale.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </TabsContent>

            <TabsContent value="pendencias">
              <CardContent className="py-10">
                <p className="text-sm text-muted-foreground">
                  Nenhuma pendência encontrada.
                </p>
              </CardContent>
            </TabsContent>

            <TabsContent value="contatos">
              <CardContent className="py-10">
                <p className="text-sm text-muted-foreground">
                  Nenhum contato adicional encontrado.
                </p>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {/* Modal de edição */}
      <AddClientModal
        isOpen={!!editing}
        onClose={() => setEditing(null)}
        onSave={handleSaveEdit}
        clientToEdit={editing}
      />
    </div>
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  loading: boolean;
  children: React.ReactNode;
}

function InfoItem({ icon, label, loading, children }: InfoItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>

      {loading ? (
        <Skeleton className="h-5 w-3/4" />
      ) : (
        <p className="font-medium">{children || "Não informado"}</p>
      )}
    </div>
  );
}
