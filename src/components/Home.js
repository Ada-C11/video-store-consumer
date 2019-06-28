import React from 'react'
import './Home.css'

const Home = (props) => {
	return(
		<div className="h-section">
			<div id="cf">
  			<img  src="https://www.blazingcariboustudios.com/wp-content/uploads/2018/01/Arrival_Review_Header.jpg" alt="arrival movie"/>
  			<img className="top" src="https://drraa3ej68s2c.cloudfront.net/wp-content/uploads/2016/01/07150125/3086769cfa36c94d625e958981bfc6901c2d116dbd80fb864e067e333ba56542-770x443.jpg" alt="ex-machina movie" />
		</div>
			<div className='h-text top'>
				{props.welcomeMessage}
			</div>
		</div>
	)
}

export default Home;    