import React, {Component} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from './common';
import firebase from 'firebase';


class LoginForm extends Component<Props>{
    state = {
        userpassword: '',
        useremial: '',        
        loginerror: '',
        loading: false,
    };
    onButtonPress = () => {
        const {userpassword, useremial} = this.state;
        this.setState({loginerror: "", loading: true})
        firebase.auth().signInWithEmailAndPassword(useremial, userpassword)
        .then( this.onLoginSucess.bind(this))
        .catch((e)=>{            
            firebase.auth().createUserWithEmailAndPassword(useremial, userpassword)
            .then( this.onLoginSucess.bind(this))
            .catch(
                this.onLoginFail.bind(this)
            );
        });
    }

    onLoginSucess(){
        this.setState({
            loading: false,
            loginerror: '',
            useremial: '',
            userpassword: '',
        })
    }
    onLoginFail(){
        this.setState({
            loginerror: "Authenticetion Falied",
            loading: false,
        });
    }
    renderButton(){
        if(this.state.loading){
            return <Spinner size ="small"/>
        }
        return (
         <Button onPress={this.onButtonPress.bind(this)}>
            Log in
         </Button>
        )
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
                   {this.renderButton()}
                </CardSection>
                <Text style= {styles.errorTextStyle}>
                    {this.state.loginerror}
                </Text>
            </Card>
        );
    }
}
const styles = StyleSheet.create({
    errorTextStyle: {
        color: 'red',
        fontSize: 20,
        textAlign: 'center'        
    }
});
export default LoginForm;