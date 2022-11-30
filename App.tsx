import {Text, Button} from 'react-native-paper';

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from './src/screens/Dashboard';
import {useSelector, useDispatch} from 'react-redux';
import MachineTypeListing from './src/components/MachineTypeListing';
import styles, {colors} from './src/styles';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {ADD_MACHINE} from './src/store/constants';
import ManageCategories from './src/screens/ManageCategories';

const Drawer = createDrawerNavigator();

const App = (props: any) => {
  const {machine_types} = useSelector((state: any) => state.machinesReducer);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={Dashboard} />

        {machine_types.map((machine_type: any, index: number) => {
          
          return (
            <Drawer.Screen
              key={index}
              name={'machine-' + machine_type.id}
              options={{
                title:machine_type.name
              }}
              children={() => <MachineTypesMenu machine_type={machine_type} />}
            />
          );
        })}
        <Drawer.Screen name="Manage Categories" component={ManageCategories} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;

const MachineTypesMenu = ({machine_type}: any) => {
  const {machines, machine_types_fields, machine_types_fields_value} =
    useSelector((state: any) => state.machinesReducer);

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <View
          style={[
            styles.row,
            styles.spaceBetween,
            {
              paddingVertical: 10,
              marginBottom: 5,
              borderBottomWidth: 1,
              borderColor: colors.black + '10',
            },
          ]}>
          <Text
            style={{fontWeight: '700', color: colors.black}}
            variant="headlineSmall">
            {machine_type.name}
          </Text>
          <Button
            icon="plus"
            mode="contained"
            onPress={() =>
              dispatch({
                type: ADD_MACHINE,
                payload: {
                  machine_type_id: machine_type.id,
                },
              })
            }>
            ADD
          </Button>
        </View>

        <MachineTypeListing
          title_id={machine_type.title_id}
          machines={machines.filter(
            (e: any) => e.machine_type_id === machine_type.id,
          )}
          machine_types_fields={machine_types_fields.filter(
            (e: any) => e.machine_type_id === machine_type.id,
          )}
          machine_types_fields_value={machine_types_fields_value}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
