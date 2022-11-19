import {View, SafeAreaView, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import styles, {colors} from '../styles';
import {useSelector, useDispatch} from 'react-redux';
import {Text, Button, TextInput} from 'react-native-paper';
import {
  ADD_MACHINE,
  DELETE_MACHINE,
  UPDATE_MACHINE_TYPES_FIELD_VALUE,
} from '../store/constants';
import MachineTypeListing from '../components/MachineTypeListing';

const Dashboard = () => {
  const {
    machine_types,
    machines,
    machine_types_fields,
    machine_types_fields_value,
  } = useSelector((state: any) => state.machinesReducer);

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
         <ScrollView contentContainerStyle={{paddingBottom:100}}>
      {machine_types.map((machine_type: any, index: number) => (
        <View style={{marginBottom: 10}} key={'machine-type' + index}>
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
        </View>
      ))}
     </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
