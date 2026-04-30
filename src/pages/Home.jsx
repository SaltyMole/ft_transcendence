import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '../App.jsx'


createRoot(document.getElementById('root')).render(
<StrictMode>
  <App />
</StrictMode>,
)

function Home() {
  return (
    <>
    	<main>
			<div className= 'overlay'>
				<h1 id="homeText">Welcome to Transcendance</h1>
			</div>
      	</main>
    </>
  );
}

export default Home;