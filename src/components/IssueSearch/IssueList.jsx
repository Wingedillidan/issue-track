import * as React from 'react';

export default function IssueList ({issues, error, selectIssue}) {
    const select = (issue) => {
        return (e) => {
            e.preventDefault();

            if (selectIssue) {
                selectIssue(issue);
            }
        }
    }

    if (error) {
        return (
            <div className="issue-list">
                <p className="error">{error}</p>
            </div>
        )
    } else {
        return (
            <div className="issue-list">
                {issues.map((issue) => (
                    <span onClick={select(issue)}>
                        <span className="issue-number">{issue.number}</span> {issue.title}
                    </span>
                ))}
            </div>
        );
    }
}
