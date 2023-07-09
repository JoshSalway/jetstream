import React, { useState, useEffect, useRef } from 'react';
import DialogModal from './DialogModal';
import InputError from './InputError';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import TextInput from './TextInput';
import axios from 'axios';

export default function ConfirmsPassword({ title = "Confirm Password", content = "For your security, please confirm your password to continue.", button = "Confirm", children }) {
    const [confirmingPassword, setConfirmingPassword] = useState(false);
    const [form, setForm] = useState({
        password: '',
        error: '',
        processing: false,
    });

    const passwordInput = useRef(null);

    const startConfirmingPassword = () => {
        axios.get(route('password.confirmation')).then(response => {
            if (response.data.confirmed) {
                onConfirmed();
            } else {
                setConfirmingPassword(true);
                setTimeout(() => passwordInput.current.focus(), 250);
            }
        });
    };

    const confirmPassword = () => {
        setForm({ ...form, processing: true });

        axios.post(route('password.confirm'), {
            password: form.password,
        }).then(() => {
            setForm({ password: '', error: '', processing: false });
            closeModal();
            onConfirmed();

        }).catch(error => {
            setForm({ ...form, processing: false, error: error.response.data.errors.password[0] });
            passwordInput.current.focus();
        });
    };

    const closeModal = () => {
        setConfirmingPassword(false);
        setForm({ password: '', error: '', processing: false });
    };

    const onConfirmed = () => {
        console.log("Password confirmed");
        // Emit event or callback here
    };

    return (
        <span>
            <span onClick={startConfirmingPassword}>
                {children}
            </span>

            <DialogModal show={confirmingPassword} onClose={closeModal}>
                <h2>{title}</h2>
                <div>
                    {content}

                    <div className="mt-4">
                        <TextInput
                            ref={passwordInput}
                            value={form.password}
                            type="password"
                            className="mt-1 block w-3/4"
                            placeholder="Password"
                            autocomplete="current-password"
                            onKeyUp={(event) => { if(event.key === "Enter") confirmPassword() }}
                            onChange={(event) => setForm({ ...form, password: event.target.value })}
                        />

                        <InputError message={form.error} className="mt-2" />
                    </div>
                </div>

                <div>
                    <SecondaryButton onClick={closeModal}>
                        Cancel
                    </SecondaryButton>

                    <PrimaryButton
                        className={`ml-3 ${form.processing ? 'opacity-25' : ''}`}
                        disabled={form.processing}
                        onClick={confirmPassword}
                    >
                        {button}
                    </PrimaryButton>
                </div>
            </DialogModal>
        </span>
    );
}
