import React , { Component } from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase';
import { Button, Card, Header, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component<Props> {

    componentWillMount(){
        firebase.initializeApp({
                apiKey: 'AIzaSyATsgKbBr-Jw-LbJO7L8bY4H0UF-Y0yUt4',
                authDomain: 'albumprojectutsav.firebaseapp.com',
                databaseURL: 'https://albumprojectutsav.firebaseio.com',
                projectId: 'albumprojectutsav',
                storageBucket: 'albumprojectutsav.appspot.com',
                messagingSenderId: '982828196142'
        });
    }
    render(){
        return (
            <View>
                <Header headerText = "Authentication"/>
                <LoginForm/>
            </View>
        );
    }
};
export default App;