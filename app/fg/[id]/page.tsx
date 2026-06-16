
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

type Event = {
    id: number;
    nome: string;
    descricao: string;
};

const mockEvents: Event[] = [
    {
        id: 1,
        nome: "Caridade",
        descricao: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? [33] At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non",
    },
    {
        id: 2,
        nome: "Piquete",
        descricao: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? [33] At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non",
    },
];

export default function DetalhesEvento() {

    const params = useParams();

    const event = mockEvents.find(
        (e) => e.id === Number(params.id)
    );

    if (!event) {
        return (
            <div className="min-h-screen bg-zinc-900 flex items-center justify-center text-white">
                Evento não encontrado
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-900 p-6">
            <div className="max-w-3xl mx-auto bg-zinc-800 p-8 rounded-xl">

                <Link href="/Eventos">
                    Voltar
                </Link>

                <h1 className="text-3xl text-white mt-4">
                    {event.nome}
                </h1>

                <p className="text-zinc-400 mt-4">
                    {event.descricao}
                </p>
            </div>
        </div>
    );
}