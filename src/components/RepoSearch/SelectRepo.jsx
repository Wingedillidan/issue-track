import * as React from 'react';

import RepoList from './RepoList';
import api from '../../api/github';

export default class SelectRepo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: [],
            error: '',
            loading: false
        };
    }

    searchRepos(term) {
        this.setState({loading: true, error: ''})
        api.searchRepositories(term)
            .then(response => {
                if (response.data.total_count === 0) {
                    this.setState({error: 'No repos were found.', loading: false});
                    return;
                }
                this.setState({repos: response.data.items, loading: false});
            });
    }

    render() {
        const {repos, error} = this.state;
        return (
            <form className="select-repo" onSubmit={e => {
                e.preventDefault();

                if (!e.target.term.value.trim()) {
                    this.setState({error: 'No search term entered.'})
                    return;
                }

                this.searchRepos(e.target.term.value);
            }}>
                <input name="term" placeholder="Search Github Repos" />
                <RepoList repos={repos} error={error} selectRepo={this.props.selectRepo} />
            </form>
        )
    }
}
