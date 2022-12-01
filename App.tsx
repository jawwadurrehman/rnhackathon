import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from './src/screens/Dashboard';
import {useSelector} from 'react-redux';

import ManageCategories from './src/screens/ManageCategories';

import MachineTypesMenu from './src/components/MachineTypesMenu';
import {MachineState, MachinesType} from './src/store/types';
import Container from './src/components/Container';

const Drawer = createDrawerNavigator();

export interface RootState {
  machinesReducer: MachineState;
}

const App = () => {
  const {machine_types} = useSelector(
    (state: RootState) => state.machinesReducer,
  );

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={Dashboard} />

        {machine_types.map((machine_type: MachinesType, index: number) => {
          return (
            <Drawer.Screen
              key={index}
              name={'machine-' + machine_type.id}
              options={{
                title: machine_type.name,
              }}
              children={() => (
                <Container>
                  <MachineTypesMenu machine_type={machine_type} />
                </Container>
              )}
            />
          );
        })}
        <Drawer.Screen name="Manage Categories" component={ManageCategories} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
