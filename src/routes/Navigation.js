import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Inicio from '../screens/Inicio'
import Cadastro from '../screens/Cadastro'

const Stack = createStackNavigator()

export default function Navigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Inicio'>
                <Stack.Screen 
                    name='Inicio'
                    component={Inicio}
                    options={{headerShown:false}} />
                <Stack.Screen
                    name='Cadastro'
                    component={Cadastro}
                    options={{headerShown:false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}