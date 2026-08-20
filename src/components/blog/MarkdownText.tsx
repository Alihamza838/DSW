import * as React from "react";
import { Link } from "../ui/Link";

// Parse inline bold elements and hyperlinks
function parseInlineMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldIndex = remaining.indexOf("**");
    const linkIndex = remaining.indexOf("[");

    if (boldIndex === -1 && linkIndex === -1) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    // Bold tag comes first
    if (boldIndex !== -1 && (linkIndex === -1 || boldIndex < linkIndex)) {
      if (boldIndex > 0) {
        parts.push(<span key={key++}>{remaining.substring(0, boldIndex)}</span>);
      }
      const endBold = remaining.indexOf("**", boldIndex + 2);
      if (endBold !== -1) {
        parts.push(
          <strong key={key++} className="font-bold text-ink">
            {remaining.substring(boldIndex + 2, endBold)}
          </strong>
        );
        remaining = remaining.substring(endBold + 2);
      } else {
        parts.push(<span key={key++}>**</span>);
        remaining = remaining.substring(boldIndex + 2);
      }
    } 
    // Link tag comes first
    else {
      if (linkIndex > 0) {
        parts.push(<span key={key++}>{remaining.substring(0, linkIndex)}</span>);
      }
      const closeBracket = remaining.indexOf("]", linkIndex);
      const openParen = remaining.indexOf("(", closeBracket);
      const closeParen = remaining.indexOf(")", openParen);

      if (closeBracket !== -1 && openParen === closeBracket + 1 && closeParen !== -1) {
        const linkText = remaining.substring(linkIndex + 1, closeBracket);
        const url = remaining.substring(openParen + 1, closeParen);
        parts.push(
          <Link key={key++} href={url} className="text-teal-brand font-semibold underline underline-offset-2 hover:text-teal-dark transition-colors">
            {linkText}
          </Link>
        );
        remaining = remaining.substring(closeParen + 1);
      } else {
        parts.push(<span key={key++}>[</span>);
        remaining = remaining.substring(linkIndex + 1);
      }
    }
  }

  return <React.Fragment>{parts}</React.Fragment>;
}

export function MarkdownText({ source, className }: { source?: string; className?: string }) {
  if (!source) return null;

  const lines = source.split("\n");
  const renderedElements: React.ReactNode[] = [];
  let inList = false;
  let listItems: React.ReactNode[] = [];
  
  let inTable = false;
  let tableLines: string[] = [];
  
  let keyIndex = 0;

  const flushList = () => {
    if (inList && listItems.length > 0) {
      renderedElements.push(
        <ul key={`list-${keyIndex++}`} className="mb-4 list-disc pl-6 text-ink-600 space-y-1.5 text-sm leading-relaxed">
          {listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  const flushTable = () => {
    if (inTable && tableLines.length > 0) {
      const parsedRows = tableLines.map(line => {
        return line
          .split("|")
          .map(cell => cell.trim())
          .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      });

      if (parsedRows.length > 0) {
        const headers = parsedRows[0];
        const hasDivider = parsedRows[1] && parsedRows[1].some(cell => cell.includes("---"));
        const dataRows = hasDivider ? parsedRows.slice(2) : parsedRows.slice(1);

        renderedElements.push(
          <div key={`table-${keyIndex++}`} className="my-6 overflow-x-auto rounded-xl border border-ink-100 shadow-3xs">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-ink-50/80 border-b border-ink-100">
                  {headers.map((h, idx) => (
                    <th key={idx} className="p-3 font-display font-bold text-ink">
                      {parseInlineMarkdown(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-50">
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-ink-50/30 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3 text-ink-600">
                        {parseInlineMarkdown(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      tableLines = [];
      inTable = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check if we are exiting a table or list
    if (!line.startsWith("|")) {
      flushTable();
    }
    if (!line.startsWith("-") && !line.startsWith("*")) {
      flushList();
    }

    if (!line) {
      continue;
    }

    // Custom BAR_CHART block parser
    if (line.startsWith("[BAR_CHART:") && line.endsWith("]")) {
      const content = line.slice(11, -1);
      const parts = content.split("|").map(p => p.trim());
      const title = parts[0];
      const items: { label: string; value: number }[] = [];
      
      for (let j = 1; j < parts.length; j++) {
        const itemStr = parts[j];
        const lastColonIdx = itemStr.lastIndexOf(":");
        if (lastColonIdx !== -1) {
          const label = itemStr.substring(0, lastColonIdx).trim();
          const val = parseFloat(itemStr.substring(lastColonIdx + 1).trim());
          if (!isNaN(val)) {
            items.push({ label, value: val });
          }
        }
      }

      if (items.length > 0) {
        const maxValue = Math.max(...items.map(item => item.value), 1);
        renderedElements.push(
          <div key={`chart-${keyIndex++}`} className="my-6 p-5 bg-white border border-ink-100 rounded-xl shadow-3xs">
            <h4 className="font-display text-sm font-bold text-ink-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-teal-brand rounded-xs block"></span>
              {title}
            </h4>
            <div className="space-y-3">
              {items.map((item, idx) => {
                const percentage = Math.min((item.value / maxValue) * 100, 100);
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-ink-600">{item.label}</span>
                      <span className="text-teal-brand font-bold">{item.value}</span>
                    </div>
                    <div className="w-full h-2.5 bg-ink-50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-teal-brand rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
      continue;
    }

    // Table Lines
    if (line.startsWith("|")) {
      inTable = true;
      tableLines.push(line);
    }
    // Headings
    else if (line.startsWith("###")) {
      renderedElements.push(
        <h3 key={keyIndex++} className="mt-6 mb-3 font-display text-lg font-bold text-ink leading-tight">
          {parseInlineMarkdown(line.substring(3).trim())}
        </h3>
      );
    } else if (line.startsWith("##")) {
      renderedElements.push(
        <h2 key={keyIndex++} className="mt-8 mb-4 font-display text-xl font-bold text-ink border-b border-ink-100 pb-1.5">
          {parseInlineMarkdown(line.substring(2).trim())}
        </h2>
      );
    } else if (line.startsWith("#")) {
      renderedElements.push(
        <h1 key={keyIndex++} className="mt-10 mb-4 font-display text-2xl font-bold text-ink">
          {parseInlineMarkdown(line.substring(1).trim())}
        </h1>
      );
    }
    // Lists
    else if (line.startsWith("-") || line.startsWith("*")) {
      inList = true;
      listItems.push(
        <li key={keyIndex++} className="text-sm text-ink-600">
          {parseInlineMarkdown(line.substring(1).trim())}
        </li>
      );
    }
    // Default Paragraphs
    else {
      renderedElements.push(
        <p key={keyIndex++} className="mb-4 text-sm leading-relaxed text-ink-600">
          {parseInlineMarkdown(line)}
        </p>
      );
    }
  }

  flushTable();
  flushList(); // ensure trailing elements are closed

  return (
    <div className={className}>
      {renderedElements}
    </div>
  );
}
