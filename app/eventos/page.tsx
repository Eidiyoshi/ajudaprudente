import { EventosHeader } from "../components/headears";
import { EventList } from "../components/eventList";
import { getUsuarioLogado } from "@/lib/usuario";

export type Event = {
    idevento: number;
    nome: string | null;
    descricao: string | null;
    data: string | null;
    horarioInicio: string | null;
    horarioFim: string | null;
    status: string;
    vagas: number | null;
    endere_o: {
        rua: string | null;
        bairro: string | null;
        cidade: string | null;
    } | null;
};

export default async function VisualizarEventos() {
    const result = await getUsuarioLogado();
    const tipoUsuario = result.ok ? result.usuario.tipoUsuario : null;

    return (
        <div className="min-h-screen bg-zinc-900 p-6">
            <div className="max-w-6xl mx-auto">
                <EventosHeader tipoUsuario={tipoUsuario}/>
                <EventList tipoUsuario={tipoUsuario}/>
            </div>
        </div>
    );
}