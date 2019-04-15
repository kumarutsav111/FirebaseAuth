import React , { Component } from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase';
import { Button, Card, Header, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component<Props> {
    state = { loggedIn: null }; 

    componentWillMount(){       
        firebase.initializeApp({
                apiKey: 'AIzaSyATsgKbBr-Jw-LbJO7L8bY4H0UF-Y0yUt4',
                authDomain: 'albumprojectutsav.firebaseapp.com',
                databaseURL: 'https://albumprojectutsav.firebaseio.com',
                projectId: 'albumprojectutsav',
                storageBucket: 'albumprojectutsav.appspot.com',
                messagingSenderId: '982828196142'
        });
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({loggedIn: true});
            } else {
                this.setState({loggedIn: false});
            }
        });
    }
    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                    return (                      
        <Button onPress= {() => {firebase.auth().signOut()}}>Log Out</Button>                      
                    );
            case false:
                    return <LoginForm/>
            default:
                    return <View style = {{alignItems: 'center'}}><Spinner size = "large" /></View>
        }
    }
    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
};
export default App;