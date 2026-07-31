import { useEffect } from "react";

// Cierra un dropdown si se hace clic fuera de su trigger y de su panel.
// Uso: useClickOutside([".nav-user-btn", ".user-menu-dropdown"], () => setOpen(false), isOpen);
export function useClickOutside(selectors, onOutsideClick, active = true) {
  useEffect(() => {
    if (!active) return;

    const handleClickOutside = (event) => {
      const clickedInside = selectors.some((selector) =>
        event.target.closest(selector)
      );
      if (!clickedInside) onOutsideClick();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectors, onOutsideClick, active]);
}
