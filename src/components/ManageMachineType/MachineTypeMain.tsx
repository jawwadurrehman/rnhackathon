import {View} from 'react-native';
import React, {memo, useCallback} from 'react';

import {TextInput} from 'react-native-paper';

import {
  ActionTypes,
  MachinesType,
  MachineTypesFields,
} from '../../store/types';
import {useDispatch} from 'react-redux';
import MachineTypeFieldInput from './MachineTypeFieldInput';

interface Props {
  machine_type: MachinesType;
  filtered_machine_types_fields: MachineTypesFields[];
}

const MachineTypeMain = ({
  filtered_machine_types_fields,
  machine_type,
}: Props) => {
  const dispatch = useDispatch();

  const onChangeCategoryName = useCallback(
    (text: string) => {
      dispatch({
        type: ActionTypes.UPDATE_MACHINE_TYPE,
        payload: {
          id: machine_type.id,
          property: 'name',
          value: text,
        },
      });
    },
    [machine_type.id],
  );

  return (
    <>
      <View style={{marginBottom: 15}}>
        <TextInput
          mode="outlined"
          label="Category Name"
          value={machine_type.name}
          onChangeText={onChangeCategoryName}
        />
      </View>
      {filtered_machine_types_fields.map((fmtf: MachineTypesFields) => {
        return (
          <MachineTypeFieldInput machine_type_field={fmtf} key={fmtf.id} />
        );
      })}
    </>
  );
};

export default memo(MachineTypeMain);
