import {View, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styles, {colors} from '../styles';
import {Text, Button, TextInput, IconButton} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import {
  ADD_MACHINE_TYPE,
  ADD_MACHINE_TYPES_FIELD,
  DELETE_MACHINE_TYPE,
  DELETE_MACHINE_TYPES_FIELD,
  UPDATE_MACHINE_TYPE,
  UPDATE_MACHINE_TYPES_FIELD,
} from '../store/constants';

const ManageCategories = () => {
  const {machine_types, machine_types_fields} = useSelector(
    (state: any) => state.machinesReducer,
  );
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        {machine_types.map((machine_type: any, index: number) => {
          const filtered_machine_types_fields = machine_types_fields.filter(
            (e: any) => e.machine_type_id === machine_type.id,
          );

          const getTitle = () => {
            const field = filtered_machine_types_fields.find(
              (val: any) => val.id === machine_type.title_id,
            );

            if (field) {
              return 'TITLE FIELD: ' + field.name;
            }
            return 'TITLE FIELD: UNNAMED';
          };
          return (
            <View
              key={'machine-type-' + index}
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
                  variant="headlineSmall"
                  style={{marginBottom: 5, fontWeight: '700'}}>
                  {machine_type.name === '' ? 'Unnamed' : machine_type.name}
                </Text>
                <Button
                  icon="trash-can-outline"
                  mode="text"
                  //onPress={}
                  style={{alignSelf: 'flex-end'}}
                  textColor={colors.red}
                  compact
                  onPress={() =>
                    dispatch({
                      type: DELETE_MACHINE_TYPE,
                      payload: {
                        id: machine_type.id,
                      },
                    })
                  }>
                  DELETE
                </Button>
              </View>
              <View style={{marginBottom: 15}}>
                <TextInput
                  mode="outlined"
                  label="Category Name"
                  value={machine_type.name}
                  onChangeText={text =>
                    dispatch({
                      type: UPDATE_MACHINE_TYPE,
                      payload: {
                        id: machine_type.id,
                        property: 'name',
                        value: text,
                      },
                    })
                  }
                />
              </View>
              {filtered_machine_types_fields.map(
                (machine_type_field: any, index: number) => {
                  const onChange = (value: string, property: string) => {
                    dispatch({
                      type: UPDATE_MACHINE_TYPES_FIELD,
                      payload: {
                        id: machine_type_field?.id,
                        property: property,
                        value: value,
                      },
                    });
                  };

                  return (
                    <View
                      key={'machine_type_field-' + index}
                      style={[
                        styles.row,
                        styles.itemsCenter,
                        {marginBottom: 15},
                      ]}>
                      <TextInput
                        mode="outlined"
                        label="Field"
                        value={machine_type_field.name}
                        onChangeText={text => onChange(text, 'name')}
                        style={{flex: 1, marginTop: -5}}
                      />
                      <SelectDropdown
                        buttonStyle={{
                          maxWidth: 100,
                          borderBottomWidth: 1,
                          borderColor: colors.primary,
                        }}
                        rowTextStyle={{fontSize: 14}}
                        buttonTextStyle={{fontSize: 14}}
                        defaultValue={machine_type_field.type}
                        data={['TEXT', 'DATE', 'CHECKBOX', 'NUMBER']}
                        onSelect={(selectedItem, index) => {
                          onChange(selectedItem, 'type');
                        }}
                      />
                      <IconButton
                        icon="trash-can-outline"
                        size={20}
                        onPress={() =>
                          dispatch({
                            type: DELETE_MACHINE_TYPES_FIELD,
                            payload: {
                              id: machine_type_field.id,
                            },
                          })
                        }
                      />
                    </View>
                  );
                },
              )}
              <View style={{marginBottom: 20}}>
                <SelectDropdown
                  buttonStyle={{
                    borderColor: colors.primary,
                    borderBottomWidth: 1,
                  }}
                  rowTextStyle={{fontSize: 16}}
                  buttonTextStyle={{fontSize: 14}}
                  defaultButtonText={getTitle()}
                  data={filtered_machine_types_fields.map((val: any) => ({
                    name: val.name,
                    id: val.id,
                  }))}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return getTitle();
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.name;
                  }}
                  onSelect={(selectedItem, index) => {
                    dispatch({
                      type: UPDATE_MACHINE_TYPE,
                      payload: {
                        id: machine_type.id,
                        property: 'title_id',
                        value: selectedItem.id,
                      },
                    });
                  }}
                />
              </View>

              <View>
                <Button
                  icon="plus"
                  mode="text"
                  style={{alignSelf: 'center'}}
                  textColor={colors.primary}
                  compact
                  onPress={() =>
                    dispatch({
                      type: ADD_MACHINE_TYPES_FIELD,
                      payload: {
                        name: '',
                        machine_type_id: machine_type.id,
                      },
                    })
                  }>
                  ADD NEW FIELD
                </Button>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <Button
        mode="contained"
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          alignSelf: 'center',
          marginBottom: 20,
        }}
        textColor={colors.white}
        onPress={() =>
          dispatch({
            type: ADD_MACHINE_TYPE,
            payload: {
              id: 0,

              title_id: 1,
            },
          })
        }>
        ADD NEW CATEGORY
      </Button>
    </SafeAreaView>
  );
};

export default ManageCategories;
