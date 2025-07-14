import { createContext } from "react";
import { HandleSubmitType } from "@/lib/types";

export const HandleSubmitContext = createContext<HandleSubmitType>(null)