import * as React from 'react';

import SelectRepo from '../components/RepoSearch/SelectRepo';
import RepoDeck from '../components/RepoDeck';
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

    componentDidMount() {
        const load = window.localStorage.getItem('repos');

        if (load) {
            this.setState({repos: JSON.parse(load)})
        }

    }

    removeRepo(repo) {
        const {repos} = this.state;

        const i = repos.findIndex((r) => r.id === repo.id);

        if (i >= 0) {
            const updatedRepos = repos.slice();
            updatedRepos.splice(i, 1);

            this.setState({repos: updatedRepos}, () => this.save()());
        }
    }

    selectRepo(repo) {
        const {repos} = this.state;

        const i = repos.findIndex((r) => r.id === repo.id);

        if (i < 0) {
            repo.issues = [];
            const updatedRepos = [...repos.slice(), repo];

            this.setState({repos: updatedRepos}, () => this.save()());
        }
    }

    save() {
        return () => window.localStorage.setItem('repos', JSON.stringify(this.state.repos));
    }

    render() {
        const {repos} = this.state;
        return (
            <div className="container">
                <div className="left-pane">
                    <SelectRepo selectRepo={this.selectRepo} />
                </div>
                <div className="main-list">
                    <RepoDeck removeRepo={this.removeRepo} repos={repos} save={this.save()} />
                </div>
            </div>
        )
    }
}
