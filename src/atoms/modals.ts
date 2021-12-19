import { atom } from "recoil";

export const modalsAtom = atom({ key: "modal", default: null });

export enum Modals {
  AddPedal = "ADD_PEDAL",
}
