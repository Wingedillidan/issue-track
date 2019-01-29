import * as React from 'react';

import SelectRepo from '../components/RepoSearch/SelectRepo';
import RepoCollection from '../components/RepoCollection';
import '../styles/pages/overview.scss';

export default class Overview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: []
        }

        this.removeRepo = this.removeRepo.bind(this);
        this.selectRepo = this.selectRepo.bind(this);
    }

    removeRepo(repo) {
        const {repos} = this.state;

        const i = repos.findIndex((r) => r.id === repo.id);

        if (i >= 0) {
            const updatedRepos = repos.slice();
            updatedRepos.splice(i, 1);

            this.setState({repos: updatedRepos});
        }
    }

    selectRepo(repo) {
        const {repos} = this.state;

        const i = repos.findIndex((r) => r.id === repo.id);

        if (i < 0) {
            repo.issues = [];
            const updatedRepos = [...repos.slice(), repo];

            this.setState({repos: updatedRepos});
        }
    }

    render() {
        const {repos} = this.state;
        return (
            <div className="container">
                <div className="left-pane">
                    <SelectRepo selectRepo={this.selectRepo} />
                </div>
                <div className="main-list">
                    <RepoCollection removeRepo={this.removeRepo} repos={repos} />
                </div>
            </div>
        )
    }
}
