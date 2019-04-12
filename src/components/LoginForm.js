import React, {Component} from 'react';
import {View, TextInput, Text} from 'react-native';
import {Button, Card, CardSection, Input} from './common';
import firebase from 'firebase';


class LoginForm extends Component<Props>{
    state = {
        userpassword: '',
        useremial: '',        
        loginerror: ''
    };
    onButtonPress = () => {
        const {userpassword, useremial} = this.state;
        console.log(useremial+ " " + userpassword)
        firebase.auth().signInWithEmailAndPassword(useremial, userpassword)
        .then(
          
            loginerror = this.setState({loginerror : "Sucessfully loggegin"})
        )
        .catch((e)=>{
            console.log("first catch",e),
            firebase.auth().createUserWithEmailAndPassword(useremial, userpassword).catch(error => {
                switch (error.code) {
                  case 'auth/email-already-in-use':
                    console.warn('This email address is already taken');
                    break;
                  case 'auth/invalid-email':
                    console.warn('Invalid e-mail address format');
                    break;
                  case 'auth/weak-password':
                    console.warn('Password is too weak');
                    break;
                  default:
                    console.warn('Check your internet connection');
                }
              })
              .then(info => {
                if (info) {
                  firebase.auth().currentUser.updateProfile({
                   // displayName: name
                  });
                  //resolve(true);
                }
              });
        });
    }
    render(){        
        return (
            <Card>
                <CardSection>
                    <Input
                    label = "Email: " 
                    placeholder = "user@gmail.com"
                    value = {this.state.useremial}
                    style= {{width: 100, height: 20}}
                    onChangeText= {text2 => this.setState({useremial: text2})}
                    />
                </CardSection>
                <CardSection>
                <Input
                    secureTextEntry
                    label = "Password: " 
                    placeholder = "password"
                    value = {this.state.userpassword}
                    style= {{width: 100, height: 20}}
                    onChangeText= {text2 => this.setState({userpassword: text2})}
                    />
                </CardSection>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Log in
                    </Button>
                </CardSection>
                <Text>
                    {this.state.error}
                </Text>
            </Card>
        );
    }
}

export default LoginForm;