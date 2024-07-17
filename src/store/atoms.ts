import { atom } from "recoil";

export const inputAtom = atom({
    key: 'inputAtom',
    default: ""
})

export const initialMessageAtom = atom({
    key: 'initialMessageAtom',
    default: true
})

export const inputBoxDisabledAtom = atom({
    key: 'inputBoxDisabledAtom',
    default: true
})

export const loadingAtom = atom({
    key: 'loadingAtom',
    default: false
})

export const typeAtom = atom({
    key: "typeAtom",
    default: ""
})