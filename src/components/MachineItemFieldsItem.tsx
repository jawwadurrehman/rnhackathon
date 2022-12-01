import React, {memo, useCallback} from 'react';

import {View} from 'react-native';
import {useDispatch} from 'react-redux';

import {
  ActionTypes,
  FieldTypes,
  MachineTypesFields,
  MachineTypesFieldsValue,
} from '../store/types';

import DateField from './FieldBox/DateField';
import InputField from './FieldBox/InputField';
import CheckBoxField from './FieldBox/CheckBoxField';

interface Props {
  machine_type_field: MachineTypesFields;

  machine_id: string;
  field: MachineTypesFieldsValue | undefined;
}

const MachineItemFieldsItem = ({
  machine_type_field,

  field,
  machine_id,
}: Props) => {
  const dispatch = useDispatch();

  const onChange = useCallback(
    (text: string) => {
      if (field) {
        dispatch({
          type: ActionTypes.UPDATE_MACHINE_TYPES_FIELD_VALUE,
          payload: {
            id: field.id,
            value: text,
          },
        });
      } else {
        dispatch({
          type: ActionTypes.ADD_MACHINE_TYPES_FIELD_VALUE,
          payload: {
            value: text,
            machine_type_field_id: machine_type_field.id,
            machine_id: machine_id,
          },
        });
      }
    },
    [field],
  );

  const renderFieldType = React.useMemo(() => {
    console.log('render' + Date.now());

    const restProps = {
      name: machine_type_field.name,
      value: field?.value,
    };

    switch (machine_type_field.type) {
      case FieldTypes.CHECKBOX:
        return <CheckBoxField onChange={onChange} {...restProps} />;

      case FieldTypes.DATE:
        return <DateField onChange={onChange} {...restProps} />;

      case FieldTypes.NUMBER:
        return (
          <InputField type="number-pad" onChange={onChange} {...restProps} />
        );
      case FieldTypes.TEXT:
        return <InputField onChange={onChange} {...restProps} />;

      default:
        return <View />;
    }
  }, [machine_type_field.type, field]);

  return <View>{renderFieldType}</View>;
};

export default memo(MachineItemFieldsItem);
