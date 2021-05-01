import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../config';
import firebase from 'firebase';


export default class Login extends React.Component{

    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            confirmPassword:'',
            firstname:'',
            lastname:'',
            contact:'',
            address:'',
            isModalVisible:false,
        }
    }

    userlogin=async(email, password)=>{
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=>{
            return Alert.alert('Successful Login')
        })
        .catch(error=>{
            return Alert.alert(error.message)
        })
    }

    usersignup=(email, password, confirmPassword)=>{
        if(password!==confirmPassword){
            return Alert.alert('Both Passwords Do Not Match')
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(()=>{
            return Alert.alert(
                'Account Successfully Created. To continue please Login.',
                '',
                [
                    {
                        text:'OK',
                        onPress:()=>this.setState({
                            isModalVisible:false,
                        })
                    }
                ])
            })
            .catch(error=>{
            return Alert.alert(error.message)
            })

            db.collection('Users').add({
                FullName:this.state.firstname + this.state.lastname,
                Contact: this.state.contact,
                Address: this.state.address,
                Email: this.state.email,

            })
        }
    }

    showModal=()=>{
        <Modal
            animationType='fade'
            transparent={true}
            visible={this.state.isModalVisible}>
                <View style={styles.modalContainer}>
                    <ScrollView style={{width:'100%'}}>
                        <KeyboardAvoidingView>

                            <Text style={styles.modalTitle}>User Sign-Up</Text>

                            <TextInput
                            style={styles.formTextInput}
                            placeholder='First Name'
                            onChangeText={(text)=>{
                                this.setState({
                                    firstname:text
                                })
                            }}
                            />

                            <TextInput
                                style={styles.formTextInput}
                                placeholder='Last Name'
                                maxLength={20}
                                onChangeText={(text)=>{
                                    this.setState({
                                        lastname:text
                                    })
                            }}
                            />

                            <TextInput
                                style={styles.formTextInput}
                                placeholder='Address'
                                multiline={true}
                                onChangeText={(text)=>{
                                    this.setState({
                                        address:text
                                    })
                            }}
                            />

                            <TextInput
                                style={styles.formTextInput}
                                placeholder='Contact No.'
                                keyboardType='numeric'
                                maxLength={10}
                                onChangeText={(text)=>{
                                    this.setState({
                                        contact:text
                                    })
                            }}
                            />

                            <TextInput
                                style={styles.formTextInput}
                                placeholder='E-mail'
                                keyboardType='email-address'
                                onChangeText={(text)=>{
                                    this.setState({
                                        email:text
                                    })
                            }}
                            />

                            <TextInput
                                style={styles.formTextInput}
                                secureTextEntry={true}
                                placeholder='Password'
                                onChangeText={(text)=>{
                                    this.setState({
                                        password:text
                                    })
                            }}
                            />

                            <TextInput
                                style={styles.formTextInput}
                                secureTextEntry={true}
                                placeholder='Confirm Password'
                                onChangeText={(text)=>{
                                    this.setState({
                                        confirmPassword:text
                                    })
                            }}
                            />

                            <View>
                                <TouchableOpacity 
                                    style={styles.registerButton}
                                    onPress={()=>{
                                        this.usersignup(this.state.email, this.state.password, this.state.confirmPassword);
                                        this.setState({
                                            isModalVisible:false
                                        })
                                }}>
                                    <Text style={styles.registerButtonText}>Register</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.registerButton}
                                    onPress={()=>{
                                        this.setState({
                                            isModalVisisble:false
                                        })
                                    }}>
                                    <Text style={styles.registerButtonText}>Cancel</Text>
                                </TouchableOpacity>

                                </View>


                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
        </Modal>
    }

   

    render(){
        return(
            <View style={styles.container}>

                <View style={{justifyContent:'center', alignItems:'center'}}>
                    {this.showModal()}
                </View>

                <View>
                <Text style={styles.headertext}>Barter</Text>

                <Text style={{color:'#528aae', fontWeight:'bold'}}>Welcome To Barter! To continue please Login</Text>
                </View>
                
                <View>
                <TextInput
                style={styles.inputBox}
                keyboardType= 'email-address'
                placeholder='123@example.com'
                onChangeText={(text)=>{
                    this.setState({
                        email:text
                    })
                }}/>

                <TextInput
                style={styles.inputBox}
                secureTextEntry={true}
                placeholder='Password'
                onChangeText={(text)=>{
                    this.setState({
                        password:text
                    })
                }}/>


                <TouchableOpacity 
                style={styles.button}
                onPress={()=>{
                    this.userlogin(this.state.email, this.state.password);
                }}>
                    <Text style={styles.registerButton} >LOG-IN</Text>
                </TouchableOpacity>
     
                <TouchableOpacity
                style={styles.button}
                onPress={()=>{
                    this.setState({
                        isModalVisible:true
                    })
                }}
                >
                    <Text>SIGN UP</Text>
                </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#bcd2e8',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headertext: {
        fontSize: 50,
        color:'#001c57',
        paddingBottom: 30
    },
    inputBox: {
        borderColor:'#001b3a',
        borderBottomWidth:2,
        height:20,
        width:200,
        marginTop:30,
    },
    button: {
        width:225, 
        height:35, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:25, 
        backgroundColor:"#528aae", 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 8, }, 
        shadowOpacity: 0.30, 
        shadowRadius: 10.32, 
        elevation: 16, 
        marginTop: 35
    },
    modalTitle :{ 
        justifyContent:'center', 
        alignSelf:'center', 
        fontSize:30, 
        color:'#ff5722', 
        margin:50 
    }, 
    modalContainer:{ 
        flex:1, 
        borderRadius:20, 
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor:"pink", 
        marginRight:30, 
        marginLeft : 30, 
        marginTop:80, 
        marginBottom:80, 
    }, 
    formTextInput:{ 
        width:"75%", 
        height:35, 
        alignSelf:'center', 
        borderColor:'#ffab91', 
        borderRadius:10, 
        borderWidth:1, 
        marginTop:20, 
        padding:10 
    }, 
    registerButton:{ 
        width:200, 
        height:40, 
        alignItems:'center', 
        justifyContent:'center', 
        borderWidth:1, 
        borderRadius:10,
        marginTop:30 
    }, 
    registerButtonText:{ 
        color:'#ff5722', 
        fontSize:15, 
        fontWeight:'bold' 
    }, 
    cancelButton:{ 
        width:200, 
        height:30, 
        justifyContent:'center', 
        alignItems:'center', 
        marginTop:5, 
    },
    modalTitle :{ 
        justifyContent:'center', 
        alignSelf:'center', 
        fontSize:30, 
        color:'#ff5722', 
        margin:50 
    }, 
  });
  