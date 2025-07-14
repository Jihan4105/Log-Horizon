import { createContext } from "react";

import { MinimalTreeItemData } from "@/lib/types";

export const ItemsContext = createContext<MinimalTreeItemData[] | null>(null);