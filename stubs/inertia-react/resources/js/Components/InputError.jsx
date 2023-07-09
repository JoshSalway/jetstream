export default function InputError({ message }) {
    return (
        <div style={{ display: message ? 'block' : 'none' }}>
            <p className="text-sm text-red-600 dark:text-red-400">
                {message}
            </p>
        </div>
    );
}
