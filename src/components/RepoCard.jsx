import * as React from 'react';
import IssueList from './IssueSearch/IssueList';
import api from '../api/github';

export default class RepoCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addMode: false,
            allIssues: [],
            selectError: '',
            listError: ''
        }

        this.toggleAdd = this.toggleAdd.bind(this);
        this.addIssue = this.addIssue.bind(this);
        this.removeIssue = this.removeIssue.bind(this);
    }

    addIssue(issue) {
        const {allIssues} = this.state;
        const {repo, save} = this.props;

        const i = allIssues.findIndex(o => o.id === issue.id);

        if (i >= 0) {
            const updatedAllIssues = allIssues.slice();
            const updatedIssues = repo.issues.slice();
            updatedAllIssues.splice(i, 1);

            const j = updatedIssues.findIndex(o => o.id === issue.id);

            if (j < 0) {
                updatedIssues.push(issue);
                repo.issues = updatedIssues;
            }

            this.setState({allIssues: updatedAllIssues}, () => save());
        }
    }

    removeIssue(issue) {
        const {repo, save} = this.props;

        const updatedIssues = repo.issues.slice();

        const i = updatedIssues.findIndex(o => o.id === issue.id);

        if (i >= 0) {
            updatedIssues.splice(i, 1);
            repo.issues = updatedIssues;

            // Bit of a hack I know :(
            this.forceUpdate(() => save());
        }
    }

    fetchIssues() {
        const {repo} = this.props;

        this.setState({selectError: 'Loading...'})

        this.setState({allIssues: []}, () => {
            api.getIssues(repo.full_name)
                .then((response) => {
                    if (!response.data.length) {
                        this.setState({selectError: 'No issues exist on this repo.'})
                    } else {
                        this.setState({allIssues: response.data, selectError: ''});
                    }
                })
                .catch(() => {
                    this.setState({selectError: 'There was a problem loading issues.'})
                });
        });
    }

    toggleAdd(mode) {
        if (mode) {
            this.fetchIssues();
        }
        this.setState({addMode: mode});
    }

    render() {
        const {repo, removeRepo} = this.props;
        const {addMode, allIssues, selectError, listError} = this.state;
        return (
            <div className="repo-card">
                <span className="close" onClick={() => removeRepo(repo)}>X</span>
                <div className="repo-title">
                    <p className="repo-owner">{repo.owner.login}</p>
                    <h1 className="repo-name">{repo.name}</h1>
                </div>
                {addMode ? (
                    <div>
                        <span className="stop-adding" onClick={() => this.toggleAdd(false)}>Stop Adding</span>
                        <IssueList issues={allIssues} selectIssue={this.addIssue} error={selectError} />
                    </div>
                ) : (
                    <div>
                        <IssueList issues={repo.issues} selectIssue={this.removeIssue} error={listError} />
                        <span className="add-issue" onClick={() => this.toggleAdd(true)} />
                    </div>
                )}
            </div>
        );
    }
}
