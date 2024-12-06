import { atom } from "recoil";

const savedUserName = localStorage.getItem('userName')

export const userNameState = atom({
    key : 'userNameState', //Id unique pour cet état
    default : savedUserName, //valeur initial
    effects : [
        ({onSet}) => {
            onSet(newValue => {
                localStorage.setItem('userName', newValue)
            })
        }
    ]
})