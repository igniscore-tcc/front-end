"use client";

import { useEffect } from "react";
import { Button } from "../ui/button";
import { X, Check } from "lucide-react";

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
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            Termos e condições
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100/50 hover:bg-gray-200 text-gray-500 transition-colors"
          >
            <span className="sr-only">Fechar</span>
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6 text-sm text-gray-600">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">1. Introdução</h3>

            <div className="space-y-4 leading-relaxed">
              <p>
                Estes Termos de Uso regulam o acesso e a utilização da
                plataforma, estabelecendo os direitos, deveres,
                responsabilidades e limitações aplicáveis às empresas
                contratantes, seus administradores, colaboradores e usuários
                autorizados.
              </p>

              <p>
                Ao utilizar a plataforma, a empresa declara estar ciente e de
                acordo com todas as disposições aqui previstas, comprometendo-se
                a utilizá-la em conformidade com a legislação vigente, com as
                boas práticas comerciais e com as finalidades para as quais o
                sistema foi desenvolvido.
              </p>

              <p>
                A plataforma consiste em uma solução tecnológica destinada à
                gestão empresarial, disponibilizando módulos, funcionalidades e
                recursos para organização operacional, administrativa, comercial
                e financeira, sem qualquer vínculo societário, trabalhista,
                comercial ou de representação entre a plataforma e seus
                usuários.
              </p>

              <p>
                A utilização contínua do sistema, bem como a aceitação
                eletrônica destes termos, caracteriza concordância integral,
                irrevogável e irretratável com todas as condições aqui
                estabelecidas.
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              2. Privacidade e Proteção de Dados
            </h3>

            <div className="space-y-4 leading-relaxed">
              <div>
                <h4 className="font-medium text-gray-800 mb-1">
                  2.1 Tratamento de Dados
                </h4>
                <p>
                  A plataforma realiza o tratamento de dados pessoais e
                  empresariais estritamente na medida necessária para a
                  prestação dos serviços contratados, em conformidade com a
                  legislação aplicável, especialmente a Lei Geral de Proteção de
                  Dados (LGPD).
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-1">
                  2.2 Papel das Partes
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    A empresa contratante atua como controladora dos dados
                    inseridos na plataforma;
                  </li>
                  <li>
                    A plataforma atua como operadora, tratando os dados conforme
                    as instruções da empresa e os limites legais aplicáveis.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-1">
                  2.3 Responsabilidade da Empresa
                </h4>
                <p className="mb-2">
                  Compete exclusivamente à empresa contratante:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Obter as bases legais necessárias para coleta, armazenamento
                    e tratamento dos dados;
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
                <h4 className="font-medium text-gray-800 mb-1">
                  2.4 Segurança da Informação
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    A plataforma adota medidas técnicas, administrativas e
                    organizacionais compatíveis com os padrões de mercado;
                  </li>
                  <li>
                    Os dados são protegidos contra acesso não autorizado, perda,
                    alteração, destruição ou divulgação indevida;
                  </li>
                  <li>
                    O acesso às informações é restrito exclusivamente aos
                    usuários devidamente autorizados.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-1">
                  2.5 Limitação de Responsabilidade
                </h4>
                <p className="mb-2">A plataforma não se responsabiliza por:</p>
                <ul className="list-disc pl-5 space-y-1">
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
                <h4 className="font-medium text-gray-800 mb-1">
                  2.6 Retenção e Exclusão
                </h4>
                <p>
                  Os dados poderão ser mantidos pelo período necessário ao
                  cumprimento de obrigações legais, contratuais, regulatórias,
                  auditoria, segurança, prevenção a fraudes e preservação da
                  integridade histórica das operações realizadas na plataforma.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">3. Usuários</h3>

            <div className="space-y-4 leading-relaxed">
              <div>
                <h4 className="font-medium text-gray-800 mb-1">
                  3.1 Natureza do Serviço
                </h4>
                <p>
                  O módulo de usuários fornece autenticação, gerenciamento de
                  contas e controle de acesso aos recursos disponibilizados pela
                  plataforma, permitindo que pessoas autorizadas utilizem as
                  funcionalidades contratadas pela empresa.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-1">
                  3.2 Responsabilidade do Usuário
                </h4>
                <p className="mb-2">
                  Cada usuário é integralmente responsável por:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Manter a confidencialidade de suas credenciais de acesso;
                  </li>
                  <li>
                    Não compartilhar sua conta, senha ou token com terceiros;
                  </li>
                  <li>
                    Utilizar a plataforma exclusivamente para fins autorizados
                    pela empresa contratante;
                  </li>
                  <li>
                    Atuar em conformidade com a legislação vigente, com estes
                    Termos de Uso e com as políticas internas da empresa.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-1">
                  3.3 Responsabilidade da Empresa
                </h4>
                <p className="mb-2">
                  A empresa contratante é integralmente responsável por:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Autorizar, cadastrar, alterar e remover usuários;</li>
                  <li>
                    Definir níveis de acesso, permissões e perfis de utilização;
                  </li>
                  <li>
                    Supervisionar a utilização interna da plataforma por seus
                    colaboradores, representantes e terceiros autorizados;
                  </li>
                  <li>
                    Responder por todos os atos praticados por usuários
                    vinculados à sua organização.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-1">
                  3.4 Limitação de Responsabilidade
                </h4>
                <p className="mb-2">A plataforma não se responsabiliza por:</p>
                <ul className="list-disc pl-5 space-y-1">
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
                    Danos decorrentes da utilização inadequada das credenciais
                    de acesso.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-1">
                  3.5 Segurança
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    As senhas são armazenadas utilizando criptografia BCrypt;
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
                <h4 className="font-medium text-gray-800 mb-1">
                  3.6 Uso Indevido
                </h4>
                <p className="mb-2">É expressamente proibido:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Compartilhar credenciais de acesso;</li>
                  <li>
                    Tentar acessar dados, contas ou informações de terceiros;
                  </li>
                  <li>
                    Utilizar a plataforma para atividades ilícitas ou
                    fraudulentas;
                  </li>
                  <li>Contornar, testar ou violar mecanismos de segurança.</li>
                </ul>
                <p className="mt-3">
                  A violação destas regras poderá resultar na suspensão
                  temporária, bloqueio ou encerramento definitivo do acesso, sem
                  prejuízo das medidas legais cabíveis.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">4. Empresas</h3>

            <div className="space-y-4 leading-relaxed">
              <div>
                <h4 className="font-medium text-gray-800 mb-1">
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
                <h4 className="font-medium text-gray-800 mb-1">
                  4.2 Responsabilidade da Empresa
                </h4>
                <p className="mb-2">
                  A empresa contratante é integralmente responsável por:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Fornecer informações cadastrais corretas, completas e
                    atualizadas;
                  </li>
                  <li>
                    Gerenciar os produtos e serviços cadastrados na plataforma;
                  </li>
                  <li>Administrar os clientes registrados em seu ambiente;</li>
                  <li>
                    Responder pelas vendas, negociações e operações realizadas;
                  </li>
                  <li>
                    Supervisionar e responder por todos os atos praticados por
                    seus administradores, colaboradores, representantes e
                    usuários autorizados.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-1">
                  4.3 Limitação de Responsabilidade
                </h4>
                <p className="mb-2">A plataforma não se responsabiliza por:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    A veracidade, exatidão ou atualização das informações
                    cadastradas pela empresa;
                  </li>
                  <li>
                    Atos, decisões, operações ou condutas praticadas por
                    usuários vinculados à empresa contratante;
                  </li>
                  <li>
                    Decisões comerciais, operacionais, fiscais, financeiras ou
                    estratégicas adotadas pela empresa.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-1">
                  4.4 Segurança e Privacidade
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Os dados e registros de cada empresa permanecem logicamente
                    isolados dentro da plataforma;
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
                <h4 className="font-medium text-gray-800 mb-1">
                  4.5 Convites e Acesso
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    O envio de convites para novos usuários é realizado sob
                    exclusiva responsabilidade da empresa contratante;
                  </li>
                  <li>
                    A empresa responde integralmente pelo uso, compartilhamento
                    ou utilização indevida dos convites emitidos;
                  </li>
                  <li>
                    A plataforma não se responsabiliza por acessos concedidos
                    pela própria empresa a terceiros.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-1">
                  4.6 Uso Indevido
                </h4>
                <p className="mb-2">
                  É expressamente proibido utilizar a plataforma para:
                </p>
                <ul className="list-disc pl-5 space-y-1">
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
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">5. Clientes</h3>

            <div className="space-y-4 leading-relaxed">
              <div>
                <h4 className="font-medium text-gray-800 mb-1">
                  5.1 Natureza do serviço
                </h4>
                <p>
                  O sistema fornece uma ferramenta de gestão de clientes para
                  empresas usuárias, funcionando exclusivamente como plataforma
                  de armazenamento, organização e consulta de dados cadastrais e
                  comerciais.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-1">
                  5.2 Responsabilidade das empresas usuárias
                </h4>
                <p className="mb-2">
                  As empresas usuárias são integralmente responsáveis por:
                </p>
                <ul className="list-disc pl-5 space-y-1">
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
                <h4 className="font-medium text-gray-800 mb-1">
                  5.3 Limitação de responsabilidade da plataforma
                </h4>
                <p className="mb-2">A plataforma não se responsabiliza por:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    A veracidade, precisão ou atualização dos dados inseridos;
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
                <h4 className="font-medium text-gray-800 mb-1">
                  5.4 Controle de acesso
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    O acesso ao módulo de clientes é restrito exclusivamente aos
                    usuários autorizados pela empresa contratante;
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
                <h4 className="font-medium text-gray-800 mb-1">
                  5.5 Retenção e exclusão de dados
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Registros de clientes poderão ser inativados, mas não
                    necessariamente removidos permanentemente do sistema;
                  </li>
                  <li>
                    A inativação não implica exclusão do histórico de operações,
                    movimentações ou vínculos relacionados;
                  </li>
                  <li>
                    A manutenção dessas informações visa preservar a
                    integridade, rastreabilidade e segurança dos registros da
                    plataforma.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">6. Produtos</h3>

            <div className="space-y-4 leading-relaxed">
              <div>
                <h4 className="font-medium text-gray-800 mb-1">
                  6.1 Natureza do serviço
                </h4>
                <p>
                  O módulo de produtos constitui uma ferramenta de gestão
                  destinada exclusivamente ao cadastro, organização, controle e
                  utilização operacional de produtos e serviços pelas empresas
                  contratantes.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-1">
                  6.2 Responsabilidade da empresa usuária
                </h4>
                <p className="mb-2">
                  A empresa contratante é integralmente responsável por:
                </p>
                <ul className="list-disc pl-5 space-y-1">
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
                    Utilizar os produtos de forma adequada em suas operações;
                  </li>
                  <li>
                    Responder por todos os atos praticados por seus
                    administradores, colaboradores, representantes e usuários
                    autorizados.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-1">
                  6.3 Limitação de responsabilidade
                </h4>
                <p className="mb-2">A plataforma não se responsabiliza por:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    A conformidade regulatória, sanitária ou legal dos produtos;
                  </li>
                  <li>
                    A adequação técnica, comercial ou jurídica dos produtos
                    cadastrados;
                  </li>
                  <li>
                    Vencimentos, defeitos, avarias, falhas de fabricação ou uso
                    inadequado;
                  </li>
                  <li>
                    Danos, prejuízos ou responsabilidades decorrentes de atos
                    praticados pela empresa contratante ou seus usuários.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-1">
                  6.4 Segurança e isolamento de dados
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Cada empresa opera em ambiente logicamente isolado dentro da
                    plataforma;
                  </li>
                  <li>
                    Usuários possuem acesso exclusivamente aos dados vinculados
                    à sua própria organização;
                  </li>
                  <li>
                    Produtos, registros e informações pertencentes a terceiros
                    são integralmente inacessíveis.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-1">
                  6.5 Retenção e integridade dos dados
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Produtos poderão ser inativados, mas não necessariamente
                    removidos permanentemente da plataforma;
                  </li>
                  <li>
                    A inativação preserva todo o histórico operacional,
                    comercial e financeiro associado;
                  </li>
                  <li>
                    Registros vinculados a vendas, locações, movimentações ou
                    quaisquer outras operações permanecerão íntegros para fins
                    de auditoria, rastreabilidade e segurança.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 pt-4 border-t border-gray-100 flex flex-col gap-5 bg-gray-50/50">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                className="peer appearance-none w-5 h-5 border border-gray-300 rounded-md checked:bg-[#FF5A1F] checked:border-[#FF5A1F] transition-all cursor-pointer outline-none focus:ring-2 focus:ring-[#FF5A1F]/30"
                checked={isChecked}
                onChange={(e) => onCheckedChange(e.target.checked)}
              />
              <Check
                className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                strokeWidth={3}
              />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
              Li e aceito os termos de serviços
            </span>
          </label>

          <div className="flex items-center justify-between w-full">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 py-2.5 h-auto text-sm font-semibold rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 border-none transition-colors"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={onAcceptAndContinue}
              className="px-6 py-2.5 h-auto text-sm font-semibold rounded-lg bg-[#FF5A1F] text-white hover:bg-[#FF5A1F]/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isChecked}
            >
              Aceitar e continuar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
