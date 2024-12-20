const fs = require('fs');

// Example input
const inputArray = [
  { name: "neons-personal", neighbors: ["fox-bites", "ambers-mine", "micahs-hobbit-hole", "skyfalls-airport", "tales-of-aadil", "the-wild-ramblings-of-kieran"] },
  {
    name: "antarctica",
    neighbors: []
  }, {
    name: "niko-commits-vehicular-manslaughter",
    neighbors: []
  },
  {
    name: "the-wild-ramblings-of-kieran",
    neighbors: ["the-chaos-room", "the-potion-pond", "dinobox-den", "owasis-revenge-plans", "samuel-land", "jeremy-rambles"]
  }, {
    name: "jeremy-rambles",
    neighbors: ["adrian-goes-insane", "my-personal-channel-ig", "devarshs-channel", "phthallocyanine", "whowhatwarewhywhen", "kittycats-cattery", "firepup-public-chan", "sarans-fuzzy-corner", "noras-basement", "the-hen-coop", "abhay-makes-pfps", "niko-commits-vehicular-manslaughter", "vic"]
  },
  {
    name: "micahs-hobbit-hole",
    neighbors: ["skyfalls-airport", "the-wild-ramblings-of-kieran", "ambers-mine", "enys-pirate-cove", "the-potion-pond", "the-chaos-room", "bartosz-fans", "briyansbiriyanicafe", "owais-revenge-plans", "the-fast-lane", "zrl-land", "acon-yaps", "rio-updates", "alex-containment-chamber", "ducc-ducc-goos", "pirates-port"]
  },
  {
    name: "davids-me",
    neighbors: ["blahaj-land", "eeriergosling", "reesericdotci", "samuel-land", "alex-shark-land", "zoyas-atelier", "davids-me", "firepup-public-chan", "sam-is-a-horrible-procrastinator-and-cant-run-or-else-nest-will-break", "ambers-mine", "msn", "nimit"]
  },
  {
    name: "elijah-does-stuff",
    neighbors: []
  },
  {
    name: "crabbys-cove",
    neighbors: []
  },
  {
    name: "felixs-corner",
    neighbors: []
  },
  {
    name: "the-chicken-coop",
    neighbors: ["samuel-land", "owais-revenge-plans", "whowhatwarewhywhen", "adrian-goes-insane", "blahaj-land", "diy-tsar-bomb", "kittycats-cattery", "the-chaos-room", "abhay-makes-pfps"]
  },
  {
    name: "lucas-cave",
    // close enough
    neighbors: ["samuel-land"]
  },
  {
    name: "alex-goes-insane",
    neighbors: ["eeriergosling", "reesericdotci", "samuel-land", "alex-shark-land", "zoyas-atelier", "davids-me"]
  },
  {
    name: "tales-of-aadil",
    neighbors: []
  },
  {
    name: "nekos-random-corner-of-the-high-school-party-she-was-invited-to-for-no-reason",
    neighbors: ["aviary", "blahaj-land", "ambers-mine", "whowhatwarewhywhen", "3с", "the-chaos-room"]
  },
  {
    name: "ajhalili2006-lair",
    neighbors: []
  },
  // pt2
  {
    name: "adam-gets-a-compiler-error-on-html",
    neighbors: ["neons-personal", "tales-of-aadil"]
  },
  {
    name: "fox-bites",
    neighbors: [
      "neons-personal",
    ]
  },
  {
    name: "skyfalls-airport",
    neighbors: ["ambers-mine", "jeremy-rambles", "enys-pirate-cove", "3с", "felixs-corner", "lkmw", "owais-revenge-plans", "micahs-hobbit-hole", "tales-of-aadil"]
  },
  {
    name: "vic",
    neighbors: []
  }, {
    name: "kittycats-cattery",
    neighbors: ["ambers-mine", "blahaj-land", "nikos-hurdles", "enys-pirate-cove", "the-chaos-room"]
  }, {
    name: "arnav",
    neighbors: []
  },
  {
    name: "kokorner",
    neighbors: []
  },
  {
    name: "amateur-rocketry",
    neighbors: []
  },
  {
    name: "fropiis-pikmins",
    neighbors: ["neons-personal"]
  },
  {
    name: "sarans-fuzzy-corner",
    neighbors: ["sarans-fuzzy-pings-and-recs-corner", "blahaj-land", "cookies-and-chai"]
  }
];

// Step 1: Create a map of node names to unique IDs
let nodeIdMap = {};   // This will store node names as keys and their IDs as values
let nodes = [];       // This will store the nodes
let nodeIdCounter = 0; // This counter generates unique IDs

// Function to add node if not already present
function addNode(name) {
  if (!(name in nodeIdMap)) {  // Check if the node is not already added
    nodeIdMap[name] = nodeIdCounter++; // Assign a unique ID and increment the counter
    nodes.push({ id: nodeIdMap[name], label: name }); // Add the node to the array
  }
}

// Step 2: Add nodes from input array and their neighbors
inputArray.forEach(entry => {
  // Add the current node (it will only be added once)
  addNode(entry.name);

  // Add neighbors only if not already added
  entry.neighbors.forEach(neighbor => {
    addNode(neighbor);  // Add each neighbor, ensuring no duplicates
  });
});

// Step 3: Create the edges array using node IDs
let edges = [];
let edgeSet = new Set();  // To ensure uniqueness of edges

// Step 4: Create edges
inputArray.forEach(entry => {
  const fromId = nodeIdMap[entry.name];
  entry.neighbors.forEach(neighbor => {
    const toId = nodeIdMap[neighbor];

    // Create a unique key for the edge, treating (from -> to) and (to -> from) as the same
    const edgeKey = [fromId, toId].sort().join('-');  // Sort the IDs to handle bidirectional edges

    // Add the edge only if it doesn't already exist
    if (!edgeSet.has(edgeKey)) {
      edges.push({ from: fromId, to: toId });
      edgeSet.add(edgeKey);  // Mark this edge as seen
    }
  });
});

// Output the final nodes and edges
console.log("Nodes Array:", JSON.stringify(nodes, null, 2));
console.log("Edges Array:", JSON.stringify(edges, null, 2));

// Writing data to a TypeScript file
fs.writeFileSync('src/data.ts', `// autogenerated file\nexport const nodes = ${JSON.stringify(nodes, null, 2)};\nexport const edges = ${JSON.stringify(edges, null, 2)};`);
