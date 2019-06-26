import React, {Component} from 'react';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import axios from 'axios';
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
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
    
        let movieCards;
        let tableHeader;

        if (this.state.searchResults !== null) {
            movieCards = this.state.searchResults.map((movie,i) => {
                return [<MovieCard 
                            key={i}
                            image_url={movie.image_url}
                            title={movie.title}
                            overview={movie.overview}
                            release_date={movie.release_date}/>]
            });

            if (movieCards && movieCards.length > 0){
                tableHeader = (<thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Overview</th>
                        <th>Release Date</th>
                    </tr>
                </thead>);
            }
        } else if (this.state.searched) {
            movieCards = (<tr><td>No matched Results!</td></tr>);
        } else {
            movieCards = null;
        }

        return (
            <section>
                <SearchBar searchCallback={this.searchCallback}/>
                <table>
                        {tableHeader}
                    <tbody>
                        {movieCards}
                    </tbody>
                
                </table>

            </section>
        )
    }
};

export default Search;