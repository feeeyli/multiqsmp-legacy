"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { ComponentProps, ReactNode } from "react";

const Root = (props: ComponentProps<typeof DialogPrimitive.Root>) => {
	return <DialogPrimitive.Root {...props} />;
};

const Portal = ({ children }: { children: ReactNode }) => (
	<DialogPrimitive.Portal>
		{/* <DialogPrimitive.Overlay className="bg-black fixed inset-0" /> */}
		{children}
	</DialogPrimitive.Portal>
);

type TriggerProps = ComponentProps<"button">;

const Trigger = ({ className, ...props }: TriggerProps) => (
	<DialogPrimitive.Trigger asChild>
		<button
			className={
				"bg-cold-purple-500 hover:bg-cold-purple-400 px-3 py-1.5 absolute mx-auto h-fit transition-colors " +
				className
			}
			{...props}
		/>
	</DialogPrimitive.Trigger>
);

type ContentProps = { children: ReactNode };

const Content = ({ children }: ContentProps) => (
	<DialogPrimitive.Content className="text-white w-[90%] sm:w-[65%] flex flex-col items-center px-8 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-silver-950 border-2 border-cold-purple-900 focus:outline-none">
		{children}
	</DialogPrimitive.Content>
);

const Header = ({ children }: { children: ReactNode }) => (
	<header className="pt-8 flex justify-between w-full">
		<DialogPrimitive.Title className="text-base">
			{children}
		</DialogPrimitive.Title>
		<DialogPrimitive.Close>
			<button className="p-2 rounded-md hover:bg-zinc-800 transition-colors">
				<Cross1Icon className="h-4 w-4" color="#fff" />
			</button>
		</DialogPrimitive.Close>
	</header>
);

const Main = ({ className, ...props }: ComponentProps<"main">) => (
	<main
		className={
			"max-h-96 p-[2px] overflow-y-auto w-full mt-4 flex justify-center flex-row flex-wrap grid-cols-[repeat(2,_minmax(0,_6rem))] sm:grid-cols-[repeat(3,_minmax(0,_8rem))] gap-4 scrollbar pr-3 " +
			className
		}
		{...props}
	/>
);

const Footer = ({ className, ...props }: ComponentProps<"footer">) => (
	<footer
		className={"flex items-center mt-4 pb-4 w-full " + className}
		{...props}
	/>
);

export const Dialog = { Root, Portal, Trigger, Content, Header, Main, Footer };
