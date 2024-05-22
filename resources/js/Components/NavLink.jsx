import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                ' items-center border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-white text-white focus:border-white '
                    : 'border-transparent text-main stroke-white hover:text-gray-300 hover:border-gray-300 focus:text-header focus:border-gray-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
