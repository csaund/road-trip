let id: number = 0;
let layerId:number = 0;

class Edge {
    public weight:number;
    public fromNeuron: Neuron;
    public toNeuron: Neuron;

    constructor(fromNeuron: Neuron, toNeuron: Neuron) {
        this.fromNeuron = fromNeuron;
        this.toNeuron = toNeuron;
        this.weight = 1;
    }
}

// TS doesn't like when we call this a node >:|
class Neuron {
    public id: number;
    public val:number;
    public edges: Edge[];

    constructor(edges?:Edge[]) {
        this.id = id++;
        this.val = 0;
        this.edges = edges || [];
    }
}

class Layer {
    public id:number;
    public nodes: Neuron[];
    //default to 0 nodes
    constructor(numNeurons:number=0) {
        this.id = layerId++;
        this.nodes = [];
        for(let num = 0; num < numNeurons; num++) {
            this.nodes.push(new Neuron());
        }
    }
}

class Net {
    public layers:Layer[];
    constructor() {
        this.layers = [];
    }
}

function initEdges() {
    for(let i = 0; i < 4; i++) {
        if(net.layers[i+1]) {
            connectEdges(net.layers[i], net.layers[i+1]);
        }
    }
}

function connectEdges(layer1:Layer, layer2:Layer) {
    layer1.nodes.forEach((connectingNode) => {
        layer2.nodes.forEach((recipientNode) => {
            connectingNode.edges.push(new Edge(connectingNode, recipientNode));
        });
    });
}

function printNodes(net:Net) {
    net.layers.forEach((layer:Layer) => {
        layer.nodes.forEach((node) => {
            console.log(node);
        });
    });
}

let net = new Net();
net.layers.push(new Layer(1));
net.layers.push(new Layer(2));
net.layers.push(new Layer(2));
net.layers.push(new Layer(1));

initEdges();
printNodes(net);

// calc input
// backprop

/*
Layer 1:
1
Layer2:
2, 3
Layer 3:
4, 5
Layer 4:
6
1 --> 2,3
2 --> 4, 5
3 --> 4, 5
4 --> 6
5 --> 6
 */
