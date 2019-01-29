import * as React from 'react';

export default function RepoList ({repos, error, selectRepo}) {
    const select = (repo) => {
        return (e) => {
            e.preventDefault();
            selectRepo(repo);
        }
    }

    if (error) {
        return (
            <div className="repo-list">
                <p className="error">{error}</p>
            </div>
        )
    } else {
        return (
            <div className="repo-list">
                {repos.map((repo) => (
                    <span onClick={select(repo)}>
                        <label>{`${repo.owner.login}/`}</label>
                        {repo.name}
                    </span>
                ))}
            </div>
        );
    }
}
