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
    default: false
})

export const loadingAtom = atom({
    key: 'loadingAtom',
    default: false
})


export const aiModelAtom = atom({
    key: "aiModelAtom",
    default: "gpt-4o"
})

export const docsAtoms = atom({
    key: "DocsAtom",
    default: "langchainJS"
})

export const displayUrl = atom({
    key: "displayUrl",
    default: "https://developers.facebook.com/docs/marketing-apis"
})