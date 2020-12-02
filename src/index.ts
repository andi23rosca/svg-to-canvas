import { parseSync } from "svgson";
import { parse as parsePath } from "path-ast";


function parse(svg: string) {
  const ast = parseSync(svg, {
    transformNode(node) {
      if (node.name === "path" && "d" in node.attributes) {
        node.attributes.d = parsePath(node.attributes.d);
      }
      return node;
    }
  });
  console.log(JSON.stringify(ast, null, 2));
  return ast;
}


const svg = parse(`
<svg height="210" width="400">
<path d="M150 0 L75 200 L225 200 Z" />
</svg>`)

const canvas = document.querySelector("#c") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

