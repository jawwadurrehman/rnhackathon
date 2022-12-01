import React, {memo, useMemo} from 'react';
import {colors} from '../styles';
import {View, FlatList} from 'react-native';

import {
  Machines,
  MachineTypesFields,
  MachineTypesFieldsValue,
} from '../store/types';
import MachineItemHeader from './MachineItemHeader';
import {getFieldValueType} from './MachineTypeListing';
import MachineItemFieldsItem from './MachineItemFieldsItem';

interface Props {
  machine: Machines;

  title_id: string;
  machine_types_fields: MachineTypesFields[];
  machine_types_fields_value: MachineTypesFieldsValue[];
  getFieldValue: getFieldValueType;
}

const style = {
  backgroundColor: colors.white,
  padding: 10,
  marginVertical: 5,
  borderRadius: 5,
};

const MachineItem = ({
  machine,
  title_id,
  machine_types_fields,
  machine_types_fields_value,
  getFieldValue,
}: Props) => {
  const getTitle = useMemo(() => {
    const field = machine_types_fields.find(
      (mtf: MachineTypesFields) => mtf.id === title_id,
    );

    if (field) {
      const fieldValue = machine_types_fields_value.find(
        (mtfv: MachineTypesFieldsValue) =>
          mtfv.machine_type_field_id === field.id &&
          mtfv.machine_id === machine.id,
      );
      if (fieldValue) {
        return fieldValue.value;
      }
    }
    return 'NO TITLE';
  }, [machine_types_fields_value, machine_types_fields, title_id]);

  return (
    <View style={style}>
      <>
        <MachineItemHeader title={getTitle} machine_id={machine.id} />

        {machine_types_fields.map((item, index) => (
          <MachineItemFieldsItem
            machine_type_field={item}
            key={'machine_type_field-' + index}
            field={getFieldValue(machine.id, item.id)}
            machine_id={machine.id}
          />
        ))}
      </>
    </View>
  );
};

export default memo(MachineItem);
{
  /* <FlatList
        scrollEnabled={false}
        data={machine_types_fields}
        renderItem={({item, index}) => (
          <MachineItemFieldsItem
            machine_type_field={item}
            key={'machine_type_field-' + index}
            field={getFieldValue(machine.id, item.id)}
            machine_id={machine.id}
          />
        )}
        keyExtractor={item => item.id}
      /> */
}
