import * as React from "react";
import { ArrowUpDown } from "lucide-react";
import { Link } from "../ui/Link";
import { Pagination } from "../ui/Pagination";
import { CountryFlag } from "../ui/CountryFlag";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import type { StoreFrontmatter } from "../../types";

type SortKey = "brand" | "returnWindow";

const STORES_PER_PAGE = 8;

export function ComparisonDataTable({ stores }: { stores: StoreFrontmatter[] }) {
  const [sortKey, setSortKey] = React.useState<SortKey>("brand");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = React.useState(1);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sorted = React.useMemo(() => {
    return [...stores].sort((a, b) => {
      let comparison = 0;
      if (sortKey === "brand") {
        comparison = a.brand.localeCompare(b.brand);
      } else {
        comparison = a.quickAnswer.returnWindow.localeCompare(b.quickAnswer.returnWindow);
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [stores, sortKey, sortDirection]);

  const totalPages = Math.ceil(sorted.length / STORES_PER_PAGE);
  const paginatedStores = sorted.slice((currentPage - 1) * STORES_PER_PAGE, currentPage * STORES_PER_PAGE);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <button
                onClick={() => toggleSort("brand")}
                className="hover:text-teal-brand flex items-center gap-1 cursor-pointer font-semibold uppercase text-xs"
              >
                Store
                <ArrowUpDown className="h-3 w-3" />
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => toggleSort("returnWindow")}
                className="hover:text-teal-brand flex items-center gap-1 cursor-pointer font-semibold uppercase text-xs"
              >
                Return Window
                <ArrowUpDown className="h-3 w-3" />
              </button>
            </TableHead>
            <TableHead>Receipt Required</TableHead>
            <TableHead>Restocking Fee</TableHead>
            <TableHead>Refund Method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedStores.map((store) => (
            <TableRow key={store.slug}>
              <TableCell>
                <Link href={`/stores/${store.slug}`} className="font-bold text-teal-brand hover:underline flex items-center gap-2">
                  <CountryFlag code={store.country || "US"} size="sm" />
                  <span>{store.brand}</span>
                </Link>
              </TableCell>
              <TableCell className="font-mono text-xs text-ink-900">{store.quickAnswer.returnWindow}</TableCell>
              <TableCell className="text-sm">
                {store.quickAnswer.receiptRequired ? "Yes" : "No - lookup available"}
              </TableCell>
              <TableCell className="text-sm">
                {store.quickAnswer.restockingFee ? "Some items" : "None"}
              </TableCell>
              <TableCell className="text-sm text-ink-600 font-medium">
                {store.quickAnswer.refundMethod}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(p) => setCurrentPage(p)}
        className="pt-2"
      />
    </div>
  );
}
