"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

interface WordData {
    text: string;
    value: number;
}

// Interface estrita para mapear os dados estendidos exigidos pelo d3-cloud
interface PositionedWord extends cloud.Word {
    text: string;
    size: number;
    font: string;
    x: number;
    y: number;
    rotate: number;
}

interface EventWordCloudProps {
    words: WordData[];
}

export function EventWordCloud({ words }: EventWordCloudProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current || words.length === 0) return;

        const width = 500;
        const height = 300;

        // Normalização segura do tamanho máximo e mínimo
        const maxVal = d3.max(words, (d) => d.value) || 1;
        const minVal = d3.min(words, (d) => d.value) || 1;

        const sizeScale = d3
            .scaleLinear()
            .domain([minVal, maxVal])
            .range([14, 48]);

        // Cria os objetos estritamente moldados conforme a tipagem do d3-cloud requer
        const cloudWords: cloud.Word[] = words.map((w) => ({
            text: w.text,
            size: sizeScale(w.value),
        }));

        const layout = cloud()
            .size([width, height])
            .words(cloudWords)
            .padding(6)
            .rotate(() => ~~(Math.random() * 2) * 90)
            .font("Impact")
            // Resolvido erro de explicit-any garantindo o tipo estrito do argumento
            .fontSize((d: cloud.Word) => d.size ?? 14)
            .on("end", draw);

        layout.start();

        function draw(wordsData: cloud.Word[]) {
            const svg = d3.select(svgRef.current);
            svg.selectAll("*").remove();

            // Resolvido erro de 'schemeIndigo': Usamos uma paleta de cores hexadecimais explícitas do indigo/violet do Tailwind
            const cores = [
                "#6366f1",
                "#4f46e5",
                "#4338ca",
                "#3730a3",
                "#818cf8",
                "#a5b4fc",
            ];
            const obterCor = (index: number): string =>
                cores[index % cores.length];

            svg.attr("viewBox", `0 0 ${width} ${height}`)
                .attr("width", "100%")
                .attr("height", "100%")
                .append("g")
                .attr("transform", `translate(${width / 2},${height / 2})`)
                .selectAll("text")
                .data(wordsData as PositionedWord[])
                .enter()
                .append("text")
                .style("font-size", (d) => `${d.size}px`)
                .style("font-family", (d) => d.font)
                // Resolvido erro 'No overload matches this call' forçando o retorno estrito de string
                .style("fill", (_, i) => obterCor(i))
                .attr("text-anchor", "middle")
                .attr(
                    "transform",
                    (d) => `translate(${d.x},${d.y})rotate(${d.rotate})`,
                )
                .text((d) => d.text);
        }
    }, [words]);

    if (words.length === 0) {
        return (
            <p className="text-zinc-500 text-xs">
                Aguardando feedbacks suficientes.
            </p>
        );
    }

    return (
        <div className="w-full h-full flex items-center justify-center min-h-[280px]">
            <svg ref={svgRef} className="max-w-full max-h-full"></svg>
        </div>
    );
}
