import React, { useState, useEffect } from 'react'
import './assets/index.css'

import data from './assets/data.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Image, ScrollShadow, Link } from "@nextui-org/react";

import { ChevronLeft, ChevronRight, ChevronDown, Gift } from 'react-feather';

function App() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [currentImage, setCurrentImage] = useState(0);
	const [currentCollection, setCurrentCollection] = useState();
	const [see, setSee] = useState(false)
	const [viewAll, setViewAll] = useState(false)

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
		<div className="w-screen h-screen fixed top-0 left-0 overflow-hidden bg-primary-50 flex justify-center items-center">
			<AnimatePresence>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>

					<div className="w-full h-full max-w-4xl flex flex-col gap-4 justify-center items-center">
						<h1 className="text-4xl font-bold text-primary-500">
							Oi meu amor!
						</h1>
						<p className="max-w-2xl text-primary-400 text-lg text-center">
							Eu sei que isso aqui é super inesperado, porém eu só queria poder te demonstrar além de palavras o quanto <span className="font-bold">EU TE AMO</span>, e relembrar de todos os nossos momentos!
						</p>

						{see ? (
							<div className="relative">
								<div className="flex flex-col justify-center gap-2 w-full">
									<span className="mt-4 text-lg text-primary-500 font-bold">Nossos momentos especiais e INESQUECÍVEIS!</span>

									<ScrollShadow className=" h-[400px] relative grid grid-cols-4 gap-2 pr-2">
										{data.map((collection, idx) => (idx >= 4 && !viewAll) || (
											<AnimatePresence>
												<motion.div
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													exit={{ opacity: 0 }}
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
											</AnimatePresence>
										))}
										{viewAll && <div className="flex flex-col gap-4 bg-primary-300 rounded-2xl shadow-xl justify-center items-center text-center px-5 text-white">
											<p>Se você chegou aqui é porque está no fim! Espero que tenha gostado muito meu amor, mas esperai que tenho mais uma coisa...</p>
											<Link
												isExternal
												href="https://youtu.be/I29JUuotXG4?si=Hn65IRVH7otWsW0K&t=48"
												showAnchorIcon
												className="text-primary-500 bg-white rounded-xl px-3 py-2 text-xs"
											>
												Clique aqui
											</Link>
										</div>}
									</ScrollShadow>

								</div>
								{!viewAll && <Button color="primary" className="absolute left-1/2 bottom-0 transform -translate-x-1/2" onPress={() => setViewAll(true)}>
									Ver mais...
								</Button>}
							</div>
						) : (
							<AnimatePresence>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								>
									<Button color="primary" startContent={<Gift size={16} />} onPress={() => setSee(true)}>
										Acessar surpresa...
									</Button>
								</motion.div>
							</AnimatePresence>
						)}
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	)
}

export default App
