import {View, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles, {colors} from '../styles';
import {useSelector, useDispatch} from 'react-redux';
import {Text, Button, TextInput, Checkbox} from 'react-native-paper';
import {
  DELETE_MACHINE,
  UPDATE_MACHINE_TYPES_FIELD_VALUE,
} from '../store/constants';
import DatePicker from 'react-native-date-picker';

const MachineTypeListing = ({
  title_id,
  machines,
  machine_types_fields,
  machine_types_fields_value,
}: any) => {
  const dispatch = useDispatch();

  const [datePicker, setdatePicker] = useState({
    visible: false,
    field_id: 0,
    machine_type_field_id: 0,
  });

  const getFieldValue = (machine_id: string, machine_type_field_id: string) =>
    machine_types_fields_value.find(
      (e: any) =>
        e.machine_id === machine_id &&
        e.machine_type_field_id === machine_type_field_id,
    );

  if (machines.length > 0) {
    return machines.map((machine: any, index: number) => {
      const getTitle = () => {
        const field = machine_types_fields.find(
          (val: any) => val.id === title_id,
        );

        if (field) {
          const fieldValue = machine_types_fields_value.find(
            (val: any) => val.machine_type_field_id === field.id,
          );
          if (fieldValue) {
            return fieldValue.value;
          }
        }
        return 'NO TITLE';
      };

      return (
        <View
          key={'machine-' + index}
          style={{
            backgroundColor: colors.white,
            padding: 10,
            marginVertical: 5,
            borderRadius: 5,
          }}>
          <View
            style={[
              styles.row,
              styles.spaceBetween,
              styles.itemsCenter,
              {paddingBottom: 10},
            ]}>
            <Text
              variant="bodyLarge"
              style={{marginBottom: 5, fontWeight: '700', fontSize: 20}}>
              {getTitle()}
            </Text>
            <Button
              icon="trash-can-outline"
              mode="text"
              onPress={() =>
                dispatch({type: DELETE_MACHINE, payload: {id: machine.id}})
              }
              style={{alignSelf: 'flex-end'}}
              textColor={colors.red}
              compact>
              DELETE
            </Button>
          </View>
          <DatePicker
            modal
            mode="date"
            open={datePicker?.visible}
            date={new Date()}
            onConfirm={date => {
              dispatch({
                type: UPDATE_MACHINE_TYPES_FIELD_VALUE,
                payload: {
                  id: datePicker.field_id,
                  value:
                    date.getFullYear() +
                    '-' +
                    date.getMonth().toString().padStart(2, '0') +
                    '-' +
                    date.getDay().toString().padStart(2, '0'),
                  property: 'value',
                  machine_type_field_id: datePicker.machine_type_field_id,
                  machine_id: machine.id,
                },
              });
              setdatePicker(prev => ({...prev, visible: false}));
            }}
            onCancel={() => {
              setdatePicker(prev => ({...prev, visible: false}));
            }}
          />
          {machine_types_fields.map(
            (machine_type_field: any, index: number) => {
              let field = getFieldValue(machine.id, machine_type_field.id);

              const onChange = (text: string) => {
                dispatch({
                  type: UPDATE_MACHINE_TYPES_FIELD_VALUE,
                  payload: {
                    id: field?.id,
                    value: text,
                    property: 'value',
                    machine_type_field_id: machine_type_field.id,
                    machine_id: machine.id,
                  },
                });
              };

              return (
                <View key={'machine_type_field-' + index}>
                  {machine_type_field.type === 'CHECKBOX' ? (
                    <View
                      style={[
                        styles.row,
                        styles.itemsCenter,
                        styles.spaceBetween,
                        {paddingVertical: 5},
                      ]}>
                      <Text variant="bodyLarge" style={{fontSize: 20}}>
                        {machine_type_field.name === ''
                          ? 'Unnamed Field'
                          : machine_type_field.name}
                      </Text>
                      <Checkbox
                        status={
                          field?.value === 'true' ? 'checked' : 'unchecked'
                        }
                        onPress={() => {
                          onChange(field?.value === 'true' ? 'false' : 'true');
                        }}
                      />
                    </View>
                  ) : machine_type_field.type === 'DATE' ? (
                    <Button
                      icon={'calendar-month'}
                      mode="outlined"
                      onPress={() =>
                        setdatePicker(prev => ({
                          ...prev,
                          visible: true,
                          field_id: field?.id,
                          machine_type_field_id: machine_type_field.id,
                        }))
                      }
                      style={{width: '100%'}}
                      textColor={colors.primary}>
                      {machine_type_field.name === ''
                        ? 'Unnamed Field: ' + field?.value
                        : machine_type_field.name + ': ' + field?.value}
                    </Button>
                  ) : (
                    <TextInput
                      keyboardType={
                        machine_type_field.type === 'NUMBER'
                          ? 'number-pad'
                          : 'default'
                      }
                      mode="outlined"
                      label={
                        machine_type_field.name === ''
                          ? 'Unnamed Field'
                          : machine_type_field.name
                      }
                      value={field?.value}
                      onChangeText={text => onChange(text)}
                      style={{marginBottom: 5}}
                    />
                  )}
                </View>
              );
            },
          )}
        </View>
      );
    });
  } else {
    return (
      <View style={{padding: 10}}>
        <Text
          variant="bodyMedium"
          style={{color: colors.black + '80', textAlign: 'center'}}>
          No items to display
        </Text>
      </View>
    );
  }
};

export default MachineTypeListing;
