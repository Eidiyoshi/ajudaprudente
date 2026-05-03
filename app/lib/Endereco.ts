import { prisma } from "@/lib/prisma";

export class Endereco {
  public idEndereco?: number;
  private readonly cidade: string;
  private readonly bairro: string;
  private readonly rua: string;
  private readonly cep: string;
  private readonly apartamento?: string;
  private readonly numero?: string;

  constructor(
    cidade: string,
    bairro: string,
    rua: string,
    cep: string,
    apartamento?: string,
    numero?: string
  ) {
    this.cidade = cidade;
    this.bairro = bairro;
    this.rua = rua;
    this.cep = cep;
    this.apartamento = apartamento;
    this.numero = numero;
  }

  public async storeOnDb() {
    if (this.idEndereco === undefined) {
      const lastEndereco = await prisma.endere_o.findFirst({
        select: { idendere_o: true },
        orderBy: { idendere_o: "desc" },
      });
      this.idEndereco = (lastEndereco?.idendere_o ?? 0) + 1;
    }

    const created = await prisma.endere_o.create({
      data: {
        idendere_o: this.idEndereco,
        cidade: this.cidade,
        bairro: this.bairro,
        rua: this.rua,
        cep: this.cep,
        apartamento: this.apartamento,
        numero: this.numero,
      },
    });

    this.idEndereco = created.idendere_o;
    return created;
  }
}
