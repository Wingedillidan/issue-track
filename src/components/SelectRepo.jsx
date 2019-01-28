import * as React from 'react';

import api from '../api/github';

export default class SelectRepo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: [],
            error: ''
        };
    }

    searchRepos(term) {
        api.searchRepositories(term)
            .then(response => {
                console.log(response);
                if (response.data.total_count === 0) {
                    this.setState({error: 'Could not find any repos :('});
                    return;
                }
                this.setState({repos: response.data.items})
            });
    }

    selectRepo(repo) {
        const {selectRepo} = this.props;
        return (e) => {
            e.preventDefault();
            selectRepo(repo);
        }
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
                <div className="repo-list">
                    {error ?
                    <p className="error">{error}</p> :
                    repos.map((repo) => (
                        <span onClick={this.selectRepo(repo)}>
                            <label>{repo.owner.login}</label>
                            {repo.name}
                        </span>
                    ))}
                </div>
            </form>
        )
    }
}
