import React from 'react';
import { Link } from '@inertiajs/react';

const PaginationEdit = ({ links }) => {
    return (
        <div className="pagination" dangerouslySetInnerHTML={{ __html: links }} />
    );
};

export default PaginationEdit;