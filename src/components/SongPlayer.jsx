import React, { useState, useEffect, useRef } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Select, SelectItem, Avatar } from "@nextui-org/react";
import { MoreHorizontal, Play, Pause, Music } from 'react-feather'

import { songs } from '../assets/data'

const SongPlayer = ({ surprise }) => {
	const [state, setState] = useState({ album: undefined, songId: 0 })
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [timeString, setTimeString] = useState("");

	let currentAlbum = songs[state.album]
	let currentSong = currentAlbum?.songs[state.songId]

	const updateIsPlaying = () => {
		setIsPlaying(!audioRef.current.paused);
	};

	const togglePlay = () => {
		const audioElement = audioRef.current;
		if (audioElement.paused) {
			audioElement.play();
		} else {
			audioElement.pause();
		}
		updateIsPlaying();
	};

	useEffect(() => {
		if (state.album === undefined || state.songId === undefined) return;

		audioRef.current.src = currentSong.url
		togglePlay();

		const updateTime = () => {
			setTimeString(`${formatTime(audioRef.current.currentTime)}/${formatTime(audioRef.current.duration)}`)
		};

		audioRef.current.addEventListener('timeupdate', updateTime);
	}, [state])

	useEffect(() => {
		if (!surprise) return;

		let volume = 1.0;
		let interval = setInterval(() => {
			if (volume <= 0) {
				audioRef.current.pause();
				return clearInterval(interval)
			}
			volume -= 0.1;
			audioRef.current.volume = volume;
		}, 100)
	}, [surprise])

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};

	function setAlbum(id) {
		setState(prev => {
			return { ...prev, songId: 0, album: id }
		})
	}

	function setSong(id) {
		setState(prev => {
			return { ...prev, songId: id }
		})
	}

	function handleAlbumSelecting(value) {
		const array = Array.from(new Set(value))
		if (array.length === 0) return setAlbum(undefined);

		const albumId = Number(array[0])
		setAlbum(albumId)
	}

	return (
		<div className="flex flex-col gap-4 fixed top-2 left-1/2 transform -translate-x-1/2 lg:translate-x-0 lg:top-10 lg:left-10">
			<audio ref={audioRef}></audio>
			<div className="min-w-[15rem] rounded-2xl flex gap-4 items-center justify-start">
				{state.album !== undefined && (
					<>
						<div className="relative disc rounded-full w-20 min-w-[5rem] h-20 bg-cover bg-[#e0e0e0]" style={{ backgroundImage: `url(${currentSong?.coverURL})` }}>
							<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-4 h-4 rounded-full shadow-md"></div>
						</div>

						<div className="flex flex-col w-full">
							<p className="lg:text-lg text-sm font-bold text-primary-500 w-full lg:max-w-[250px]">{currentSong.name}</p>
							<span className="text-xs lg:text-sm text-primary-300 leading-3">{currentSong.artist}</span>
							<small className="text-[#000] opacity-30 text-xs mt-2">{timeString}</small>
						</div>
						<div className="flex gap-1">

							<Button isIconOnly onPress={togglePlay} color="light">
								{isPlaying ?
									<Pause size={18} />
									:
									<Play size={18} />
								}
							</Button>
							<Dropdown>
								<DropdownTrigger>
									<Button
										isIconOnly
										color="light"
									>
										<Music size={18} />
									</Button>
								</DropdownTrigger>
								<DropdownMenu variant="flat" aria-label="Dropdown menu with icons" className="love">
									{currentAlbum.songs.map((song, idx) => song.name !== currentSong.name && (
										<DropdownItem
											key="new"
											startContent={<Avatar src={song.coverURL} />}
											onPress={() => setSong(idx)}
										>
											<p className="text-sm font-bold text-primary-500">{song.name}</p>
											<span className="text-xs text-primary-300 leading-3">{song.artist}</span>
										</DropdownItem>
									))}
								</DropdownMenu>
							</Dropdown>
						</div>
					</>
				)}
			</div>
			<div className="flex flex-col w-full">
				{state.album === undefined && <p>Nenhum álbum selecionado.</p>}
				<Select
					label="Álbum"
					placeholder="Selecione um álbum!"
					className="w-full love"
					onSelectionChange={handleAlbumSelecting}

					renderValue={() => (
						<p>{state.album !== undefined && [currentAlbum.name]}</p>
					)}
				>
					{songs.map((album, idx) => (
						<SelectItem key={idx}>
							<div className="flex gap-2 items-center">
								<Avatar src={album.coverURL} />
								<p>{album.name}</p>
							</div>
						</SelectItem>
					))}
				</Select>
			</div>
		</div>
	)
}

export default SongPlayer