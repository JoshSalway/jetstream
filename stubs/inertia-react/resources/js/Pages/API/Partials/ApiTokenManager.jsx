import { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import ActionMessage from '@/Components/ActionMessage';
import ActionSection from '@/Components/ActionSection';
import Checkbox from '@/Components/Checkbox';
import ConfirmationModal from '@/Components/ConfirmationModal';
import DangerButton from '@/Components/DangerButton';
import DialogModal from '@/Components/DialogModal';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import SectionBorder from '@/Components/SectionBorder';
import TextInput from '@/Components/TextInput';

const ApiTokenManager = ({ tokens, availablePermissions, defaultPermissions }) => {
    const [createApiTokenForm, setCreateApiTokenForm] = useForm({
        name: '',
        permissions: defaultPermissions,
    });

    const [updateApiTokenForm, setUpdateApiTokenForm] = useForm({
        permissions: [],
    });

    const [deleteApiTokenForm, setDeleteApiTokenForm] = useForm({});

    const [displayingToken, setDisplayingToken] = useState(false);
    const [managingPermissionsFor, setManagingPermissionsFor] = useState(null);
    const [apiTokenBeingDeleted, setApiTokenBeingDeleted] = useState(null);

    const createApiToken = () => {
        setCreateApiTokenForm({
            preserveScroll: true,
            onSuccess: () => {
                setDisplayingToken(true);
                setCreateApiTokenForm({
                    name: '',
                    permissions: defaultPermissions,
                });
            },
        });
    };

    const manageApiTokenPermissions = (token) => {
        setUpdateApiTokenForm({
            permissions: token.abilities,
        });
        setManagingPermissionsFor(token);
    };

    const updateApiToken = () => {
        setUpdateApiTokenForm({
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setManagingPermissionsFor(null);
            },
        });
    };

    const confirmApiTokenDeletion = (token) => {
        setApiTokenBeingDeleted(token);
    };

    const deleteApiToken = () => {
        setDeleteApiTokenForm({
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setApiTokenBeingDeleted(null);
            },
        });
    };

    return (
        <div>
            {/* Generate API Token */}
            <FormSection submitted={createApiToken}>
                <h2>Create API Token</h2>
                <p>API tokens allow third-party services to authenticate with our application on your behalf.</p>

                {/* Token Name */}
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        value={createApiTokenForm.name}
                        onChange={(e) => setCreateApiTokenForm('name', e.target.value)}
                        type="text"
                        autoFocus
                    />
                    <InputError message={createApiTokenForm.errors.name} />
                </div>

                {/* Token Permissions */}
                {availablePermissions.length > 0 && (
                    <div>
                        <InputLabel htmlFor="permissions" value="Permissions" />
                        <div>
                            {availablePermissions.map((permission) => (
                                <label key={permission} className="flex items-center">
                                    <Checkbox
                                        checked={createApiTokenForm.permissions.includes(permission)}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            setCreateApiTokenForm((data) => ({
                                                ...data,
                                                permissions: checked
                                                    ? [...data.permissions, permission]
                                                    : data.permissions.filter((p) => p !== permission),
                                            }));
                                        }}
                                    />
                                    <span className="ml-2 text-sm text-gray-600">{permission}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                <ActionMessage on={createApiTokenForm.recentlySuccessful} className="mr-3">
                    Created.
                </ActionMessage>

                <PrimaryButton disabled={createApiTokenForm.processing}>Create</PrimaryButton>
            </FormSection>

            {tokens.length > 0 && (
                <>
                    <SectionBorder />

                    {/* Manage API Tokens */}
                    <div className="mt-10 sm:mt-0">
                        <ActionSection>
                            <h2>Manage API Tokens</h2>
                            <p>You may delete any of your existing tokens if they are no longer needed.</p>

                            {/* API Token List */}
                            <div>
                                {tokens.map((token) => (
                                    <div key={token.id} className="flex items-center justify-between">
                                        <div className="break-all">{token.name}</div>
                                        <div className="flex items-center ml-2">
                                            {token.last_used_ago && <div className="text-sm text-gray-400">Last used {token.last_used_ago}</div>}
                                            {availablePermissions.length > 0 && (
                                                <button
                                                    className="cursor-pointer ml-6 text-sm text-gray-400 underline"
                                                    onClick={() => manageApiTokenPermissions(token)}
                                                >
                                                    Permissions
                                                </button>
                                            )}
                                            <button className="cursor-pointer ml-6 text-sm text-red-500" onClick={() => confirmApiTokenDeletion(token)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ActionSection>
                    </div>
                </>
            )}

            {/* Token Value Modal */}
            <DialogModal show={displayingToken} onClose={() => setDisplayingToken(false)}>
                <h2>API Token</h2>
                <div>
                    Please copy your new API token. For your security, it won't be shown again.
                </div>
                {page.props.jetstream.flash.token && (
                    <div className="mt-4 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded font-mono text-sm text-gray-500 break-all">
                        {page.props.jetstream.flash.token}
                    </div>
                )}
                <SecondaryButton onClick={() => setDisplayingToken(false)}>Close</SecondaryButton>
            </DialogModal>

            {/* API Token Permissions Modal */}
            <DialogModal show={managingPermissionsFor !== null} onClose={() => setManagingPermissionsFor(null)}>
                <h2>API Token Permissions</h2>
                <div>
                    {availablePermissions.map((permission) => (
                        <label key={permission} className="flex items-center">
                            <Checkbox
                                checked={updateApiTokenForm.permissions.includes(permission)}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    setUpdateApiTokenForm((data) => ({
                                        ...data,
                                        permissions: checked
                                            ? [...data.permissions, permission]
                                            : data.permissions.filter((p) => p !== permission),
                                    }));
                                }}
                            />
                            <span className="ml-2 text-sm text-gray-600">{permission}</span>
                        </label>
                    ))}
                </div>
                <SecondaryButton onClick={() => setManagingPermissionsFor(null)}>Cancel</SecondaryButton>
                <PrimaryButton onClick={updateApiToken} disabled={updateApiTokenForm.processing}>
                    Save
                </PrimaryButton>
            </DialogModal>

            {/* Delete Token Confirmation Modal */}
            <ConfirmationModal show={apiTokenBeingDeleted !== null} onClose={() => setApiTokenBeingDeleted(null)}>
                <h2>Delete API Token</h2>
                <div>Are you sure you would like to delete this API token?</div>
                <SecondaryButton onClick={() => setApiTokenBeingDeleted(null)}>Cancel</SecondaryButton>
                <DangerButton onClick={deleteApiToken} disabled={deleteApiTokenForm.processing}>
                    Delete
                </DangerButton>
            </ConfirmationModal>
        </div>
    );
};

export default ApiTokenManager;
