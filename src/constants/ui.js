import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get("window")

export const Cores = {
   principal:'#000000',
   secundaria:'#bf9f00',
   perigo:'#ff0000',
   base:'#0f0f8f',
   fundo:'#121212'
}

export const Tamanhos = {
    width,
    height
}
const ui = {Cores, Tamanhos}
export default ui