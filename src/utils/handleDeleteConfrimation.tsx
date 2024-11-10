import React from "react";
import toast from "react-hot-toast";
import { ConfirmationToast } from "@/components/common/ConfirmationToast/ConfirmationToast";

export const handleDeleteConfirmation = (id: string, removeContact: Function, history: any) => {
    toast(
        (t) => (
            <ConfirmationToast
                onDelete={() => {
                    removeContact(id);
                    sessionStorage.removeItem(`tempContact-${id}`);
                    history.push("/");
                    toast.dismiss(t.id);
                }}
                onCancel={() => toast.dismiss(t.id)}
            />
        ),
        { position: "top-center", duration: Infinity }
    );
};