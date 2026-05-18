import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
/*
async function getEventos() {
  const res = await fetch("http://localhost:3000/api/eventos", {
    cache: "no-store"
  });

  return res.json();
}

export default async function EventosPage() {
  const eventos = await getEventos();








  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Eventos</h1>

      {eventos.map((evento: any) => (
        <div key={evento.idevento} style={{ marginBottom: "20px" }}>
          <h2>{evento.descricao || "Sem descrição"}</h2>

          <p><strong>Status:</strong> {evento.status}</p>
          <p><strong>Vagas:</strong> {evento.vagas}</p>
          <p><strong>Data:</strong> {evento.data}</p>

          {evento.endere_o && (
            <p>
              <strong>Local:</strong> {evento.endere_o.cidade} - {evento.endere_o.bairro}
            </p>
          )}

          <hr />
        </div>
      ))}
    </div>
  );
}

*/

//const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })}) ;

const prisma = new PrismaClient();
export default async function EventosPage() {
  const eventos = await prisma.evento.findMany({
    include: {
      endere_o: true,
    },
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Eventos</h1>

      {eventos.map((evento) => (
        <div key={evento.idevento}>
          <h2>{evento.descricao || "Sem descrição"}</h2>

          <p>Status: {evento.status}</p>
          <p>Vagas: {evento.vagas}</p>

          {evento.endere_o && (
            <p>
              {evento.endere_o.cidade} - {evento.endere_o.bairro}
            </p>
          )}

          <a href={`/eventos/${evento.idevento}`}>
            Ver detalhes
          </a>

          <hr />
        </div>
      ))}
    </div>
  );
}