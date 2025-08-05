import { atom } from "jotai";

export const fileAtom = atom<File | null>(null);
export const isFileFromDeviceAtom = atom<boolean>(false);
export const isCameraAtom = atom<boolean>(false);
export const isConvertingAtom = atom<boolean>(false);
export const resultAtom = atom<string | null>(null);
