import Link from "next/link";

type BreadcrumbsProps = {
  currentPage: string;
};

export default function Breadcrumbs({ currentPage }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-[#12233f]/55">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="transition hover:text-[#9a7428]">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-[#12233f]/75">
          {currentPage}
        </li>
      </ol>
    </nav>
  );
}
