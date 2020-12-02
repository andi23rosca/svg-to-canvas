import { INode, parseSync } from "svgson";
import { parse as parsePath } from "path-ast";


function parse(svg: string) {
  const ast = parseSync(svg);

  function replaceData(ast: INode) {
    if (ast.name === "path") {
      if ("d" in ast.attributes) {
        console.log("found")
        ast.attributes.d = parsePath(ast.attributes.d);
      }
    }
    if (ast.children) {
      ast.children.forEach(replaceData);
    }
  }

  replaceData(ast);
  console.log(JSON.stringify(ast, null, 2));

  return ast;
}


parse(`
<svg height="210" width="400">
<path d="M150 0 L75 200 L225 200 Z" />
</svg>`)