import test from "../img/test.jpeg";
import React from 'react';
import '../css/front/style.css';
import '../css/404.css';

function E404()
{
	return (
	<>
		<main className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${test})` }}>
			<div className='FullOverlay'>
				<div className="E404Content">
					<h1 className="E404UpText"> page not found</h1>

					<div className="E404Gif">
						<div class="tenor-gif-embed" data-postid="2665852330586468567" data-share-method="host" data-aspect-ratio="1" data-width="100%">
							<a href="https://tenor.com/view/fox-spinning-low-poly-spin-blender-gif-2665852330586468567">
								Fox Spinning GIF
							</a>
							from
							<a href="https://tenor.com/search/fox-gifs">
								Fox GIFs
							</a>
						</div>
						<script type="text/javascript" async src="https://tenor.com/embed.js"/>
					</div>
					
					<h1 className="E404DownText"> but here is a spinning fox :) </h1>

				</div>
			</div>
		</main>
	</>
	)
}

export default E404;