import React, { useState, useEffect, useRef } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Select, SelectItem, Avatar, Slider, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { MoreHorizontal, Play, Pause, Music, Volume2, Clock } from 'react-feather'

import { songs } from '../assets/data'

const SongPlayer = ({ surprise }) => {
	const [state, setState] = useState({ album: undefined, songId: 0 });
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(0.25);

	const currentAlbum = songs[state.album];
	const currentSong = currentAlbum?.songs[state.songId];

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
		if (state.album === undefined || state.songId === undefined) return audioRef.current.pause();

		audioRef.current.src = currentSong.url;
		audioRef.current.volume = volume;
		togglePlay();

		const updateTime = () => {
			setCurrentTime(audioRef.current.currentTime);
			setDuration(audioRef.current.duration);
		};

		audioRef.current.addEventListener('timeupdate', updateTime);

		return () => {
			audioRef.current.removeEventListener('timeupdate', updateTime);
		};
	}, [state]);

	useEffect(() => {
		if (duration === undefined || currentTime === undefined) return;

		if (currentTime >= duration) {
			if (currentAlbum?.songs.length > state.songId + 1) {
				setSong(state.songId + 1);
			} else {
				setSong(0);
			}
		}
	}, [currentTime]);

	useEffect(() => {
		if (!surprise) return;

		let volume = 1.0;
		const interval = setInterval(() => {
			if (volume <= 0) {
				audioRef.current.pause();
				clearInterval(interval);
			}
			volume -= 0.1;
			audioRef.current.volume = volume;
		}, 100);

		return () => {
			clearInterval(interval);
		};
	}, [surprise]);

	useEffect(() => {
		if (volume < 0 || volume > 1) return;

		audioRef.current.volume = volume;
	}, [volume]);

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};

	const setAlbum = (id) => {
		setState((prev) => ({ ...prev, songId: 0, album: id }));
	};

	const setSong = (id) => {
		setState((prev) => ({ ...prev, songId: id }));
	};

	const handleAlbumSelecting = (value) => {
		const array = Array.from(new Set(value));
		if (array.length === 0) {
			setSong(undefined);
			return setAlbum(undefined);
		}

		const albumId = Number(array[0]);
		setAlbum(albumId);
	};

	function setTime(time) {
		audioRef.current.currentTime = time;
	}

	return (
		<div className="flex flex-col gap-4 fixed top-2 left-1/2 transform -translate-x-1/2 lg:translate-x-0 lg:top-10 lg:left-10">
			<audio ref={audioRef}></audio>
			{state.album !== undefined && (
				<div className="flex flex-col gap-2">
					<div className="min-w-[15rem] rounded-2xl flex gap-4 items-center justify-start">
						<div className="relative disc rounded-full w-20 min-w-[5rem] h-20 bg-cover bg-[#e0e0e0]" style={{ backgroundImage: `url(${currentSong?.coverURL})` }}>
							<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-4 h-4 rounded-full shadow-md"></div>
						</div>

						<div className="flex flex-col w-full">
							<p className="lg:text-lg text-sm font-bold text-primary-500 w-full lg:max-w-[250px]">{currentSong.name}</p>
							<span className="text-xs lg:text-sm text-primary-300 leading-3">{currentSong.artist}</span>
						</div>
						<div className="grid grid-cols-2 w-fit min-w-[5rem]">
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
							<Popover placement="bottom">
								<PopoverTrigger>
									<Button isIconOnly color="light">
										<Volume2 size={18} />
									</Button>
								</PopoverTrigger>
								<PopoverContent>
									<div className="min-w-[15rem] py-2 px-1">
										<Slider
											size="md"
											label="Volume"
											showTooltip={true}
											step={0.01}
											formatOptions={{ style: "percent" }}
											maxValue={1}
											minValue={0}
											value={volume}
											onChange={setVolume}
											className="max-w-md love slider"
										/>
									</div>
								</PopoverContent>
							</Popover>
							<Popover placement="bottom">
								<PopoverTrigger>
									<Button isIconOnly color="light">
										<Clock size={18} />
									</Button>
								</PopoverTrigger>
								<PopoverContent>
									<div className="min-w-[15rem] py-2 px-1">
										<Slider
											size="md"
											label={formatTime(currentTime)}
											step={1}
											maxValue={duration}
											minValue={1}
											value={currentTime}
											getValue={() => `${formatTime(duration)}`}
											onChange={setTime}
											className="max-w-md love slider"
										/>
									</div>
								</PopoverContent>
							</Popover>
						</div>
					</div>
				</div>
			)}

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