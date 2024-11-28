import React, { useEffect, useRef } from 'react';
import { Network } from "vis-network";
import { edges, nodes } from './data';
const VisNetwork = () => {
	// Create a ref to provide DOM access
	const visJsRef = useRef(null);
	useEffect(() => {
		// Once the ref is created, we'll be able to use vis
    const network:any =
			visJsRef.current &&
			new Network(visJsRef.current, { nodes: nodes, edges: edges }, {
        // nodes: {
          nodes: {
            shape: "dot",
            scaling: {
              min: 10,
              max: 30,
            },
            font: {
              size: 12,
              color: "var(--text)",
              face: "Tahoma",
            },
          },
          edges: {
            color: { inherit: true },
            width: 0.15,
            // smooth: true,
            //@ts-ignore
            smooth: true,
          },

          interaction: {
            hideEdgesOnDrag: true,
            tooltipDelay: 200,
          },
        physics: {
    enabled: true,
          barnesHut: {
            gravitationalConstant: -2000,
            springConstant: 0.005,
            springLength: 25,
          },
        },
        width: "1000px",
        height: "1000px",
         // Zoom configuration
    autoResize: true,
    //@ts-ignore
    zoom: {
    min: 0.2,     // Minimum zoom level
    max: 3,       // Maximum zoom level
    initialScale: 1 // This sets the initial zoom scale at 100%
  },
  layout: {
    improvedLayout: true, // Helps the network start with a better layout
    randomSeed: 1 // Use this if you want the initial layout to change with each load
  },
  
        // zoom: 1
      });
	}, [visJsRef]);
	return <div ref={visJsRef} className='max-w-screen max-h-screen' />;
};

function App() {
  return (
<div className="hero min-h-screen" style={{ background: "var(--base)"}}>
  <div className="hero-content text-center">
    <div className='max-w-full max-h-full'>
      <h1 className="text-5xl font-bold">Map of neighbors</h1>
      <br />
<VisNetwork  />
    </div>
  </div>
</div>
  );
}

export default App;
