import { createContext } from "react";

export const LastUpdatedRefContext = createContext<React.RefObject<{ id: number; value: string } | null>>(null);