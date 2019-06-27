import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import Movies from './components/Movies';
import Customers from './components/Customers';

import VideoStore from './components/VideoStore';

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class App extends Component {
  render() {
    console.log("test")
    return (
    
      <VideoStore />
     
    )
  }
}
// function VideoStore() {
//   return <h2>Video Store</h2>;
// }

// function Search() {
//   return <h2>Search</h2>;
// }

// function Library() {
//   return <h2><VideoStore /></h2>;
// }

// function Customers() {
//   return <h2><Customers /></h2>
// }

// function AppRouter() {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Video Store</Link>
//             </li>
//             <li>
//               <Link to="/search/">Search</Link>
//             </li>
//             <li>
//               <Link to="/library/">Library</Link>
//             </li>
//             <li>
//               <Link to="/customers/">Customers</Link>
//             </li>
//           </ul>
//         </nav>

//         <Route path="/" exact component={VideoStore} />
//         <Route path="/search/" component={Search} />
//         <Route path="/library/" component={Library} />
//         <Route path="/customers/" component={Customers} />
//       </div>
//     </Router>
//   );
// }
export default App;
// export default AppRouter;
