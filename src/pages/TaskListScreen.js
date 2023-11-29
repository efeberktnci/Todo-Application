import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const saveTodos = async saveTodo => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(saveTodo))
    } catch (error) {
      console.error("Error", error);
    }
  };

  const addTodo = () => {
    if (todo.trim()) {
      const updatedTodos = [...todos, { id: Date.now(), text: todo }];
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
      setTodo(''); // Clear the input field after adding a todo
    }
  };
  

  const deleteTodo =  async id =>{
    const updatedTodos = todos?.filter(x => x.id !== id);
    setTodos(updatedTodos)
    saveTodos(updatedTodos)
      
  }

  const loadTodos = async() => {
    try {
      const storedData = await AsyncStorage.getItem("todos");
      if(storedData){
      setTodos[JSON.parse(storedData)];
      }
    } catch (error) {
      
    }
  }

  const updateTodos = id => {
    const existingTodo = todos?.find(x=> x.id === id)

    if(!existingTodo){
      return;
    }

    Alert.prompt("Edit Todo", "Update", newUpdateText => {
      if(newUpdateText){
        const updatedTodos = todos.map(item=> item?.id === id ? {...item,text: newUpdateText} : item,)
        setTodos(updatedTodos)
        saveTodos(updatedTodos)
      }
    },
    "plain-text",
     existingTodo.text,
    )
  }

  useEffect(() => {
    loadTodos()
  }, [])
  
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerText}>React Native AsyncStorage</Text>
        <View style={styles.inputContainer}>
          <TextInput 
          style={styles.input} 
          placeholder= "Type a Todo" 
          value={todo}
          onChangeText={text=>setTodo(text)}/>
          <View>
            <TouchableOpacity style={[styles.button, styles.addButton]} onPress={addTodo}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={todos}
          keyExtractor={item => item.id?.toString()}
          renderItem={({item}) => (
            <View style={styles.todoItem}>
              <Text>{item?.text}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText} onPress={() => deleteTodo(item?.id)}>Delete</Text>
                </TouchableOpacity>
              </View>
              <View style={ styles.butt}>
                <TouchableOpacity style={[styles.button,styles.updateButton]} onPress={() => updateTodos (item?.id)}>
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  headerText: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  inputContainer: {flexDirection: 'row', marginBottom: 20},
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    padding: 12,
    borderRadius: 20,
    borderColor: 'gray',
  },
  todoItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: "red",
    borderRadius: 8
  },
  addButton:{backgroundColor: "blue"},
  updateButton: {backgroundColor: "green"},
  buttonText: {color: "#fff"}
  
});
