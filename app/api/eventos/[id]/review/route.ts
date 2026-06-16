import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";

interface AvaliacaoComVoluntario {
    idavaliacao: number;
    evento: number;
    voluntario: number;
    organizacao: number;
    comunicacao: number;
    clarezaAtividadesDesempenhadas: number;
    apoioEquipe: number;
    satisfacaoGeral: number;
    interesseVoluntariarNovamente: number;
    pontosPositivos: string | null;
    pontosNegativos: string | null;
    criado: Date;
    voluntario_avaliacao_eventoTovoluntario?: {
        nome: string;
    } | null;
}

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } },
) {
    const eventId = Number(params.id);

    if (isNaN(eventId)) {
        return NextResponse.json({ error: "ID inválido." }, { status: 400 });
    }

    const sessionUser = await getSessionUser();
    const voluntarioId = sessionUser?.userId;

    if (!voluntarioId) {
        return NextResponse.json(
            { error: "Não autenticado." },
            { status: 401 },
        );
    }

    const body = await req.json();
    const {
        organizacao,
        comunicacao,
        clarezaAtividadesDesempenhadas,
        apoioEquipe,
        satisfacaoGeral,
        interesseVoluntariarNovamente,
        pontosPositivos,
        pontosNegativos,
    } = body;

    const campos = {
        organizacao,
        comunicacao,
        clarezaAtividadesDesempenhadas,
        apoioEquipe,
        satisfacaoGeral,
        interesseVoluntariarNovamente,
    };
    for (const [key, value] of Object.entries(campos)) {
        if (!value || value < 1 || value > 5) {
            return NextResponse.json(
                { error: `Campo "${key}" deve ser entre 1 e 5.` },
                { status: 400 },
            );
        }
    }

    try {
        const avaliacao = await prisma.avaliacao_evento.create({
            data: {
                evento: eventId,
                voluntario: Number(voluntarioId),
                organizacao,
                comunicacao,
                clarezaAtividadesDesempenhadas,
                apoioEquipe,
                satisfacaoGeral,
                interesseVoluntariarNovamente,
                pontosPositivos: pontosPositivos?.trim() || null,
                pontosNegativos: pontosNegativos?.trim() || null,
            },
        });

        return NextResponse.json(avaliacao, { status: 201 });
    } catch (e: unknown) {
        if (e instanceof Error && "code" in e && e.code === "P2002") {
            return NextResponse.json(
                { error: "Você já avaliou este evento." },
                { status: 409 },
            );
        }
        return NextResponse.json({ error: "Erro interno." }, { status: 500 });
    }
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const resolvedParams = await params;
    const eventId = Number(resolvedParams.id);

    if (isNaN(eventId)) {
        return NextResponse.json({ error: "ID inválido." }, { status: 400 });
    }

    try {
        let avaliacoes: AvaliacaoComVoluntario[];

        try {
            avaliacoes = (await prisma.avaliacao_evento.findMany({
                where: { evento: eventId },
                include: {
                    voluntario_avaliacao_eventoTovoluntario: {
                        select: { nome: true },
                    },
                },
                orderBy: { criado: "desc" },
            })) as AvaliacaoComVoluntario[];
        } catch (relationError) {
            console.warn(
                "Aviso: Falha no include automático do voluntário. Buscando dados simplificados.",
                relationError,
            );
            avaliacoes = (await prisma.avaliacao_evento.findMany({
                where: { evento: eventId },
                orderBy: { criado: "desc" },
            })) as AvaliacaoComVoluntario[];
        }

        const inicializarMetricas = () => ({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

        const contagemHistogramas = {
            organizacao: inicializarMetricas(),
            comunicacao: inicializarMetricas(),
            clarezaAtividadesDesempenhadas: inicializarMetricas(),
            apoioEquipe: inicializarMetricas(),
            satisfacaoGeral: inicializarMetricas(),
            interesseVoluntariarNovamente: inicializarMetricas(),
        };

        type MetricaKey = keyof typeof contagemHistogramas;
        const chavesMetricas = Object.keys(contagemHistogramas) as MetricaKey[];

        avaliacoes.forEach((av) => {
            chavesMetricas.forEach((metrica) => {
                const nota = av[metrica] as 1 | 2 | 3 | 4 | 5;
                if (contagemHistogramas[metrica][nota] !== undefined) {
                    contagemHistogramas[metrica][nota]++;
                }
            });
        });

        const formatarHistograma = (obj: Record<number, number>) =>
            Object.entries(obj).map(([nota, quantidade]) => ({
                nota: Number(nota),
                quantidade,
            }));

        const histograms = {
            organizacao: formatarHistograma(contagemHistogramas.organizacao),
            comunicacao: formatarHistograma(contagemHistogramas.comunicacao),
            clarezaAtividadesDesempenhadas: formatarHistograma(
                contagemHistogramas.clarezaAtividadesDesempenhadas,
            ),
            apoioEquipe: formatarHistograma(contagemHistogramas.apoioEquipe),
            satisfacaoGeral: formatarHistograma(
                contagemHistogramas.satisfacaoGeral,
            ),
            interesseVoluntariarNovamente: formatarHistograma(
                contagemHistogramas.interesseVoluntariarNovamente,
            ),
        };

        const textoAgrupado = avaliacoes
            .map(
                (av) =>
                    `${av.pontosPositivos || ""} ${av.pontosNegativos || ""}`,
            )
            .join(" ")
            .toLowerCase();

        const stopwords = new Set([
            "de",
            "a",
            "o",
            "que",
            "e",
            "do",
            "da",
            "em",
            "um",
            "para",
            "com",
            "na",
            "no",
            "os",
            "as",
            "dos",
            "das",
            "ao",
            "aos",
            "por",
            "mais",
            "uma",
            "como",
            "mas",
            "foi",
            "ele",
            "ela",
        ]);

        const palavras = textoAgrupado.match(/\b[a-zA-Zà-úÀ-Ú0-9_]+\b/g) || [];
        const mapaFrequencia: Record<string, number> = {};

        palavras.forEach((palavra) => {
            if (!stopwords.has(palavra) && palavra.length > 2) {
                mapaFrequencia[palavra] = (mapaFrequencia[palavra] || 0) + 1;
            }
        });

        const wordCloud = Object.entries(mapaFrequencia)
            .map(([text, value]) => ({ text, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 50);

        const comments = avaliacoes.map((av) => {
            const relacaoVoluntario =
                av.voluntario_avaliacao_eventoTovoluntario;
            return {
                id: av.idavaliacao,
                voluntarioNome:
                    relacaoVoluntario?.nome || `Voluntário #${av.voluntario}`,
                pontosPositivos: av.pontosPositivos,
                pontosNegativos: av.pontosNegativos,
                criado: av.criado,
            };
        });

        return NextResponse.json(
            {
                histograms,
                wordCloud,
                comments,
            },
            { status: 200 },
        );
    } catch (error) {
        console.error("Erro crítico ao gerar dashboard:", error);
        return NextResponse.json(
            { error: "Erro interno ao processar dados do painel." },
            { status: 500 },
        );
    }
}
