"use client";

import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

interface MenubarContextValue {
  active: string | null;
  setActive: (value: string | null) => void;
}

const MenubarContext = createContext<MenubarContextValue | undefined>(undefined);

const Menubar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => {
    const [active, setActive] = useState<string | null>(null);
    const localRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handlePointerDown = (event: PointerEvent) => {
        if (!localRef.current?.contains(event.target as Node)) {
          setActive(null);
        }
      };

      document.addEventListener("pointerdown", handlePointerDown);
      return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, []);

    return (
      <MenubarContext.Provider value={{ active, setActive }}>
        <div
          ref={(node) => {
            localRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          role="menubar"
          className={cn("inline-flex rounded-lg border-2 border-black bg-white shadow-[4px_4px_0_0_#000]", className)}
          {...props}
        />
      </MenubarContext.Provider>
    );
  }
);

Menubar.displayName = "Menubar";

export interface MenubarMenuProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

const MenubarMenu = forwardRef<HTMLDivElement, MenubarMenuProps>(
  ({ className = "", value, ...props }, ref) => (
    <div ref={ref} data-value={value} className={cn("relative", className)} {...props} />
  )
);

MenubarMenu.displayName = "MenubarMenu";

export interface MenubarTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const MenubarTrigger = forwardRef<HTMLButtonElement, MenubarTriggerProps>(
  ({ className = "", value, ...props }, ref) => {
    const context = useContext(MenubarContext);
    if (!context) throw new Error("MenubarTrigger must be used within Menubar");
    const open = context.active === value;

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        aria-expanded={open}
        onClick={() => context.setActive(open ? null : value)}
        className={cn(
          "border-r-2 border-black px-4 py-2 text-sm font-bold uppercase tracking-wide last:border-r-0 hover:bg-[#fff4ab]",
          open && "bg-[#ffde00]",
          className
        )}
        {...props}
      />
    );
  }
);

MenubarTrigger.displayName = "MenubarTrigger";

export interface MenubarContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
}

const MenubarContent = forwardRef<HTMLDivElement, MenubarContentProps>(
  ({ className = "", value, ...props }, ref) => {
    const context = useContext(MenubarContext);
    if (!context || context.active !== value) return null;

    return (
      <div
        ref={ref}
        role="menu"
        className={cn("absolute left-0 top-full z-50 mt-2 min-w-52 overflow-hidden rounded-lg border-2 border-black bg-white shadow-[6px_6px_0_0_#000] animate-brutal-slide-down", className)}
        {...props}
      />
    );
  }
);

MenubarContent.displayName = "MenubarContent";

const MenubarItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} role="menuitem" className={cn("cursor-pointer border-b-2 border-black px-4 py-3 text-sm font-bold uppercase tracking-wide last:border-b-0 hover:bg-[#ffde00]", className)} {...props} />
  )
);

MenubarItem.displayName = "MenubarItem";

export { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem };
