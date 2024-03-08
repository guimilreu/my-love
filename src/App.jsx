// import React from 'react'
import './assets/index.css'

import data from './assets/data.js';
import { Button } from "@nextui-org/react";

function App() {

	return (
		<div className="w-screen h-screen fixed top-0 left-0 overflow-hidden bg-primary-50 flex justify-center items-center">
			<div className="w-full h-full max-w-4xl flex flex-col gap-4 justify-center items-center">

				<h1 className="text-4xl font-bold text-primary-500">
					Oi meu amor!
				</h1>
				<p className="max-w-2xl text-primary-400 text-lg text-center">
					Eu sei que isso aqui é super inesperado, porém eu só queria poder te demonstrar além de palavras o quanto <span className="font-bold">EU TE AMO</span>, e relembrar de todos os nossos momentos!
				</p>

				<div className="flex flex-col justify-center gap-2 w-full">
					<span className="mt-4 text-lg text-primary-500 font-bold">Momentos especiais</span>


					{data.map((collection, idx) => (
						<div key={idx} className="px-4 py-2 relative w-full max-w-[250px] h-80 bg-cover rounded-2xl shadow-xl overflow-hidden flex flex-col justify-end" style={{ backgroundImage: `url(${collection.images[0].url})` }}>
							<div className="h-full w-full absolute top-0 left-0 z-0 bg-primary-200 opacity-50"></div>
							<p className="justify-self-end text-xl z-10 text-white drop-shadow-md">{collection.label}</p>
							<Button color="primary" className="mt-1">
								Visualizar
							</Button>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default App
