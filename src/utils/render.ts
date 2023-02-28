import { marked } from "marked";
import katex from "katex";

const renderer = new marked.Renderer();
let originParagraph = renderer.paragraph.bind(renderer);

renderer.paragraph = (text) => {
  const blockRegex = /\$\$[^\$]*\$\$/g;
  const inlineRegex = /\$[^\$]*\$/g;
  const blockExprArray = text.match(blockRegex);
  const inlineExprArray = text.match(inlineRegex);

  blockExprArray?.forEach((expr) => {
    const result = renderMathsExpression(expr);
    text = text.replace(expr, result ?? "");
  });
  inlineExprArray?.forEach((expr) => {
    const result = renderMathsExpression(expr);
    text = text.replace(expr, result ?? "");
  });

  return originParagraph(text);
};

function renderMathsExpression(expr: string) {
  if (expr[0] === "$" && expr[expr.length - 1] === "$") {
    let displayStyle = false;
    expr = expr.substring(1, expr.length - 1);

    if (expr[0] === "$" && expr[expr.length - 1] === "$") {
      displayStyle = true;
      expr = expr.substring(1, expr.length - 1);
    }

    let html = null;
    try {
      html = katex.renderToString(expr);
    } catch (e) {
      console.error(e);
    }
    if (displayStyle && html) {
      html = html.replace(
        /class="katex"/g,
        'class="katex katex-block" style="display: block;"'
      );
    }
    return html;
  } else {
    return null;
  }
}

export const renderToString = (content: string) => {
  marked.setOptions({
    renderer,
  });
  const str = marked.parse(content);
  return str;
};
