import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../Result/components'
import { LoginScreenProps } from '../types'
import { SignInfunction } from '../../api/accounts';
import * as SecureStore from 'expo-secure-store';
import { DataContext } from '../../lib/DataContext';

export function LoginScreen({ navigation, route }: LoginScreenProps) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isFormValid, setIsFormValid] = useState(false); 
  const dataContext = useContext(DataContext);
  const [getuserId, setGetUserIt] = useState('');

  if (!dataContext) {
    throw new Error('DataProfile must be used within a DataProvider');
  }
  const { userId,handleUserIdChange } = dataContext;

  useEffect(() => { 
    // setErrors({ name: name, email: email, password: password });
      // Trigger form validation when name,  
      // email, or password changes   
      validateForm(); 
      handleUserIdChange(getuserId);
  }, [ getuserId, email, password]); 
  console.log('userId on loginscreen: ' , userId);
  const validateForm = () => { 
    const error = { email: '', password: '' }
      // Validate email field 
      if (!email) { 
          error.email = 'Email is invalid.'; 
      } else if (!/\S+@\S+\.\S+/.test(email)) { 
          error.email = 'Email is required.'; 
      } 
      // Validate password field 
      if (password.length < 6) { 
          error.password = 'Password must be at least 6 characters.'; 
      } else if (password.length < 6) { 
          error.password = 'Password is required.'; 
      } 

      // Set the errors and update form validity 
      setErrors(error); 
      setIsFormValid(
        !error.email && !error.password
      );
  }; 

  const handleSubmit = async () => { 
      if (isFormValid) { 
        const data = {
            email: email,
            password: password
        }
        const res = await SignInfunction(data)
        await SecureStore.setItemAsync('secure_token',res.accessToken);
        setGetUserIt(res.userfinded.id); 
        navigation.navigate("Home")
      } else {            
          // Form is invalid, display error messages 
          console.log('Form has errors. Please correct them.'); 
      } 
  }; 
  return (
    <View style={styles.container}> 
    <Text style={styles.title}>
        Login
    </Text>
            <TextInput 
                style={styles.input} 
                placeholder="Email"
                value={email} 
                onChangeText={setEmail} 
            /> 
            <TextInput 
                style={styles.input} 
                placeholder="Password"
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry 
            /> 
            <View style={styles.buttonContainer}>
            <TouchableOpacity 
                style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]} 
                disabled={!isFormValid} 
                onPress={handleSubmit} 
            > 
                    <Text style={styles.buttonText}>Submit</Text> 
            </TouchableOpacity> 
            <TouchableOpacity 
                style={styles.btncancel} 
                onPress={() => navigation.navigate("Home")}
            > 
                    <Text style={styles.buttonCancel}>Cancel</Text> 
            </TouchableOpacity>
            </View>
            {Object.values(errors).map((error, index) => ( 
                <Text key={index} style={styles.error}> 
                    {error} 
                </Text> 
            ))} 
            
        </View> 
  )
}
// Styles for the components 
const styles = StyleSheet.create({ 
  container: { 
      flex: 1, 
      padding: 16, 
      justifyContent: 'center', 
  }, 
  title: {
    fontSize: 24,
    color: '#525252',
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: { 
      height: 60, 
      borderColor: '#ccc', 
      borderWidth: 1, 
      marginBottom: 12, 
      paddingHorizontal: 10, 
      borderRadius: 8, 
      fontSize: 16, 
  }, 
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: { 
      backgroundColor: 'green', 
      borderRadius: 8, 
      paddingVertical: 10, 
      alignItems: 'center', 
      marginTop: 16, 
      marginBottom: 12, 
  }, 
  btncancel: {
        backgroundColor: 'red', 
        borderRadius: 8, 
        paddingVertical: 10, 
        alignItems: 'center', 
        marginTop: 16, 
        marginBottom: 12, 
  },
  buttonCancel: {
        color: '#fff', 
        fontWeight: 'bold', 
        textAlign: 'center',
        fontSize: 16, 
        width: 150,
  },
  buttonText: { 
      color: '#fff', 
      fontWeight: 'bold', 
      textAlign: 'center',
      fontSize: 16, 
      width: 150,
  }, 
  error: { 
      color: 'red', 
      fontSize: 20, 
      marginBottom: 12, 
  }, 
}); 
