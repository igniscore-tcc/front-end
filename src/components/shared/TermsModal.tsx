"use client";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptAndContinue: () => void;
  isChecked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function TermsModal({
  isOpen,
  onClose,
  onAcceptAndContinue,
  isChecked,
  onCheckedChange,
}: TermsModalProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="flex max-h-[90vh] w-[calc(100%-2rem)] max-w-lg flex-col gap-0 overflow-hidden p-0">
        {/* Header */}
        <DialogHeader className="shrink-0 border-b px-6 py-5">
          <DialogTitle className="text-base">Termos e condições</DialogTitle>
        </DialogHeader>

        {/* Conteúdo com scroll */}
        <div className="min-h-0 flex-1">
          <ScrollArea className="h-[calc(90vh-180px)]">
            <div className="space-y-6 px-6 py-6 text-sm text-muted-foreground">
              {/* 1. Introdução */}
              <section>
                <h3 className="mb-2 font-semibold text-foreground">
                  1. Introdução
                </h3>

                <div className="space-y-4 leading-relaxed">
                  <p>
                    Estes Termos de Uso regulam o acesso e a utilização da
                    plataforma, estabelecendo os direitos, deveres,
                    responsabilidades e limitações aplicáveis às empresas
                    contratantes, seus administradores, colaboradores e usuários
                    autorizados.
                  </p>

                  <p>
                    Ao utilizar a plataforma, a empresa declara estar ciente e
                    de acordo com todas as disposições aqui previstas,
                    comprometendo-se a utilizá-la em conformidade com a
                    legislação vigente, com as boas práticas comerciais e com as
                    finalidades para as quais o sistema foi desenvolvido.
                  </p>

                  <p>
                    A plataforma consiste em uma solução tecnológica destinada à
                    gestão empresarial, disponibilizando módulos,
                    funcionalidades e recursos para organização operacional,
                    administrativa, comercial e financeira, sem qualquer vínculo
                    societário, trabalhista, comercial ou de representação entre
                    a plataforma e seus usuários.
                  </p>

                  <p>
                    A utilização contínua do sistema, bem como a aceitação
                    eletrônica destes termos, caracteriza concordância integral,
                    irrevogável e irretratável com todas as condições aqui
                    estabelecidas.
                  </p>
                </div>
              </section>

              {/* 2. Privacidade e Proteção de Dados */}
              <section>
                <h3 className="mb-2 font-semibold text-foreground">
                  2. Privacidade e Proteção de Dados
                </h3>

                <div className="space-y-4 leading-relaxed">
                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      2.1 Tratamento de Dados
                    </h4>

                    <p>
                      A plataforma realiza o tratamento de dados pessoais e
                      empresariais estritamente na medida necessária para a
                      prestação dos serviços contratados, em conformidade com a
                      legislação aplicável, especialmente a Lei Geral de
                      Proteção de Dados (LGPD).
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      2.2 Papel das Partes
                    </h4>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        A empresa contratante atua como controladora dos dados
                        inseridos na plataforma;
                      </li>

                      <li>
                        A plataforma atua como operadora, tratando os dados
                        conforme as instruções da empresa e os limites legais
                        aplicáveis.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      2.3 Responsabilidade da Empresa
                    </h4>

                    <p className="mb-2">
                      Compete exclusivamente à empresa contratante:
                    </p>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        Obter as bases legais necessárias para coleta,
                        armazenamento e tratamento dos dados;
                      </li>

                      <li>
                        Garantir a legitimidade, exatidão e atualização das
                        informações inseridas;
                      </li>

                      <li>
                        Atender solicitações de titulares, autoridades e órgãos
                        reguladores, quando aplicável.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      2.4 Segurança da Informação
                    </h4>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        A plataforma adota medidas técnicas, administrativas e
                        organizacionais compatíveis com os padrões de mercado;
                      </li>

                      <li>
                        Os dados são protegidos contra acesso não autorizado,
                        perda, alteração, destruição ou divulgação indevida;
                      </li>

                      <li>
                        O acesso às informações é restrito exclusivamente aos
                        usuários devidamente autorizados.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      2.5 Limitação de Responsabilidade
                    </h4>

                    <p className="mb-2">
                      A plataforma não se responsabiliza por:
                    </p>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        Dados inseridos de forma incorreta, ilícita ou sem
                        autorização pela empresa contratante;
                      </li>

                      <li>
                        Compartilhamento indevido realizado por usuários
                        autorizados;
                      </li>

                      <li>
                        Violações decorrentes de falhas internas, negligência ou
                        atos da própria empresa.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      2.6 Retenção e Exclusão
                    </h4>

                    <p>
                      Os dados poderão ser mantidos pelo período necessário ao
                      cumprimento de obrigações legais, contratuais,
                      regulatórias, auditoria, segurança, prevenção a fraudes e
                      preservação da integridade histórica das operações
                      realizadas na plataforma.
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. Usuários */}
              <section>
                <h3 className="mb-2 font-semibold text-foreground">
                  3. Usuários
                </h3>

                <div className="space-y-4 leading-relaxed">
                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      3.1 Natureza do Serviço
                    </h4>

                    <p>
                      O módulo de usuários fornece autenticação, gerenciamento
                      de contas e controle de acesso aos recursos
                      disponibilizados pela plataforma, permitindo que pessoas
                      autorizadas utilizem as funcionalidades contratadas pela
                      empresa.
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      3.2 Responsabilidade do Usuário
                    </h4>

                    <p className="mb-2">
                      Cada usuário é integralmente responsável por:
                    </p>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        Manter a confidencialidade de suas credenciais de
                        acesso;
                      </li>

                      <li>
                        Não compartilhar sua conta, senha ou token com
                        terceiros;
                      </li>

                      <li>
                        Utilizar a plataforma exclusivamente para fins
                        autorizados pela empresa contratante;
                      </li>

                      <li>
                        Atuar em conformidade com a legislação vigente, com
                        estes Termos de Uso e com as políticas internas da
                        empresa.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      3.3 Responsabilidade da Empresa
                    </h4>

                    <p className="mb-2">
                      A empresa contratante é integralmente responsável por:
                    </p>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>Autorizar, cadastrar, alterar e remover usuários;</li>

                      <li>
                        Definir níveis de acesso, permissões e perfis de
                        utilização;
                      </li>

                      <li>
                        Supervisionar a utilização interna da plataforma por
                        seus colaboradores, representantes e terceiros
                        autorizados;
                      </li>

                      <li>
                        Responder por todos os atos praticados por usuários
                        vinculados à sua organização.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      3.4 Limitação de Responsabilidade
                    </h4>

                    <p className="mb-2">
                      A plataforma não se responsabiliza por:
                    </p>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        Compartilhamento indevido de credenciais entre usuários;
                      </li>

                      <li>
                        Acessos não autorizados decorrentes de negligência,
                        imprudência ou descuido do usuário ou da empresa;
                      </li>

                      <li>
                        Atos, operações ou decisões praticadas por usuários
                        autorizados pela empresa contratante;
                      </li>

                      <li>
                        Danos decorrentes da utilização inadequada das
                        credenciais de acesso.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      3.5 Segurança
                    </h4>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        As senhas são armazenadas utilizando criptografia
                        BCrypt;
                      </li>

                      <li>As sessões autenticadas utilizam tokens JWT;</li>

                      <li>
                        O usuário deve encerrar suas sessões ao utilizar
                        dispositivos compartilhados ou públicos;
                      </li>

                      <li>
                        A empresa deve adotar práticas internas adequadas de
                        segurança da informação.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      3.6 Uso Indevido
                    </h4>

                    <p className="mb-2">É expressamente proibido:</p>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>Compartilhar credenciais de acesso;</li>

                      <li>
                        Tentar acessar dados, contas ou informações de
                        terceiros;
                      </li>

                      <li>
                        Utilizar a plataforma para atividades ilícitas ou
                        fraudulentas;
                      </li>

                      <li>
                        Contornar, testar ou violar mecanismos de segurança.
                      </li>
                    </ul>

                    <p className="mt-3">
                      A violação destas regras poderá resultar na suspensão
                      temporária, bloqueio ou encerramento definitivo do acesso,
                      sem prejuízo das medidas legais cabíveis.
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. Empresas */}
              <section>
                <h3 className="mb-2 font-semibold text-foreground">
                  4. Empresas
                </h3>

                <div className="space-y-4 leading-relaxed">
                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      4.1 Natureza do Serviço
                    </h4>

                    <p>
                      A plataforma disponibiliza infraestrutura tecnológica para
                      gestão empresarial, permitindo que as organizações
                      contratantes administrem suas operações, processos e
                      informações de forma autônoma, independente e sob sua
                      exclusiva responsabilidade.
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      4.2 Responsabilidade da Empresa
                    </h4>

                    <p className="mb-2">
                      A empresa contratante é integralmente responsável por:
                    </p>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        Fornecer informações cadastrais corretas, completas e
                        atualizadas;
                      </li>

                      <li>
                        Gerenciar os produtos e serviços cadastrados na
                        plataforma;
                      </li>

                      <li>
                        Administrar os clientes registrados em seu ambiente;
                      </li>

                      <li>
                        Responder pelas vendas, negociações e operações
                        realizadas;
                      </li>

                      <li>
                        Supervisionar e responder por todos os atos praticados
                        por seus administradores, colaboradores, representantes
                        e usuários autorizados.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      4.3 Limitação de Responsabilidade
                    </h4>

                    <p className="mb-2">
                      A plataforma não se responsabiliza por:
                    </p>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        A veracidade, exatidão ou atualização das informações
                        cadastradas pela empresa;
                      </li>

                      <li>
                        Atos, decisões, operações ou condutas praticadas por
                        usuários vinculados à empresa contratante;
                      </li>

                      <li>
                        Decisões comerciais, operacionais, fiscais, financeiras
                        ou estratégicas adotadas pela empresa.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      4.4 Segurança e Privacidade
                    </h4>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        Os dados e registros de cada empresa permanecem
                        logicamente isolados dentro da plataforma;
                      </li>

                      <li>
                        O acesso às informações é restrito exclusivamente aos
                        usuários devidamente autorizados;
                      </li>

                      <li>
                        A plataforma adota medidas técnicas, administrativas e
                        organizacionais adequadas para proteção das informações.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      4.5 Convites e Acesso
                    </h4>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        O envio de convites para novos usuários é realizado sob
                        exclusiva responsabilidade da empresa contratante;
                      </li>

                      <li>
                        A empresa responde integralmente pelo uso,
                        compartilhamento ou utilização indevida dos convites
                        emitidos;
                      </li>

                      <li>
                        A plataforma não se responsabiliza por acessos
                        concedidos pela própria empresa a terceiros.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      4.6 Uso Indevido
                    </h4>

                    <p className="mb-2">
                      É expressamente proibido utilizar a plataforma para:
                    </p>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>Fraude cadastral;</li>
                      <li>Falsidade ideológica;</li>
                      <li>Violação de direitos de terceiros;</li>
                      <li>Prática de atividades ilícitas ou fraudulentas.</li>
                    </ul>

                    <p className="mt-3">
                      Toda responsabilidade civil, administrativa e criminal
                      decorrente da utilização indevida da plataforma recairá
                      exclusivamente sobre a empresa usuária e seus respectivos
                      responsáveis.
                    </p>
                  </div>
                </div>
              </section>

              {/* 5. Clientes */}
              <section>
                <h3 className="mb-2 font-semibold text-foreground">
                  5. Clientes
                </h3>

                <div className="space-y-4 leading-relaxed">
                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      5.1 Natureza do serviço
                    </h4>

                    <p>
                      O sistema fornece uma ferramenta de gestão de clientes
                      para empresas usuárias, funcionando exclusivamente como
                      plataforma de armazenamento, organização e consulta de
                      dados cadastrais e comerciais.
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      5.2 Responsabilidade das empresas usuárias
                    </h4>

                    <p className="mb-2">
                      As empresas usuárias são integralmente responsáveis por:
                    </p>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        Realizar o cadastro correto e completo de seus clientes;
                      </li>

                      <li>Manter os dados sempre atualizados;</li>

                      <li>
                        Utilizar as informações em conformidade com a legislação
                        aplicável;
                      </li>

                      <li>
                        Responder por todas as ações realizadas por seus
                        administradores, funcionários, representantes e usuários
                        autorizados dentro da plataforma.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      5.3 Limitação de responsabilidade da plataforma
                    </h4>

                    <p className="mb-2">
                      A plataforma não se responsabiliza por:
                    </p>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        A veracidade, precisão ou atualização dos dados
                        inseridos;
                      </li>

                      <li>
                        Atuar como intermediadora em relações comerciais entre a
                        empresa e seus clientes finais;
                      </li>

                      <li>
                        Realizar análises de crédito, avaliações financeiras ou
                        verificações cadastrais;
                      </li>

                      <li>
                        Participar, influenciar ou controlar decisões comerciais
                        adotadas pelas empresas usuárias.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      5.4 Controle de acesso
                    </h4>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        O acesso ao módulo de clientes é restrito exclusivamente
                        aos usuários autorizados pela empresa contratante;
                      </li>

                      <li>
                        Clientes finais não possuem acesso direto à plataforma;
                      </li>

                      <li>
                        Cada empresa opera em ambiente logicamente isolado, sem
                        acesso aos dados de terceiros.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      5.5 Retenção e exclusão de dados
                    </h4>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        Registros de clientes poderão ser inativados, mas não
                        necessariamente removidos permanentemente do sistema;
                      </li>

                      <li>
                        A inativação não implica exclusão do histórico de
                        operações, movimentações ou vínculos relacionados;
                      </li>

                      <li>
                        A manutenção dessas informações visa preservar a
                        integridade, rastreabilidade e segurança dos registros
                        da plataforma.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 6. Produtos */}
              <section>
                <h3 className="mb-2 font-semibold text-foreground">
                  6. Produtos
                </h3>

                <div className="space-y-4 leading-relaxed">
                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      6.1 Natureza do serviço
                    </h4>

                    <p>
                      O módulo de produtos constitui uma ferramenta de gestão
                      destinada exclusivamente ao cadastro, organização,
                      controle e utilização operacional de produtos e serviços
                      pelas empresas contratantes.
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      6.2 Responsabilidade da empresa usuária
                    </h4>

                    <p className="mb-2">
                      A empresa contratante é integralmente responsável por:
                    </p>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        Realizar o cadastro correto, completo e atualizado dos
                        produtos;
                      </li>

                      <li>
                        Gerenciar informações de lote, série e rastreabilidade;
                      </li>

                      <li>Controlar datas de validade, quando aplicável;</li>

                      <li>
                        Definir preços, condições comerciais e políticas de
                        precificação;
                      </li>

                      <li>
                        Utilizar os produtos de forma adequada em suas
                        operações;
                      </li>

                      <li>
                        Responder por todos os atos praticados por seus
                        administradores, colaboradores, representantes e
                        usuários autorizados.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      6.3 Limitação de responsabilidade
                    </h4>

                    <p className="mb-2">
                      A plataforma não se responsabiliza por:
                    </p>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        A conformidade regulatória, sanitária ou legal dos
                        produtos;
                      </li>

                      <li>
                        A adequação técnica, comercial ou jurídica dos produtos
                        cadastrados;
                      </li>

                      <li>
                        Vencimentos, defeitos, avarias, falhas de fabricação ou
                        uso inadequado;
                      </li>

                      <li>
                        Danos, prejuízos ou responsabilidades decorrentes de
                        atos praticados pela empresa contratante ou seus
                        usuários.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      6.4 Segurança e isolamento de dados
                    </h4>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        Cada empresa opera em ambiente logicamente isolado
                        dentro da plataforma;
                      </li>

                      <li>
                        Usuários possuem acesso exclusivamente aos dados
                        vinculados à sua própria organização;
                      </li>

                      <li>
                        Produtos, registros e informações pertencentes a
                        terceiros são integralmente inacessíveis.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-foreground">
                      6.5 Retenção e integridade dos dados
                    </h4>

                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        Produtos poderão ser inativados, mas não necessariamente
                        removidos permanentemente da plataforma;
                      </li>

                      <li>
                        A inativação preserva todo o histórico operacional,
                        comercial e financeiro associado;
                      </li>

                      <li>
                        Registros vinculados a vendas, locações, movimentações
                        ou quaisquer outras operações permanecerão íntegros para
                        fins de auditoria, rastreabilidade e segurança.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </ScrollArea>
        </div>

        {/* Footer */}
        <DialogFooter className="shrink-0 flex-col gap-4 border-t bg-muted/30 px-6 py-4 sm:flex-col">
          <label
            htmlFor="terms-checkbox"
            className="flex cursor-pointer items-center gap-3"
          >
            <Checkbox
              id="terms-checkbox"
              checked={isChecked}
              onCheckedChange={(checked) => onCheckedChange(checked === true)}
            />

            <span className="text-sm font-medium text-muted-foreground">
              Li e aceito os termos de serviços
            </span>
          </label>

          <div className="flex w-full items-center justify-between gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>

            <Button
              type="button"
              onClick={onAcceptAndContinue}
              disabled={!isChecked}
            >
              Aceitar e continuar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
