import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export default async function EventoDetalhe({ params }: { params: { id: string } }) {
  const evento = await prisma.evento.findUnique({
    where: {
      idevento: Number(params.id)
    },
    include: {
      endere_o: true,
      organizador_evento_organizadorToorganizador: true
    }
  });

  if (!evento) {
    return <p>Evento não encontrado</p>;
  }

  return (
    <div>
      <h1>{evento.descricao}</h1>

      <p>Status: {evento.status}</p>
      <p>Vagas: {evento.vagas}</p>

      {evento.endere_o && (
        <p>
          {evento.endere_o.rua}, {evento.endere_o.cidade}
        </p>
      )}
    </div>
  );
}