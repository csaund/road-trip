var id = 0;
var layerId = 0;
var Edge = (function () {
    function Edge(fromNeuron, toNeuron) {
        this.fromNeuron = fromNeuron;
        this.toNeuron = toNeuron;
        this.weight = 1;
    }
    return Edge;
}());
// TS doesn't like when we call this a node >:|
var Neuron = (function () {
    function Neuron(edges) {
        this.id = id++;
        this.val = 0;
        this.edges = edges || [];
    }
    return Neuron;
}());
var Layer = (function () {
    //default to 0 nodes
    function Layer(numNeurons) {
        if (numNeurons === void 0) { numNeurons = 0; }
        this.id = layerId++;
        this.nodes = [];
        for (var num = 0; num < numNeurons; num++) {
            this.nodes.push(new Neuron());
        }
    }
    return Layer;
}());
var Net = (function () {
    function Net() {
        this.layers = [];
    }
    return Net;
}());
function initEdges() {
    for (var i = 0; i < 4; i++) {
        if (net.layers[i + 1]) {
            connectEdges(net.layers[i], net.layers[i + 1]);
        }
    }
}
function connectEdges(layer1, layer2) {
    layer1.nodes.forEach(function (connectingNode) {
        layer2.nodes.forEach(function (recipientNode) {
            connectingNode.edges.push(new Edge(connectingNode, recipientNode));
        });
    });
}
function printNodes(net) {
    net.layers.forEach(function (layer) {
        layer.nodes.forEach(function (node) {
            console.log(node);
        });
    });
}
var net = new Net();
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
//# sourceMappingURL=xor.js.map