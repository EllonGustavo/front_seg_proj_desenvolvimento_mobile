import React, { useEffect, useState, useCallback } from 'react'
import { FlatList, RefreshControl, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { FAB, List, withTheme } from 'react-native-paper'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import { BACKEND, Cores, Tamanhos } from '../constants'

import Cabecalho from '../components/cabecalho'

function Inicio({ navigation }) {

    const [cidades, setCidades] = useState([])
    const [recarregando, setReacarregando] = useState(false)

    useEffect(() => {
        obterCidades()
    }, [])

    async function obterCidades() {
        let URL = `${BACKEND}/cidades`
        await fetch(URL)
            .then(res => res.json())
            .then(data => {
                setCidades(data)
            })
    }

    const onRefresh = useCallback(async()=>{
        setReacarregando(false)
        try {
            await obterCidades()
        } catch (error) {
            console.error(error)
        }
        setReacarregando(true)
    },[recarregando])

    async function excluiCidade(item) {
        let URL = `${BACKEND}/cidades${item._id}`
        await fetch(URL, {
            mode:'cors',
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                Alert.alert('Aviso', data.message)
                console.log('Item excluido')
            })
            .catch(function (erro) {
                console.error(`Houve um problema ao excluir a categeria: ${erro.message}`)
            })
    }

    function opcoes(item) {
        return (
            <View>
                <TouchableOpacity
                    style={styles.botaoExcluir}
                    onPress={() => excluiCidade(item)} >
                    <Text>Excluir</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <>
            <Cabecalho titulo='Lista das cidades cadastradas' back={false} navigation={navigation} />
            <View style={styles.container}>
                {
                    cidades.length === 0 ?
                        <View style={styles.container}>
                            <Text
                                style={styles.texto}
                            >Nenhuma cidade esta cadastrada</Text>
                        </View>
                        :
                        <View style={styles.container}>
                            <FlatList
                                data={cidades}
                                renderItem={({ item }) => (
                                    <View>
                                        <Swipeable renderRightActions={()=>opcoes(item)}>
                                            <View
                                                style={styles.items} >
                                                <TouchableOpacity>
                                                    <List.Item
                                                        title={item.nome}
                                                        titleStyle={styles.texto}
                                                        description={item.descricao}
                                                        descriptionStyle={styles.texto} />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.botaoEditar}
                                                    onPress={() => navigation.navigate('Cadastro', {
                                                        data: {
                                                            _id: item._id,
                                                            nome: item.nome,
                                                            CEP: item.CEP,
                                                            teritorio: item.teritorio,
                                                            qntHabitantes: item.qntHabitantes,
                                                            descricao: item.descricao
                                                        }
                                                    })
                                                    } >
                                                    <Text
                                                        style={styles.texto} >Editar</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </Swipeable>
                                    </View>
                                )}
                                keyExtractor={item => item._id.toString()}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={recarregando}
                                        onRefresh={onRefresh}/>
                                }
                            />
                        </View>
                }
                <FAB
                    style={styles.fab}
                    icon='plus'
                    label=''
                    onPress={() => navigation.navigate('Cadastro', {
                        data: {
                            _id: null,
                            nome: '',
                            CEP: '',
                            teritorio: '',
                            qntHabitantes: '',
                            descricao: ''
                        }
                    })} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        margin: 16,
        backgroundColor: Cores.secundaria
    },
    container: {
        flex: 1,
        backgroundColor: Cores.fundo,
        alignItems: 'center',
        justifyContent: 'center'
    },
    items: {
        marginHorizontal: 4,
        marginVertical: 8,
        width: Tamanhos.width,
        color: '#fff',
        backgroundColor: Cores.principal,
        borderColor: Cores.secundaria,
        borderWidth: 5,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    botaoExcluir: {
        flex: 1,
        width: 100,
        backgroundColor: Cores.perigo,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 8
    },
    botaoEditar: {
        backgroundColor: Cores.base,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        color: '#fff'
    }
})

export default withTheme(Inicio)