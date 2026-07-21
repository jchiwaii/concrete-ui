import { AnchorHTMLAttributes, HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const NavigationMenu = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ className = "", ...props }, ref) => (
    <nav ref={ref} className={cn("flex flex-wrap items-center gap-2", className)} {...props} />
  )
);

NavigationMenu.displayName = "NavigationMenu";

const NavigationMenuList = forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(
  ({ className = "", ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-wrap items-center gap-2", className)} {...props} />
  )
);

NavigationMenuList.displayName = "NavigationMenuList";

const NavigationMenuItem = forwardRef<HTMLLIElement, HTMLAttributes<HTMLLIElement>>(
  ({ className = "", ...props }, ref) => <li ref={ref} className={className} {...props} />
);

NavigationMenuItem.displayName = "NavigationMenuItem";

export interface NavigationMenuLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

const NavigationMenuLink = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  ({ className = "", active = false, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "inline-flex rounded-[var(--ui-radius-sm)] border-2 border-transparent px-4 py-2 text-sm font-semibold transition-all duration-100 hover:border-black hover:bg-[var(--ui-surface)] hover:shadow-[var(--ui-shadow)]",
        active && "border-black bg-[var(--ui-accent)] shadow-[var(--ui-shadow)]",
        className
      )}
      {...props}
    />
  )
);

NavigationMenuLink.displayName = "NavigationMenuLink";

export { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink };
