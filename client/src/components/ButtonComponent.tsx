import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type BotaoParams = { children?: ReactNode, icone?: ReactNode } & React.ComponentPropsWithoutRef<"button">

export default function ButtonComponent({ children, icone: icon, className, ...otherProps }: BotaoParams) {
    return <button type="button" className={twMerge(`py-2 px-4 border border-neutral-600 bg-neutral-900 hover:bg-neutral-700 flex rounded-md duration-75 items-center justify-center gap-1 h-fit`, className)} {...otherProps}>
        {icon && icon} {children}
    </button>
}