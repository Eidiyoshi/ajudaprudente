"use client";  
  
import { useEffect, useRef, useState } from "react";  
import * as d3 from "d3";  
import cloud from "d3-cloud";  
  
interface WordData {  
  text: string;  
  value: number; // tamanho da palavra na word cloud
}  

type Feedback = { type: 'success' | 'error'; message: string } | null;

const pronomes: string[] = ["eu","tu","você","ele","ela","nós","vós","vocês","eles","elas","me","mim","comigo","te","ti","contigo","lhe","se","si","contigo","conosco","covosco",]
const artigos: string[] = ["o","a","os","as","um","uma","uns","umas",]
const preposicoes: string[] = ["a","ante","após","até","com","de","desde","em","entre","para","per","perante","por","sem","sob","sobre","trás"]
const palavrasProibidas: string[] = pronomes.concat(artigos,preposicoes);

function increase(words: WordData[], palavra: string){
  const existingWord = words.find(w => w.text === palavra);   
  if (existingWord) {  
    existingWord.value += 10;  
  } else {  
    words.push({ text: palavra, value: 30 });  
  }  
}
  
export default function WordCloudPage() {  
  const svgRef = useRef<SVGSVGElement>(null);  

  const [feedback, setFeedback] = useState<Feedback>(null);

  useEffect(() => {  
    setFeedback(null)
    let getData = () => {
      try {
        const response = fetch('/api/', {method: "GET"} ); // a colocar, nao existe ainda
        setFeedback({ type: 'success', message: 'Analises obtidas',});
        return ( response.json()) as AnalisesApiReponse & { error?: string};; // assumindo que as respostas serao apenas as analises, mas prov teria q ter alguma adaptacao
      } catch {
        setFeedback({ type: 'error', message: 'Erro ao obter análises.',});
        return;
      }
    }

    let data = getData(); // data sera mockado, pois nao eh possivel pegar ainda

    //if(feedback.type == 'error') return;

    let analisesMock: string[] = [ "o evento foi muito legal", "o organizador é bem desorganizado", "o evento poderia ser mais longo" ];     
    data = analisesMock;

    let words: WordData[] = [];

    //console.log(palavrasProibidas)
    //console.log("data:",data);
    for (let index in data){
      let fraseAnalise = data[index];
      let palavrasAnalise = fraseAnalise.split(" ");
      //console.log("palavraAnalise",palavrasAnalise)
      for (let j in palavrasAnalise){
        let palavra = palavrasAnalise[j];

        if(!palavrasProibidas.includes(palavra)){
          //console.log("palavra:",palavra);
          increase(words, palavra);
        }
      }
    }

    const width = 800;  
    const height = 600;  
    
    const layout = cloud()  
      .size([width, height])  
      .words(words)  
      .padding(5)  
      .rotate(() => (~~(Math.random() * 2) * 90))  
      .font("Impact")  
      .fontSize((d: WordData) => d.value)  
      .on("end", draw);  
  
    layout.start();  
  
    function draw(words: PositionedWord[]) {  
      const svg = d3.select(svgRef.current);  
      svg.selectAll("*").remove();  
  
      svg  
        .attr("width", width)  
        .attr("height", height)  
        .append("g")  
        .attr("transform", `translate(${width / 2},${height / 2})`)  
        .selectAll("text")  
        .data(words)  
        .enter()  
        .append("text")  
        .style("font-size", (d) => `${d.size}px`)  
        .style("font-family", (d) => d.font)  
        .style("fill", "steelblue")  
        .attr("text-anchor", "middle")  
        .attr("transform", (d) => `translate(${d.x},${d.y})rotate(${d.rotate})`)  
        .text((d) => d.text);  
    }  
  }, []);  
  
  return (  
    <div className="flex flex-col items-center justify-center min-h-screen p-8">  
      <h1 className="text-3xl font-bold mb-8">Word Cloud</h1>  
      <svg ref={svgRef}></svg>  
    </div>  
  );  
}