import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import { CopySectionLink } from "../ui/CopySectionLink";
import type { PolicyTableRow } from "../../types";

export function PolicyTable({ rows }: { rows: PolicyTableRow[] }) {
  return (
    <div id="policy-exceptions" className="space-y-3 font-sans scroll-mt-24">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink-500">
          Departmental Exceptions Ledger
        </span>
        <CopySectionLink sectionId="policy-exceptions" label="Copy Table Link" variant="badge" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Return Window</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Restocking Fee</TableHead>
            <TableHead className="w-10 text-right">Share</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, idx) => {
            const rowId = `row-${row.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
            return (
              <TableRow key={row.category} id={rowId} className="scroll-mt-24 group hover:bg-teal-light/5">
                <TableCell className="font-bold text-ink text-sm flex items-center gap-2">
                  <span>{row.category}</span>
                </TableCell>
                <TableCell className="font-mono text-xs text-teal-dark font-extrabold">{row.window}</TableCell>
                <TableCell className="text-xs text-ink-700">{row.condition}</TableCell>
                <TableCell className="text-xs font-semibold text-ink-900">{row.fee}</TableCell>
                <TableCell className="text-right">
                  <CopySectionLink sectionId={rowId} variant="icon" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

