/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Realm from 'realm';

import { RealmProvider, useRealm, useObject, useQuery } from './RealmContext';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Button,
  TextInput,
  View,
} from 'react-native';

// function MyComponent({someId}){
// 	const realm = useRealm();
// 	const {data: tasks, error: tasksError} = useQuery<Task>('Task');
// 	const {data: someObject, error: someObjectError} = useQuery<SomeObject>('Objects');

// 	if(tasksError || someObjectError){
// 		console.error(`${tasksError} ${someObjectError});
// 		return null
// 	}

// 	return ...
// }

const CoolComponent = () => {
  const [taskInputValue, onChangeText] = React.useState();

  const realm = useRealm();

  const tasks = useQuery<Task>('Task').data || [];
  const tasksError = useQuery<Task>('Task').error;

  if (tasksError) {
    console.error(`${tasksError}`);
  }

  const createTask = () => {
    realm.write(() => {
      realm.create('Task', {
        _id: new Realm.BSON.ObjectId(),
        description: taskInputValue,
      });
    });
  };

  return (
    <View>
      <Text>Cool Component Header</Text>
      <Text>Insert a new task</Text>
      <TextInput
        value={taskInputValue}
        onChangeText={onChangeText}
        style={styles.input}
      />
      <Button onPress={createTask} title="Submit" />
      {tasks.map(task => (
        <Text>{task.description}</Text>
      ))}
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <RealmProvider>
        <Text style={styles.headerText}>Hello world</Text>
        <CoolComponent />
      </RealmProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 42,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
