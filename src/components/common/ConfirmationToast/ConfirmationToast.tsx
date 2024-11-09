import React from "react";
import styles from "@components/common/ConfirmationToast/ConfirmationToast.module.css"

export const ConfirmationToast = ({ onDelete, onCancel }: { onDelete: () => void; onCancel: () => void; }) => (
    <div className={styles.wrapToastt}>
        <p>Are you sure you want to delete this contact?</p>
        <div className={styles.alertContain}>
            <button className={styles.btnDelete} onClick={onDelete}>
                Delete
            </button>
            <button onClick={onCancel} className={styles.btnCancel}>
                Cancel
            </button>
        </div>
    </div>
);