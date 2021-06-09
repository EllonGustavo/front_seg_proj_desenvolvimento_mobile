import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native'
import { TextInput, withTheme, HelperText } from 'react-native-paper'

import { BACKEND, Cores, Tamanhos } from '../constants'

import Cabecalho from '../components/cabecalho'

function Cadastro({ navigation, route }) {

    const { data } = route.params
    const [nome, setNome] = useState(data.nome)
    const [CEP, setCEP] = useState(data.CEP)
    const [teritorio, setTeritorio] = useState(data.teritorio)
    const [qntHabitantes, setQntHabitantes] = useState(data.qntHabitantes)
    const [descricao, setDescricao] = useState(data.descricao)
    const [erros, setErros] = useState({})

    async function salvarCidade() {
        const erros = validaErros()

        if (Object.keys(erros).length > 0) {
            setErros(erros)
        } else {
            const metodo = data._id === null ? 'POST' : 'PUT'
            const cidade = {
                nome: nome,
                CEP: CEP,
                teritorio: teritorio,
                qntHabitantes: qntHabitantes,
                descricao: descricao
            }

            let URL = `${BACKEND}/cidades`
            await fetch(URL, {
                mode: 'cors',
                method: metodo,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cidade)
            })
                .then(res => res.json())
                .then(()=>{
                    setErros({})
                    setNome('')
                    setCEP('')
                    setTeritorio('')
                    setQntHabitantes('')
                    setDescricao('')
                })
                .then(
                    Alert.alert("A cidade foi salva")
                )
        }
    }

    const validaErros = () => {
        const novosErros = {}
        if (!nome || nome === '') novosErros.nome = 'O nome não pode ser vazio'
        else if (nome > 30) novosErros.nome = 'O nome não pode ser maior que 30'

        if (!teritorio || teritorio === null) novosErros.teritorio = 'A quantidade teritorial não pode ser nula'
        else if (teritorio < 0) novosErros.teritorio = 'O teritorio dever ser maior que 0'

        if (qntHabitantes <= 0 || qntHabitantes === null) novosErros.qntHabitantes = 'A quantidade de habitantes deve ser maior que 0'

        if (descricao > 30) novosErros.descricao = 'A descrição deve ser menor que 30'

        return novosErros
    }

    return (
        <>
            <Cabecalho titulo='Cadastra/Alterar Cidade' back={true} navigation={navigation} />
            <View
                style={styles.container} >
                <TextInput
                    label='Nome da cidade'
                    name='CEP'
                    value={nome}
                    style={styles.inputs}
                    error={!!erros.nome}
                    onChangeText={texto => setNome(texto)} />
                <HelperText type='error' visible={!!erros.nome}>
                    {erros.nome}
                </HelperText>

                <TextInput
                    label='CEP da cidade'
                    name='CEP'
                    value={CEP}
                    style={styles.inputs}
                    error={!!erros.CEP}
                    keyboardType='numeric'
                    onChangeText={text => setCEP(text)} />
                <HelperText type='error' visible={!!erros.CEP}>
                    {erros.CEP}
                </HelperText>

                <TextInput
                    label='Teritório em KM'
                    name='teritorio'
                    value={teritorio}
                    style={styles.inputs}
                    error={!!erros.teritorio}
                    keyboardType='numeric'
                    onChangeText={text => setTeritorio(text)} />
                <HelperText type='error' visible={!!erros.teritorio}>
                    {erros.teritorio}
                </HelperText>

                <TextInput
                    label='Quantidade de Habitantes'
                    name='qntHabitantes'
                    value={qntHabitantes}
                    style={styles.inputs}
                    error={!!erros.qntHabitantes}
                    keyboardType='numeric'
                    onChangeText={text => setQntHabitantes(text)} />
                <HelperText type='error' visible={!!erros.qntHabitantes}>
                    {erros.qntHabitantes}
                </HelperText>

                <TextInput
                    label='Descrição da cidade'
                    name='descricao'
                    value={descricao}
                    style={styles.inputs}
                    error={!!erros.descricao}
                    onChangeText={text => setDescricao(text)} />
                <HelperText type='error' visible={!!erros.descricao}>
                    {erros.descricao}
                </HelperText>

                <TouchableOpacity
                    style={styles.botaoSalvar}
                    onPress={() => { salvarCidade() }} >
                    <Text>Salvar cidade</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Cores.fundo
    },
    inputs: {
        marginHorizontal: 8,
        marginVertical: 12
    },
    botaoSalvar: {
        backgroundColor: Cores.base,
        width: Tamanhos.width,
        height: 40,
        textAlign: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20
    }
})

export default withTheme(Cadastro)