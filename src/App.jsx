import React, { useState, useEffect } from 'react'
import './assets/index.css'

import { data } from './assets/data.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Image, ScrollShadow, Link } from "@nextui-org/react";

import { ChevronLeft, ChevronRight, ChevronDown, Gift } from 'react-feather';

import SongPlayer from './components/SongPlayer.jsx';
import Surprise from './components/Surprise.jsx';

function App() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [currentImage, setCurrentImage] = useState(0);
	const [currentCollection, setCurrentCollection] = useState();
	const [see, setSee] = useState(false)
	const [viewAll, setViewAll] = useState(false)
	const [surprise, setSurprise] = useState(false)

	function nextImage() {
		if (currentCollection === undefined) return;

		setCurrentImage(prev => {
			if (prev + 1 === currentCollection.images.length) return 0;

			return prev + 1;
		})
	}

	function prevImage() {
		if (currentCollection === undefined) return;

		setCurrentImage(prev => {
			if (prev === 0) return currentCollection.images.length - 1;

			return prev - 1;
		})
	}

	function openCollection(collection) {
		setCurrentCollection(prev => {
			onOpenChange(true)

			return collection
		})
	}

	function onCloseHandler() {
		setCurrentCollection(prev => {
			setCurrentImage(0)
			onOpenChange(false)
			return undefined
		})
	}

	return (
		<div className="w-screen h-screen fixed top-0 left-0 px-8 lg:px-0 overflow-hidden bg-primary-50 flex justify-center items-center">
			<AnimatePresence>
				<motion.div
					initial={{ scale: 0.8, opacity: 0.1, translateY: -50 }}
					animate={{ scale: 1, opacity: 1, translateY: 0 }}
				// exit={{ opacity: 0, scale: 0.5 }}
				>

					<div className="w-full h-full max-w-4xl flex flex-col gap-4 justify-center items-center">
						{!see ? (
							<>
								<h1 className="text-4xl font-bold text-primary-500">
									Oi meu amor!
								</h1>
								<p className="max-w-2xl text-primary-400 text-lg text-center">
									Hoje não é nenhuma data "especial" (entre aspas porque todos os dias contigo são especiais), porém eu só quero poder te demonstrar além de palavras o quanto eu realmente <span className="font-bold">TE AMO</span>, e nos relembrar de todos os nossos momentos INESQUECÍVEIS!
								</p>
							</>
						) : <h1 className="text-4xl font-bold text-primary-500">
							EU TE AMO!
						</h1>}

						{see ? (
							<div className="relative">
								<SongPlayer surprise={surprise} />
								<div className="flex flex-col justify-center gap-2 w-full">
									<span className="mt-4 text-lg text-primary-500 font-bold">Nossos momentos especiais e INESQUECÍVEIS!</span>

									<ScrollShadow className="h-[400px] lg:h-[600px] relative grid grid-cols-2 lg:grid-cols-4 gap-2 pr-2">
										{data.map((collection, idx) => (idx >= 8 && !viewAll) || (
											<motion.div
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: idx * 0.05 }}
												exit={{ opacity: 0 }}
												whileInView="visible"
												viewport={{ once: true }}
												className="h-fit"
											>
												<div key={idx} className="px-4 py-2 relative w-full max-w-[250px] h-80 bg-cover rounded-2xl shadow-xl overflow-hidden flex flex-col justify-end" style={{ backgroundImage: `url(${collection.images[0].url})` }}>
													<div className="h-full w-full absolute top-0 left-0 z-0 bg-primary-700 opacity-20"></div>
													<p className="justify-self-end text-xl z-10 text-white drop-shadow-xl">{collection.label}</p>
													<Button color="primary" className="mt-1" onPress={() => openCollection(collection)}>
														Visualizar
													</Button>

													<Modal isOpen={isOpen} onOpenChange={onCloseHandler} className="love bg-transparent shadow-none" backdrop="blur">
														<ModalContent>
															{(onClose) => (
																<div className="flex flex-col gap-8">
																	<div className="flex gap-8 items-center">
																		<Button isIconOnly onPress={prevImage}>
																			<ChevronLeft size={16} />
																		</Button>

																		<div className="flex flex-col gap-2 justify-center items-center text-white/30">
																			<Image
																				width={700}
																				src={currentCollection.images[currentImage].url}
																			/>
																			<p>{currentImage + 1}/{currentCollection.images.length}</p>
																		</div>

																		<Button isIconOnly onPress={nextImage}>
																			<ChevronRight size={16} />
																		</Button>
																	</div>
																	<p className="text-white w-full text-center text-xl">
																		{currentCollection.images[currentImage].description}
																	</p>
																</div>
															)}
														</ModalContent>
													</Modal>
												</div>
											</motion.div>
										))}
										{viewAll && <div className="flex flex-col gap-4 bg-primary-300 rounded-2xl shadow-xl justify-center items-center text-center px-5 text-white">
											<p>Se você chegou aqui é porque está no fim! Espero que tenha gostado muito meu amor, mas perai... acho que tenho mais uma coisinha.</p>
											<Button color="primary" variant="shadow" onPress={() => setSurprise(true)}>
												...
											</Button>
										</div>}
										{!viewAll && <Button color="primary" className="absolute left-1/2 -bottom-24 transform -translate-x-1/2" onPress={() => setViewAll(true)}>
											Ver mais...
										</Button>}
									</ScrollShadow>

								</div>
							</div>
						) : (
							<Button color="primary" startContent={<Gift size={16} />} onPress={() => setSee(true)}>
								Acessar surpresa...
							</Button>
						)}
					</div>
				</motion.div>
				{surprise && <Surprise />}
			</AnimatePresence>
		</div>
	)
}

export default App
