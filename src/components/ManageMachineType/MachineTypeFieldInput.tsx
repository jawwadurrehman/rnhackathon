import {View} from 'react-native';
import React, {memo, useCallback} from 'react';

import styles, {colors} from '../../styles';
import {TextInput, IconButton} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import {
  ActionTypes,
  FieldTypes,
  MachineTypesFields,
} from '../../store/types';
import {useDispatch} from 'react-redux';

interface Props {
  machine_type_field: MachineTypesFields;
}

const style = [styles.row, styles.itemsCenter, {marginBottom: 15}];
const dropdownStyle = {
  buttonStyle: {
    maxWidth: 100,
    borderBottomWidth: 1,
    borderColor: colors.primary,
  },
  textStyle: {
    fontSize: 14,
  },
};

const textInputStyle = {flex: 1, marginTop: -5};

const fieldNames = [
  FieldTypes.NUMBER,
  FieldTypes.TEXT,
  FieldTypes.CHECKBOX,
  FieldTypes.DATE,
];

const MachineTypeFieldInput = ({machine_type_field}: Props) => {
  const dispatch = useDispatch();

  const onChange = useCallback(
    (value: string, property: string) => {
      
      dispatch({
        type: ActionTypes.UPDATE_MACHINE_TYPES_FIELD,
        payload: {
          id: machine_type_field?.id,
          property: property,
          value: value,
        },
      });
    },
    [machine_type_field],
  );

  const onChangeFieldLabel = useCallback((text: string) => {
    onChange(text, 'name');
  }, []);

  const onChangeFieldType = useCallback((text: string) => {

    
    onChange(text, 'type');
  }, []);

  const onDelete = useCallback(() => {
    dispatch({
      type: ActionTypes.DELETE_MACHINE_TYPES_FIELD,
      payload: {
        id: machine_type_field.id,
      },
    });
  }, [machine_type_field]);

  return (
    <View style={style}>
      <TextInput
        mode="outlined"
        label="Field"
        value={machine_type_field.name}
        onChangeText={onChangeFieldLabel}
        style={textInputStyle}
      />
      <SelectDropdown
        rowTextForSelection={item => item}
        buttonTextAfterSelection={item => item}
        buttonStyle={dropdownStyle.buttonStyle}
        rowTextStyle={dropdownStyle.textStyle}
        buttonTextStyle={dropdownStyle.textStyle}
        defaultValue={machine_type_field.type}
        data={fieldNames}
        onSelect={onChangeFieldType}
      />
      <IconButton icon="trash-can-outline" size={20} onPress={onDelete} />
    </View>
  );
};

export default memo(MachineTypeFieldInput);
