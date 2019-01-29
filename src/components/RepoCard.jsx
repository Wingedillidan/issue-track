import * as React from 'react';
import IssueList from './IssueSearch/IssueList';
import api from '../api/github';

export default class RepoCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addMode: false,
            issues: [],
            allIssues: [],
            error: ''
        }

        this.toggleAdd = this.toggleAdd.bind(this);
        this.addIssue = this.addIssue.bind(this);
    }

    addIssue(issue) {
        const {allIssues, issues} = this.state;

        const i = allIssues.findIndex(o => o.id === issue.id);

        if (i >= 0) {
            const updatedAllIssues = allIssues.slice();
            const updatedIssues = issues.slice();
            updatedAllIssues.splice(i, 1);

            const i = updatedIssues.findIndex(o => o.id === issue.id);

            if (i < 0) {
                updatedIssues.push(issue);
            }

            this.setState({allIssues: updatedAllIssues, issues: updatedIssues});
        }
    }

    fetchIssues() {
        const {repo} = this.props;

        this.setState({allIssues: []}, () => {
            api.getIssues(repo.full_name).then((response) => {
                this.setState({allIssues: response.data});
            })
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
        const {addMode, allIssues, issues} = this.state;
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
                        <IssueList issues={allIssues} selectIssue={this.addIssue} />
                    </div>
                ) : (
                    <div>
                        <span className="add-issue" onClick={() => this.toggleAdd(true)}>Add Issue</span>
                        <IssueList issues={issues} />
                    </div>
                )}
            </div>
        );
    }
}
