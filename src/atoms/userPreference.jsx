import { atomWithStorage } from "jotai/utils";


export const showCarListAtom = atomWithStorage('carlist-atom', false)
export const showHistoryAtom = atomWithStorage('historylist-atom',false);