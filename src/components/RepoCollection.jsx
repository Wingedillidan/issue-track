import * as React from 'react';

import RepoCard from './RepoCard';

export default function RepoCollection({repos, removeRepo}) {
    return (
        <div className="repo-collection">
            {repos.map((repo) => <RepoCard repo={repo} removeRepo={removeRepo} key={repo.full_name} />)}
            {/* To fix flexbox alignment shenanigans */}
            <div className="repo-card-empty" />
            <div className="repo-card-empty" />
            <div className="repo-card-empty" />
            <div className="repo-card-empty" />
            <div className="repo-card-empty" />
            <div className="repo-card-empty" />
        </div>
    )
}
