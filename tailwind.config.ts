import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				black: "#050505",
				white: "#fcfcfc",
				"cold-purple": {
					"50": "#fcfbfe",
					"100": "#f9f6fc",
					"200": "#efe9f9",
					"300": "#e5dcf5",
					"400": "#d2c1ed",
					"500": "#bea7e5",
					"600": "#ab96ce",
					"700": "#8f7dac",
					"800": "#726489",
					"900": "#564b67",
					"950": "#302a39",
				},
				silver: {
					"50": "#fbfbfb",
					"100": "#f8f8f8",
					"200": "#ededed",
					"300": "#e3e3e3",
					"400": "#cdcdcd",
					"500": "#b8b8b8",
					"600": "#a6a6a6",
					"700": "#8a8a8a",
					"800": "#6e6e6e",
					"900": "#535353",
					"950": "#2e2e2e",
				},
				chatelle: {
					"50": "#fbfbfc",
					"100": "#f8f7f9",
					"200": "#ecebf0",
					"300": "#e1dee7",
					"400": "#cbc6d4",
					"500": "#b4adc2",
					"600": "#a29caf",
					"700": "#878292",
					"800": "#6c6874",
					"900": "#514e57",
					"950": "#2d2b31",
				},
				"french-lilac": {
					"50": "#fdfcfe",
					"100": "#fcf9fd",
					"200": "#f7effa",
					"300": "#f2e5f6",
					"400": "#e8d2f0",
					"500": "#debee9",
					"600": "#c8abd2",
					"700": "#a78faf",
					"800": "#85728c",
					"900": "#645669",
					"950": "#38303a",
				},
				mandy: {
					"50": "#fdf6f7",
					"100": "#faedf0",
					"200": "#f3d3d9",
					"300": "#ecb8c2",
					"400": "#de8394",
					"500": "#d04e66",
					"600": "#bb465c",
					"700": "#9c3b4d",
					"800": "#7d2f3d",
					"900": "#5e232e",
					"950": "#34141a",
				},
				kournikova: {
					"50": "#fefdf8",
					"100": "#fefcf1",
					"200": "#fcf7db",
					"300": "#faf1c5",
					"400": "#f6e79a",
					"500": "#f2dd6e",
					"600": "#dac763",
					"700": "#b6a653",
					"800": "#918542",
					"900": "#6d6332",
					"950": "#3d371c",
				},
				"spring-rain": {
					"50": "#fafcfb",
					"100": "#f5f9f7",
					"200": "#e7f1ea",
					"300": "#d8e8dd",
					"400": "#bbd6c4",
					"500": "#9ec5ab",
					"600": "#8eb19a",
					"700": "#779480",
					"800": "#5f7667",
					"900": "#47594d",
					"950": "#28312b",
				},
			},
			screens: {
				wb: "963px",
			},

			keyframes: {
				wow: {
					from: {
						transform: "rotate(0deg)",
					},
					to: {
						transform: "rotate(360deg)",
					},
				},
				overlayShow: {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				contentShow: {
					from: {
						opacity: "0",
						transform: "translate(-50%, -48%) scale(0.96)",
					},
					to: {
						opacity: "1",
						transform: "translate(-50%, -50%) scale(1)",
					},
				},
				changeButtonStart: {
					from: {
						transform: "translateX(0)",
					},
					to: {
						transform: "translateX(2.25rem)",
					},
				},
				slideDownAndFade: {
					from: { opacity: "0", transform: "translateY(-2px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				slideLeftAndFade: {
					from: { opacity: "0", transform: "translateX(2px)" },
					to: { opacity: "1", transform: "translateX(0)" },
				},
				slideUpAndFade: {
					from: { opacity: "0", transform: "translateY(2px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				slideRightAndFade: {
					from: { opacity: "0", transform: "translateX(-2px)" },
					to: { opacity: "1", transform: "translateX(0)" },
				},
			},
			animation: {
				overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
				contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
				changeButtonStart:
					"changeButtonStart 500ms cubic-bezier(0.16, 1, 0.3, 1) 5s backwards",
				slideDownAndFade:
					"slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
				slideLeftAndFade:
					"slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
				slideUpAndFade:
					"slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
				slideRightAndFade:
					"slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
				wow: "wow 400ms cubic-bezier(0.72, 0.01, 0.22, 0.96)",
			},
			fontFamily: {
				sans: ["Poppins", "sans-serif"],
			},
		},
		fontSize: {
			xs: "0.5rem",
			sm: "0.75rem",
			base: "1rem",
			lg: "1.25rem",
			xl: "1.5625rem",
			"2xl": "2rem",
			"3xl": "2.5rem",
			"4xl": "3rem",
		},
	},
	plugins: [],
};
export default config;
