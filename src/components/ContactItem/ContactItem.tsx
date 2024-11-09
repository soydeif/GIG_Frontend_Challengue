import React from "react";
import { useHistory } from "react-router-dom";
import { ContactItemProps } from "@/types/contacts";
import { Button } from "@/components/common/Button";
import { Icons } from "@/assets/icons/Icons";
import styles from "@components/ContactItem/ContactItem.module.css";

export const ContactItem = ({ contact }: ContactItemProps) => {
    const history = useHistory();

    const handleEdit = () => {
        if (contact?.id) {
            history.push(`/edit/${contact?.id}`);
        } else {
            console.warn("ID is not defined");
        }
    };

    return (

        <div className={styles?.contactItem}>
            <div className={styles?.contactInfo}>
                <span className={styles?.contactField}>{contact?.firstName}</span>
                <span className={styles?.contactField}>{contact?.lastName}</span>
                <span className={styles?.contactField}>{contact?.email}</span>
                <span className={styles?.contactField}>{contact?.country}</span>
            </div>
            <Button onClick={handleEdit} className={styles?.btnEdit}>
                <Icons type="edit" />
            </Button>
        </div>

    );
};
