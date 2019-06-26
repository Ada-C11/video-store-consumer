import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import './SearchBar.css';


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryString: ""
        };
    }

    queryChanged = (event) => {
        const queryString = event.target.value;
        this.setState({
            queryString
        })

        this.props.searchCallback(event.target.value);
    }
    render() {
        return (
            <div className="search_bar">
                <Form>
                    <FormControl type="text" placeholder="Search"
                        name="search"
                        type="text"
                        value={this.state.queryString}
                        onChange={this.queryChanged} />
                </Form>
            </div>
        )
    }
};

export default SearchBar;