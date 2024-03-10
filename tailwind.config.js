/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");


export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		colors: {
			'white': '#ffffff',

			// ...
		},
		extend: {},
	},
	darkMode: "class",
	plugins: [
		nextui({
			themes: {
				light: {
					colors: {
						background: "#ffe0e6",
						foreground: "#ff99ad",
						primary: {
							50: '#fff5f7',
							100: '#ffe0e6',
							200: '#ffccd6',
							300: '#ffb8c6',
							400: '#ffa3b5',
							500: '#ff99ad',
							600: '#cc7a8a',
							700: '#995c68',
							800: '#663d45',
							900: '#331f23',
							950: '#190f11',
							DEFAULT: "#ff99ad",
							foreground: "#fff",
						},
						focus: "#fff",
					},
				},

				"love": {
					colors: {
						background: "#ffe0e6",
						foreground: "#ff99ad",
						primary: {
							50: '#fff5f7',
							100: '#ffe0e6',
							200: '#ffccd6',
							300: '#ffb8c6',
							400: '#ffa3b5',
							500: '#ff99ad',
							600: '#cc7a8a',
							700: '#995c68',
							800: '#663d45',
							900: '#331f23',
							950: '#190f11',
							DEFAULT: "#ff99ad",
							foreground: "#fff",
						},
						focus: "#fff",
					},
				},
			}
		})
	]
}