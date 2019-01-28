import * as React from 'react';

import SelectRepo from '../components/SelectRepo';
import '../styles/pages/overview.scss';

export default class Overview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: []
        }
    }

    selectRepo(repo) {
        const {repos} = this.state;

        const i = repos.findIndex((r) => r.id === repo.id);

        if (i < 0) {
            repos.push(repo);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="left-pane">
                    <SelectRepo selectRepo={this.selectRepo} />
                </div>
                <div className="main-list">

                </div>
            </div>
        )
    }
}
