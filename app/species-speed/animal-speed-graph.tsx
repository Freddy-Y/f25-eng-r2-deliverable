// /* eslint-disable */
// "use client";
// import { max } from "d3-array";
// import { axisBottom, axisLeft } from "d3-axis"; // D3 is a JavaScript library for data visualization: https://d3js.org/
// import { csv } from "d3-fetch";
// import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
// import { select } from "d3-selection";
// import { useEffect, useRef, useState } from "react";

// // Example data: Only the first three rows are provided as an example
// // Add more animals or change up the style as you desire

// // TODO: Write this interface
// type DietType = "herbivore" | "omnivore" | "carnivore";

// interface AnimalDatum {
//   name: string;
//   speed: number;
//   diet: DietType;
// }

// const loadData = async () => {
//   const rawData = await csv("/sample_animals.csv");

//   const cleanData: AnimalDatum[] = rawData
//     .map((d) => ({
//       name: d.name || "Unknown",
//       speed: Number(d["Average Speed (km/h)"]),
//       diet: d.diet?.toLowerCase() as DietType,
//     }))
//     .filter((d) => !isNaN(d.speed) && ["herbivore", "omnivore", "carnivore"].includes(d.diet))
//     .slice(0, 20);

//   return cleanData;
// };

// export default function AnimalSpeedGraph() {
//   // useRef creates a reference to the div where D3 will draw the chart.
//   // https://react.dev/reference/react/useRef
//   const graphRef = useRef<HTMLDivElement>(null);

//   const [animalData, setAnimalData] = useState<AnimalDatum[]>([]);

//   // TODO: Load CSV data
//   useEffect(() => {
//     const fetchAndSetData = async () => {
//       const data = await loadData();
//       setAnimalData(data); // This triggers the second useEffect
//     };
//     fetchAndSetData();
//     console.log("Implement CSV loading!");
//   }, []);

//   useEffect(() => {
//     // Clear any previous SVG to avoid duplicates when React hot-reloads
//     if (graphRef.current) {
//       graphRef.current.innerHTML = "";
//     }

//     if (animalData.length === 0) return;

//     // Set up chart dimensions and margins
//     const containerWidth = graphRef.current?.clientWidth ?? 800;
//     const containerHeight = graphRef.current?.clientHeight ?? 500;

//     // Set up chart dimensions and margins
//     const width = Math.max(containerWidth, 600); // Minimum width of 600px
//     const height = Math.max(containerHeight, 400); // Minimum height of 400px
//     const margin = { top: 70, right: 60, bottom: 80, left: 100 };

//     // Create the SVG element where D3 will draw the chart
//     // https://github.com/d3/d3-selection
//     const svg = select(graphRef.current!).append<SVGSVGElement>("svg").attr("width", width).attr("height", height);

//     // TODO: Implement the rest of the graph
//     // HINT: Look up the documentation at these links
//     // https://github.com/d3/d3-scale#band-scales
//     // https://github.com/d3/d3-scale#linear-scales
//     // https://github.com/d3/d3-scale#ordinal-scales
//     // https://github.com/d3/d3-axis

//     // 1. Scales
//     const x = scaleBand()
//       .domain(animalData.map((d) => d.name))
//       .range([margin.left, width - margin.right])
//       .padding(0.2);

//     const y = scaleLinear()
//       .domain([0, max(animalData, (d) => d.speed) || 0])
//       .nice()
//       .range([height - margin.bottom, margin.top]);

//     const color = scaleOrdinal<DietType, string>()
//       .domain(["herbivore", "omnivore", "carnivore"])
//       .range(["#4ade80", "#fbbf24", "#f87171"]); // Green, Amber, Red

//     // 2. Draw Bars
//     svg
//       .append("g")
//       .selectAll("rect")
//       .data(animalData)
//       .join("rect")
//       .attr("x", (d) => x(d.name)!)
//       .attr("y", (d) => y(d.speed))
//       .attr("height", (d) => y(0) - y(d.speed))
//       .attr("width", x.bandwidth())
//       .attr("fill", (d) => color(d.diet));

//     // 3. Add Axes
//     const xAxis = axisBottom(x);
//     const yAxis = axisLeft(y);

//     svg
//       .append("g")
//       .attr("transform", `translate(0,${height - margin.bottom})`)
//       .call(xAxis)
//       .selectAll("text") // Polish: Rotate labels if they overlap
//       .attr("transform", "rotate(-45)")
//       .style("text-anchor", "end");

//     svg.append("g").attr("transform", `translate(${margin.left},0)`).call(yAxis);

//     // 4. Axis Titles
//     svg
//       .append("text")
//       .attr("x", width / 2)
//       .attr("y", height - 10)
//       .attr("text-anchor", "middle")
//       .text("Animal Name");

//     svg
//       .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("x", -height / 2)
//       .attr("y", 40)
//       .attr("text-anchor", "middle")
//       .text("Speed (km/h)");
//   }, [animalData]);

//   // TODO: Return the graph
//   return (
//     <div className="mx-auto w-full max-w-4xl p-4">
//       <h1 className="mb-6 text-center text-2xl font-bold">Animal Speeds by Diet</h1>
//       <div ref={graphRef} className="h-[500px] w-full overflow-hidden rounded bg-white shadow-md">
//         {/* D3 will inject the <svg> here */}
//       </div>
//     </div>
//   );
// }
/* eslint-disable */
"use client";
import { max } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { csv } from "d3-fetch";
import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
import { select } from "d3-selection";
import { useEffect, useRef, useState } from "react";

type DietType = "Herbivore" | "Omnivore" | "Carnivore";

interface AnimalDatum {
  name: string;
  speed: number;
  diet: DietType;
}

const loadData = async () => {
  const rawData = await csv("/sample_animals.csv");

  return rawData
    .map((d) => ({
      // Map 'Animal' from CSV to the 'name' property in your interface
      name: d["Animal"] || "Unknown",

      // Convert speed string to a Number
      speed: Number(d["Average Speed (km/h)"]),

      // Standardize 'Diet' (Herbivore -> herbivore)
      diet: d["Diet"]?.trim().toLowerCase() as DietType,
    }))
    .filter((d) => d.name !== "Unknown" && !isNaN(d.speed) && ["herbivore", "omnivore", "carnivore"].includes(d.diet))
    .sort((a, b) => b.speed - a.speed) // Sort fastest to slowest
    .slice(0, 50);
};

export default function AnimalSpeedGraph() {
  const graphRef = useRef<HTMLDivElement>(null);
  const [animalData, setAnimalData] = useState<AnimalDatum[]>([]);

  useEffect(() => {
    loadData().then((setData) => {
      setAnimalData(setData);
    });
  }, []);

  useEffect(() => {
    if (!graphRef.current || animalData.length === 0) return;

    // 1. Clear previous content
    const container = select(graphRef.current);
    container.selectAll("*").remove();

    // 2. Dimensions
    // Use getBoundingClientRect for more accurate measurement than clientWidth
    const rect = graphRef.current.getBoundingClientRect();
    const width = rect.width || 800;
    const height = 500;
    const margin = { top: 50, right: 30, bottom: 100, left: 60 };

    const svg = container
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`) // Makes it responsive
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("display", "block");

    // 3. Scales
    const x = scaleBand()
      .domain(animalData.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.3);

    const y = scaleLinear()
      .domain([0, max(animalData, (d) => d.speed) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const color = scaleOrdinal<DietType, string>()
      .domain(["Herbivore", "Omnivore", "Carnivore"])
      .range(["#4ade80", "#fbbf24", "#f87171"]);

    // 4. Bars
    svg
      .append("g")
      .selectAll("rect")
      .data(animalData)
      .join("rect")
      .attr("x", (d) => x(d.name)!)
      .attr("y", (d) => y(d.speed))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.speed))
      .attr("fill", (d) => color(d.diet))
      .attr("rx", 4); // Aesthetic: Rounded corners

    // 5. Axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", "12px")
      .style("fill", "#64748b");

    svg.selectAll(".domain, .tick line").style("stroke", "#64748b");
    svg.append("g").attr("transform", `translate(${margin.left},0)`).call(axisLeft(y));

    // 6. Legend (Top Right)
    const legend = svg.append("g").attr("transform", `translate(${width - 120}, 10)`);

    const diets: DietType[] = ["Herbivore", "Omnivore", "Carnivore"];

    diets.forEach((diet, i) => {
      const g = legend.append("g").attr("transform", `translate(0, ${i * 20})`);
      g.append("rect").attr("width", 12).attr("height", 12).attr("fill", color(diet));
      g.append("text")
        .attr("x", 20)
        .attr("y", 10)
        .style("font-size", "12px")
        .style("text-transform", "capitalize")
        .text(diet);
    });
  }, [animalData]);

  return (
    <div className="mx-auto w-full max-w-5xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Animal Speed Comparison</h1>
        <span className="text-sm text-slate-500">Top {animalData.length} Animals</span>
      </div>
      <div ref={graphRef} className="min-h-[500px] w-full rounded-xl border border-slate-100 bg-white p-4 shadow-xl">
        {animalData.length === 0 && (
          <div className="flex h-full items-center justify-center text-slate-400">Loading animal data...</div>
        )}
      </div>
    </div>
  );
}
