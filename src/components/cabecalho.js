import React from 'react'
import {Appbar, withTheme} from 'react-native-paper'

function Cabecalho(props){
    return (
        <Appbar.Header>
            {props.back && <Appbar.BackAction onPress ={()=> props.navigation.goBack()} />}
            <Appbar.Content title={props.titulo} subtitle={props.subtitulo} />
        </Appbar.Header>
    )
}

export default withTheme(Cabecalho)