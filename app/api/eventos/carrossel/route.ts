import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface EventoRaw {
    idevento: number;
    nome: string | null;
    data: Date | null;
    horarioInicio: string | null;
    horarioFim: string | null;
    endereco: number | null;
    organizador: number;
    publicado: number;
    descricao: string | null;
    status: string;
    vagas: number | null;
    end_id: number | null;
    end_cidade: string | null;
    end_bairro: string | null;
    end_rua: string | null;
    end_cep: string | null;
    end_apartamento: string | null;
    end_numero: string | null;
}

export async function GET() {
    try {
        const eventos = await prisma.$queryRaw<EventoRaw[]>`
            SELECT 
                e.*,
                en.idendereço   AS end_id,
                en.cidade       AS end_cidade,
                en.bairro       AS end_bairro,
                en.rua          AS end_rua,
                en.cep          AS end_cep,
                en.apartamento  AS end_apartamento,
                en.numero       AS end_numero
            FROM evento e
            LEFT JOIN endereço en ON e.endereco = en.idendereço
            WHERE e.publicado = 1
            ORDER BY RAND()
            LIMIT 5
        `;

        const shaped = eventos.map(({ 
            end_id, end_cidade, end_bairro, end_rua, 
            end_cep, end_apartamento, end_numero, 
            ...e 
        }) => ({
            ...e,
            endere_o: end_id ? {
                idendere_o:  end_id,
                cidade:      end_cidade,
                bairro:      end_bairro,
                rua:         end_rua,
                cep:         end_cep,
                apartamento: end_apartamento,
                numero:      end_numero,
            } : null,
        }));

        return NextResponse.json(shaped);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Erro ao buscar eventos" },
            { status: 500 }
        );
    }
}