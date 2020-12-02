import { parseSync } from "svgson";
import { parse as parsePath } from "path-ast";


function parse(svg: string) {
  const ast = parseSync(svg, {
    transformNode(node) {
      if (node.name === "path") {
        if ("d" in node.attributes) {
          node.attributes.d = parsePath(node.attributes.d);
        }
      }
      return node;
    }
  });
  console.log(JSON.stringify(ast, null, 2));
  return ast;
}


parse(`
<svg height="210" width="400">
<path d="M150 0 L75 200 L225 200 Z" />
</svg>`)