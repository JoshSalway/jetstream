import React, { useEffect, useRef, useState } from 'react';

export default function Dropdown({ children, align = 'right', width = '48', contentClasses = ['py-1', 'bg-white dark:bg-gray-700'] }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const closeOnEscape = (e) => {
            if (open && e.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener('keydown', closeOnEscape);

        return () => {
            document.removeEventListener('keydown', closeOnEscape);
        };
    }, [open]);

    const widthClass = {
        '48': 'w-48',
    }[width.toString()];

    let alignmentClasses;
    if (align === 'left') {
        alignmentClasses = 'origin-top-left left-0';
    } else if (align === 'right') {
        alignmentClasses = 'origin-top-right right-0';
    } else {
        alignmentClasses = 'origin-top';
    }

    return (
        <div className="relative">
            <div onClick={() => setOpen(!open)}>
                {children.trigger}
            </div>

            {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />}

            {open && (
                <div
                    ref={dropdownRef}
                    className={`absolute z-50 mt-2 rounded-md shadow-lg transform opacity-100 scale-100 ${widthClass} ${alignmentClasses}`}
                    onClick={() => setOpen(false)}
                >
                    <div className={`rounded-md ring-1 ring-black ring-opacity-5 ${contentClasses.join(' ')}`}>
                        {children.content}
                    </div>
                </div>
            )}
        </div>
    );
}
