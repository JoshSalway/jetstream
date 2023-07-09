import { Link as RouterLink } from 'react-router-dom';

export default function DropdownLink({ href, as, children }) {
    const commonClasses = "block px-4 py-2 text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out";

    if (as === 'button') {
        return (
            <div>
                <button type="submit" className={commonClasses}>
                    {children}
                </button>
            </div>
        );
    }

    if (as === 'a') {
        return (
            <div>
                <a href={href} className={commonClasses}>
                    {children}
                </a>
            </div>
        );
    }

    return (
        <div>
            <RouterLink to={href} className={commonClasses}>
                {children}
            </RouterLink>
        </div>
    );
}