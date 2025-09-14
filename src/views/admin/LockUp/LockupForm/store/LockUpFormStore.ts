import { create } from 'zustand'
import type { LockupOption,  selectedLockUpDetails, Lockups  } from '../types'

export type LockupFormState = {
    LockUpList: Lockups
    LockupOption: LockupOption[]
    selectedLockup: selectedLockUpDetails[]
}

type LockupFormAction = {
    setLockupList: (payload: Lockups) => void
    setLockupOption: (payload: LockupOption[]) => void
    setSelectedLockup: (payload: selectedLockUpDetails[]) => void
}

const initialState: LockupFormState = {
    LockUpList: [],
    LockupOption: [],
    selectedLockup: [],
}

export const useLockupFormStore = create<
    LockupFormState & LockupFormAction
>((set) => ({
    ...initialState,
    setLockupOption: (payload) => set(() => ({ LockupOption: payload })),
    setLockupList: (payload) => set(() => ({ LockUpList: payload })),
    setSelectedLockup: (payload) =>
        set(() => ({ selectedLockup: payload })),
}))
