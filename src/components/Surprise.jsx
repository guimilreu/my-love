import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { data } from '../assets/data.js';
import { Image } from "@nextui-org/react";

const frases = [
	"Minha vida é muito mais feliz ao seu lado",
	"Eu sou sempre muito grato a Deus por ter colocado você em minha vida",
	"Eu quero passar minha vida toda contigo",
	"Quero construir uma vida linda com você",
	"Você é minha felicidade",
	"Você é meu porto seguro",
]

const Surprise = () => {
	useEffect(() => {
		let audio = new Audio();
		audio.src = "https://cdn.discordapp.com/attachments/1026244827802779689/1216018489957945485/epitafio.mp3?ex=65fedc78&is=65ec6778&hm=86c6104672f62784e4a7cb5c279d0e05051e0708ed6c0f4264ee9558e9aec2e4&"
		audio.play();
	}, [])

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 2 }}
			>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 5, delay: 44.5 }}
				>
					<h1 className="fixed top-1/2 left-1/2 text-center transform -translate-x-1/2 -translate-y-1/2 text-[5rem] lg:text-[13rem] w-full font-black text-white z-[999]">EU TE AMO!</h1>
				</motion.div>
				<div className="z-[100] fixed top-0 left-0 w-screen h-screen bg-primary flex flex-col justify-center items-center gap-8 lg:gap-20">
					{frases.map((frase, idx) => (
						<motion.div
							initial={{ opacity: 1, }}
							animate={{ opacity: 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 5, delay: 40 }}
						>
							<motion.div
								initial={{ opacity: 0, }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.75, delay: (idx + 1.5) * 5 }}
							>
								<h1 className="text-lg text-center lg:text-3xl font-bold text-white z-[999]">{frase}</h1>
							</motion.div>
						</motion.div>
					))}


					<motion.div
						initial={{ opacity: 0.1, }}
						animate={{ opacity: 0.4 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 10, delay: 40 }}
						className="z-[-1]"
					>
						<div className="absolute top-0 left-0 grid grid-cols-12 text-white w-full h-full">
							{data.map(collection => {
								return collection.images.map(image => (
									<div className="w-full h-[8rem] bg-cover" style={{ backgroundImage: `url(${image.url})` }}></div>
								))
							})}
						</div>
					</motion.div>
				</div>

			</motion.div>
		</AnimatePresence >
	)
}

export default Surprise