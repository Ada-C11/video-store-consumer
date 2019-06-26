import React, {Component} from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            queryString: "",
            searched: false,
            error: null
        };
    }

    componentDidMount(){
        axios.get('http://localhost:3001/movies?query=' + this.state.queryString)
        .then((response) => {
            this.setState({
                searchResults: response.data
            })
        })
        .catch((error) => {
            this.setState({
                error: error.message
            });
        });
    }

    searchCallback = (queryString) => {
        this.componentDidMount()
        this.setState({
          queryString,
          searched: true
        });
    };

    render() {
        let foundMovies;
        let tableHeader;
        tableHeader = null;
        // if (!this.state.searched) {
            if (this.state.searchResults !== null) {
            foundMovies = this.state.searchResults.map((movie, i)=> {
                return (<tr key={i}>
                            <td><img src={movie.image_url} alt={movie.title}/></td>
                            <td>{movie.title}</td>
                            <td>{movie.overview}</td>
                            <td>{movie.release_date}</td>
                            <td><button>Add to Library</button></td>
                        </tr>);
            });
            if (foundMovies && foundMovies.length > 0){
            tableHeader = (<thead>
                <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Overview</th>
                    <th>Release Date</th>
                </tr>
            </thead>);
            }
        }else if (this.state.searched) {
             foundMovies = (<tr><td>No matched Results!</td></tr>);
        }else {
            foundMovies = null
        }

        // console.log(this.state.searchResults);

        return (
            <section>
                <SearchBar searchCallback={this.searchCallback}/>
                <table>
                    {tableHeader}
                    <tbody>{foundMovies}</tbody>
                </table>
            </section>
        )
    }
};

export default Search;