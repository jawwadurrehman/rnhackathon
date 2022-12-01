import React, {memo} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../App';
import {Machines, MachinesType, MachineTypesFields} from '../store/types';
import MachineTypeHeader from './MachineTypeHeader';
import MachineTypeListing from './MachineTypeListing';
import {View} from 'react-native';

interface Props {
  machine_type: MachinesType;
}
const containerStyle = {marginBottom: 20};


const MachineTypesMenu = ({machine_type}: Props) => {
  const {machines, machine_types_fields, machine_types_fields_value} =
    useSelector((state: RootState) => state.machinesReducer);

  return (
    <View style={containerStyle}>
      <MachineTypeHeader machine_type={machine_type} />

      <MachineTypeListing
        title_id={machine_type.title_id}
        machines={machines.filter(
          (e: Machines) => e.machine_type_id === machine_type.id,
        )}
        machine_types_fields={machine_types_fields.filter(
          (e: MachineTypesFields) => e.machine_type_id === machine_type.id,
        )}
        machine_types_fields_value={machine_types_fields_value}
      />
    </View>
  );
};

export default memo(MachineTypesMenu);
