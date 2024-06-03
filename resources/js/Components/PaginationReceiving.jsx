import { Link } from "@inertiajs/react";

export default function PaginationReceiving({ links }) {
    if (!links || links.length === 0) return null;

    return (
        <nav className="text-center mt-4">
            <ul className="inline-flex -space-x-px">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link
                            href={link.url || "#"}
                            className={` px-3 leading-tight ${
                                link.active
                                    ? "bg-gray-950 py-2 px-3 text-gray-800"
                                    : "inline-block py-2 px-3 rounded-lg text-gray-600 text-sm"
                            } ${!link.url ? "text-gray-500 cursoer-not-allowed": ""}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        ></Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
