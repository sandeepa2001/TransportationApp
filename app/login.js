import React from "react";
import { View, TextInput, Button, Text,StyleSheet,TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";

const Login = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    router.push({
      pathname: "/home",
      params: { username: data.username }, // Pass username to home
    });
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Start Your Journey with affordable price</Text>
        <View style={styles.inputContainer}>
        <Text style={styles.label}>EMAIL</Text>
        <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
            
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Text style={styles.label}>PASSWORD</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter Your Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />

        </View>
        <TouchableOpacity style={styles.signInButton} onPress={handleSubmit(onSubmit)}>
  <Text style={styles.signInButtonText}>Sign in</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.signUpText}>
          Don’t Have an Account? <Text style={styles.signUpLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginVertical: 10,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 20,
  },
  label: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  signInButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 14,
    color: '#777',
    marginVertical: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginVertical: 10,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    color: '#777',
    marginTop: 20,
  },
  signUpLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default Login;
