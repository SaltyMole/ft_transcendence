import './Loading.css';
import loading_gif from '../img/loading.gif'

function Loading()
{
	return (
	<>
		<div className="Background">
			<img src={loading_gif} className="LoadingGif" />
		</div>
	</>
	)
}

export default Loading;