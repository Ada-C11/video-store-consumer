import React, {component} from 'react'
import './Home.css'

const Home = (props) => {

	return(
		<div className='home-text'>
			{props.welcomeMessage}
		</div>
	)
    
}

export default Home;    