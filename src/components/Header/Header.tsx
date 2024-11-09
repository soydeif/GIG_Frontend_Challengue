import React from "react";
import { IconGIG } from "@/assets/icons/IconGIG"
import styles from "@components/Header/Header.module.css"

export const Header = () => {
    return (
        <div className={styles.header}>
            <IconGIG />
            <h1 className={styles.title}>FRONTEND CHALLENGUE</h1>
        </div>
    )
}

