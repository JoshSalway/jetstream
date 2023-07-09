export default function FormSection({ submitted, children }) {
    const hasActions = !!children.actions;

    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <SectionTitle>
                <div slot="title">{children.title}</div>
                <div slot="description">{children.description}</div>
            </SectionTitle>

            <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={submitted}>
                    <div
                        className={`px-4 py-5 bg-white dark:bg-gray-800 sm:p-6 shadow ${hasActions ? 'sm:rounded-tl-md sm:rounded-tr-md' : 'sm:rounded-md'}`}
                    >
                        <div className="grid grid-cols-6 gap-6">
                            {children.form}
                        </div>
                    </div>

                    {hasActions &&
                        <div className="flex items-center justify-end px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md">
                            {children.actions}
                        </div>
                    }
                </form>
            </div>
        </div>
    );
}
