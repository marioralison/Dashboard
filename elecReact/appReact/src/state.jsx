import { atom } from "recoil";

export const userNameState = atom({
    key : 'userNameState', //Id unique pour cet état
    default : '', //valeur initial
})