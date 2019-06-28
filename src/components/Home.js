import React from 'react'
import './Home.css'

const Home = (props) => {
	return(
		<div className="h-section">
			<div id="cf">
  			<img class="bottom" src="https://cdn.pixabay.com/photo/2016/07/14/20/39/background-1517622_1280.jpg" />
  			<img class="top" src="https://cdn.pixabay.com/photo/2016/06/03/12/42/popcorn-1433327_1280.jpg" />
		</div>
			<div className='h-text top'>
				{props.welcomeMessage}
			</div>
		</div>
	)
}

export default Home;    