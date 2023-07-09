import Modal from './Modal.jsx';

export default function DialogModal({ children, show = false, maxWidth = '2xl', closeable = true, onClose = () => {} }) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    return (
        <Modal
            show={show}
            maxWidth={maxWidth}
            closeable={closeable}
            onClose={close}
        >
            <div className="px-6 py-4">
                <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {children.title}
                </div>

                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    {children.content}
                </div>
            </div>

            <div className="flex flex-row justify-end px-6 py-4 bg-gray-100 dark:bg-gray-800 text-right">
                {children.footer}
            </div>
        </Modal>
    );
}