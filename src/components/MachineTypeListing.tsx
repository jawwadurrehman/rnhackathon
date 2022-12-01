import {View, FlatList} from 'react-native';
import React, {memo, useCallback} from 'react';
import {colors} from '../styles';

import {Text} from 'react-native-paper';
import {
  Machines,
  MachineTypesFields,
  MachineTypesFieldsValue,
} from '../store/types';

import MachineItem from './MachineItem';

interface Props {
  title_id: string;
  machines: Machines[];
  machine_types_fields: MachineTypesFields[];
  machine_types_fields_value: MachineTypesFieldsValue[];
}
export type getFieldValueType = (
  machine_id: string,
  machine_type_field_id: string,
) => MachineTypesFieldsValue | undefined;

const MachineTypeListing = ({
  title_id,
  machines,
  machine_types_fields,
  machine_types_fields_value,
}: Props) => {
  const getFieldValue = useCallback<getFieldValueType>(
    (machine_id, machine_type_field_id) => {
      return machine_types_fields_value.find(
        (e: MachineTypesFieldsValue) =>
          e.machine_id === machine_id &&
          e.machine_type_field_id === machine_type_field_id,
      );
    },
    [machine_types_fields_value],
  );

  return machines.length > 0 ? (
    <>
      {machines.map((item, index) => (
        <MachineItem
          machine={item}
          key={'machine-' + index}
          title_id={title_id}
          machine_types_fields={machine_types_fields}
          machine_types_fields_value={machine_types_fields_value}
          getFieldValue={getFieldValue}
        />
      ))}
    </>
  ) : (
    <NoItemMessage />
  );
};

export default MachineTypeListing;

const NoItemMessage = memo(() => {
  return (
    <View style={{padding: 10}}>
      <Text
        variant="bodyMedium"
        style={{color: colors.black + '80', textAlign: 'center'}}>
        No items to display
      </Text>
    </View>
  );
});
