import React from 'react';
import './QueryManagement.css';

const QueryManagement = ({ queries, closePopup }) => {
    return (
        <div>
            <h2>Query Responses</h2>
            {queries.map((query) => (
                <div key={query.id} className="query">
                    <p><strong>User:</strong> {query.user}</p>
                    <p><strong>Query:</strong> {query.query}</p>
                    <textarea placeholder="Type your response here..."></textarea>
                    <button>Send Response</button>
                </div>
            ))}
        </div>
    );
};

export default QueryManagement;
