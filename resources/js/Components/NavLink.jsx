import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                ' items-center text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'text-blue-700 focus:border-white '
                    : 'border-transparent text-main stroke-white hover:text-gray-300 hover:border-gray-300 focus:text-header focus:border-gray-300 ') +
                className
            }
        >   <div className={'flex ' + 
            (active
                ? 'bg-gray-200 rounded-md p-1 '
                : ' ')
        }
        >
            {children}
            </div>
        </Link>
    );
}
