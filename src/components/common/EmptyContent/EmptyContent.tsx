import { IconEmptyContent } from '@/assets/icons/IconEmptyContent';
import styles from "@components/common/EmptyContent/EmptyContent.module.css"
import React from 'react';

interface EmptyContentProps {
    message?: string;
}

const EmptyContent: React.FC<EmptyContentProps> = ({ message }) => {
    return (
        <div className={styles.container}>
            <IconEmptyContent />
            <p>{message || 'No content available. Try to add some'}</p>
        </div>
    );
};

export default EmptyContent;
