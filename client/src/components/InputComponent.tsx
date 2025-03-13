import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";


export default function InputComponent({ children, className, placeholder, titulo = "", obrigatorio = false, icone, classNameTitle: classNameTitulo = "", classNameHolder = "", ...otherProps }: { titulo?: string, children?: string, obrigatorio?: boolean, icone?: ReactNode, classNameTitle?: string, classNameHolder?: string } & ComponentPropsWithoutRef<"input">) {
    return <>
        {titulo || obrigatorio ? <label htmlFor="input-foco" className={twMerge(`text-xl capitalize`, classNameTitulo)}>{titulo && titulo}{obrigatorio && <span className="text-red-600"> *</span>}</label> : <></>}


        <div className={twMerge(`input-holder relative flex items-center`, classNameHolder)} >
            <input
                name={titulo}
                className={twMerge(`py-2 px-4 ${icone ? " pr-8" : ""} border outline-none focus:outline focus:outline-neutral-400 rounded-md`, className)}
                placeholder={children ? children : placeholder}
                {...otherProps}
            >
            </input> <div className="absolute right-4">{icone && icone}</div>
        </div>
    </>
}