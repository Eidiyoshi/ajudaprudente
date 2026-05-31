import { Event, getStatusColor } from "./logic";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

function SubscribeButton() {
    return <button className="flex-1 py-2 rounded-md bg-green-700 hover:bg-green-600 text-zinc-100 font-medium transition">Inscrever-se</button>
}

function UnsubscribeButton() {
    return <button className="flex-1 py-2  rounded-md bg-red-700 hover:bg-red-600 text-zinc-100 font-medium transition">Cancelar</button>
}

function VisualizeButton({id}: {id: number}) {
    return <Link href={`/eventos/${id}`} className="flex-1 py-2 rounded-md bg-indigo-700 hover:bg-indigo-600 text-zinc-100 font-medium transition text-center">Visualizar</Link>
}

function EditButton() {
    return <button className="flex-1 py-2 px-4 rounded-md bg-zinc-700 hover:bg-zinc-600 text-zinc-100 font-medium transition">Editar</button>
}


function EventName({name, description}: {name: string, description: string}) {
    return (
        <div>
            <h2 className="text-xl font-semibold text-zinc-100">{name}</h2>

            <p className="text-zinc-400 mt-2 text-sm leading-relaxed">{description}</p>
        </div>
    );
}

function EventStatus({status}: {status: string}) {
    return (
        <div>
            <span className={`px-3 py-1 rounded-full text-xs border font-medium ${getStatusColor(status)}`}>{status}</span>
        </div>
    );
}

function EventDate({date}: {date: string}) {
    return (
        <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-700">
            <p className="text-zinc-400">Data</p>
            <p className="text-zinc-100 font-medium mt-1">{date}</p>
        </div>
    );
}

function EventTime({horarioInicio, horarioFim}: {horarioInicio: string, horarioFim: string}) {
    return (
        <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-700">
            <p className="text-zinc-400">Horário</p>
            <p className="text-zinc-100 font-medium mt-1">{horarioInicio} -{" "}{horarioFim}</p>
        </div>
    );
}

function EventLocation({local}: {local: string}) {
    return (
        <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-700 col-span-2">
            <p className="text-zinc-400">Local</p>
            <p className="text-zinc-100 font-medium mt-1">{local}</p>
        </div>
    );
}

function EventSpots({vagasDisponiveis}: {vagasDisponiveis: number}) {
    return (
        <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-700 col-span-2">
            <p className="text-zinc-400">Vagas Disponíveis</p>
            <p className="text-zinc-100 font-medium mt-1">{vagasDisponiveis}</p>
        </div>
    );
}

function EventHeader({name, description, status}: {name: string, description: string, status: string}) {
    return (
        <div className="flex items-start justify-between gap-4">
            <EventName name={name} description={description} />

            <EventStatus status={status} />
            </div>
    );
}

function EventBody({data, horarioInicio, horarioFim, local, vagasDisponiveis}: {data: string, horarioInicio: string, horarioFim: string, local: string, vagasDisponiveis: number}) {
    return (
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <EventDate date={data} />

            <EventTime horarioInicio={horarioInicio} horarioFim={horarioFim} />

            <EventLocation local={local} />

            <EventSpots vagasDisponiveis={vagasDisponiveis} />
        </div>
    );
}

export function EventCard({ event }: { event: Event }) {
    return (
        <div key={event.id} className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 shadow-lg hover:border-indigo-500/40 transition">
            <EventHeader name={event.nome} description={event.descricao} status={event.status} />

            <EventBody data={event.data} horarioInicio={event.horarioInicio} horarioFim={event.horarioFim} local={event.local} vagasDisponiveis={event.vagasDisponiveis} />
            <div className="mt-4 flex gap-3">
                <VisualizeButton id={event.id} />
                {event.status === "Ativo" ? <SubscribeButton /> : <UnsubscribeButton />}
            </div>
        </div>
    );
}

export function EventCardEdit({ event }: { event: Event }) {
    return (
        <div key={event.id} className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 shadow-lg hover:border-indigo-500/40 transition">
            <EventHeader name={event.nome} description={event.descricao} status={event.status} />

            <EventBody data={event.data} horarioInicio={event.horarioInicio} horarioFim={event.horarioFim} local={event.local} vagasDisponiveis={event.vagasDisponiveis} />
            <div className="mt-4 flex gap-3">
                <VisualizeButton id={event.id} />
                <EditButton />
            </div>
        </div>
    );
}