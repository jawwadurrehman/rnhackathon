import React, {memo} from 'react';
import {ActionTypes, MachinesType} from '../store/types';
import styles, {colors} from '../styles';
import {View} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';

interface Props {
  machine_type: MachinesType;
}

const containerStyle = [
  styles.row,
  styles.spaceBetween,
  {
    paddingVertical: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: colors.black + '10',
  },
];
// const titleStyle = {fontWeight: '700', color: colors.black};

const MachineTypeHeader = ({machine_type}: Props) => {
  const dispatch = useDispatch();

  const onAdd = React.useCallback(() => {
    dispatch({
      type: ActionTypes.ADD_MACHINE,
      payload: {
        machine_type_id: machine_type.id,
      },
    });
  }, [machine_type.id]);

  return (
    <View style={containerStyle}>
      <Text
        style={{fontWeight: '700', color: colors.black}}
        variant="headlineSmall">
        {machine_type.name}
      </Text>
      <Button icon="plus" mode="contained" onPress={onAdd}>
        ADD
      </Button>
    </View>
  );
};

export default memo(MachineTypeHeader);
