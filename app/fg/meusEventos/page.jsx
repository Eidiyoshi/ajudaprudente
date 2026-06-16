export default function MeusEventos() {
    const eventos = [
        {
            idevento: 1,
            descricao: "Campanha de arrecadação de alimentos",
            status: "Ativo",
            vagas: 10,
            local: "Centro Comunitário"
        },
        {
            idevento: 2,
            descricao: "Mutirão de limpeza da praça",
            status: "Ativo",
            vagas: 5,
            local: "Praça Central"
        },
        {
            idevento: 3,
            descricao: "Aula de reforço escolar",
            status: "Encerrado",
            vagas: 0,
            local: "Escola Municipal"
        }
    ];

    return (
        <div className="min-h-screen bg-zinc-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6">
                Meus Eventos
            </h1>

            <div className="flex flex-col gap-4">
                {eventos.map((evento) => (
                    <div
                        key={evento.idevento}
                        className="bg-zinc-800 border border-zinc-700 rounded-lg p-4"
                    >
                        <h2 className="text-xl font-semibold">
                            {evento.descricao}
                        </h2>

                        <p>Status: {evento.status}</p>
                        <p>Vagas: {evento.vagas}</p>
                        <p>Local: {evento.local}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}