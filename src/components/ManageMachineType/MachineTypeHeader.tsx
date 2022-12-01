import React from 'react';
import styles, {colors} from '../../styles';
import {View} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {ActionTypes, MachinesType} from '../../store/types';
import {useDispatch} from 'react-redux';

interface Props {
  machine_type: MachinesType;
}
const MachineTypeHeader = ({machine_type}: Props) => {
  const dispatch = useDispatch();

  const label = React.useMemo(
    () => (machine_type.name === '' ? 'Unnamed' : machine_type.name),
    [machine_type.name],
  );

  return (
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
        {label}
      </Text>
      <Button
        icon="trash-can-outline"
        mode="text"
        style={{alignSelf: 'flex-end'}}
        textColor={colors.red}
        compact
        onPress={() =>
          dispatch({
            type: ActionTypes.DELETE_MACHINE_TYPE,
            payload: {
              id: machine_type.id,
            },
          })
        }>
        DELETE
      </Button>
    </View>
  );
};

export default React.memo(MachineTypeHeader);
