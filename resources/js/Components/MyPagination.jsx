import { Link } from "@inertiajs/react";

export default function MyPagination({ links }) {
    return (
        <nav className="text-center mt-4 ">
            {links.map(link => (
                <Link
                preserveScroll
                href={link.url || ""}
                key={link.label} 
                className={"inline-block py-2 px-3 rounded-lg text-gray-600 text-sm " + (link.active ? "bg-gray-950 " :" " ) + (link.url ? "text-gray-500 cursoer-not-allowed" : " hover:bg-gray-950")}
                 dangerouslySetInnerHTML={{__html: link.label}}>
                    
                </Link>
            ))}
        </nav>
    );
}