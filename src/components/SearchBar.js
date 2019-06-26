import React, {Component} from 'react';
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryString: ""
        };
    }

    queryChanged = (event) => {
        // event.preventDefault();
        const queryString = event.target.value;
        this.setState({
            queryString
        })

        this.props.searchCallback(event.target.value);
    }
    render() {
        return (
            <section>
                <label>
                    Search <input name="search"
                                type="text"
                                value={this.state.queryString}
                                onChange={this.queryChanged}/>

                </label>
            </section>
        )
    }
};

export default SearchBar;