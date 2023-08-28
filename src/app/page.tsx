// const LangSelector = ({ onClick }: { onClick: () => void, flag }) => {
//   return (
//     <a>

import Image from "next/image";
import Link from "next/link";

//     </a>
//   )
// }

export default function Home() {
	return (
		<div className="min-h-screen bg-cold-purple-950 text-white flex flex-col items-center pt-24">
			<header>
				<h1 className="text-3xl font-bold">MultiQSMP</h1>
				<div className="grid grid-cols-2 justify-items-center gap-4 gap-y-1">
					<h2 className="text-cold-purple-200">Bem-vindo</h2>
					<h2 className="text-cold-purple-200">Bienvenido</h2>
					<h2 className="text-cold-purple-200">Welcome</h2>
					<h2 className="text-cold-purple-200">Bienvenu</h2>
				</div>
			</header>
			<main className="mt-8">
				<div className="grid grid-cols-2 gap-8 gap-y-4">
					<Link href="/pt" className="text-center">
						<Image
							src="/br.svg"
							alt="Bandeira do Brasil"
							width={96}
							height={72}
							className="aspect-[4/3] w-32"
						/>
						<span className="mt-2 block">Português</span>
					</Link>
					<Link href="/es" className="text-center">
						<div className="relative">
							<Image
								src="/mx.svg"
								alt="Bandeira do Mexico"
								width={96}
								height={72}
								className="aspect-[4/3] w-32 clip diag-bottom"
							/>
							<Image
								src="/es.svg"
								alt="Bandeira da Espanha"
								width={96}
								height={72}
								className="aspect-[4/3] w-32 diag-top absolute inset-0"
							/>
						</div>
						<span className="mt-2 block">Español</span>
					</Link>
					<Link href="/en" className="text-center">
						<Image
							src="/us.svg"
							alt="Bandeira dos Estados Unidos"
							width={96}
							height={72}
							className="aspect-[4/3] w-32"
						/>
						<span className="mt-2 block">English</span>
					</Link>
					<Link href="/fr" className="text-center">
						<Image
							src="/fr.svg"
							alt="Bandeira da França"
							width={96}
							height={72}
							className="aspect-[4/3] w-32"
						/>
						<span className="mt-2 block">Français</span>
					</Link>
				</div>
			</main>
		</div>
	);
}
