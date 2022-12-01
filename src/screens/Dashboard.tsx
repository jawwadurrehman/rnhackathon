import React from 'react';
import {useSelector} from 'react-redux';

import {MachinesType} from '../store/types';
import {RootState} from '../../App';
import Container from '../components/Container';
import MachineTypesMenu from '../components/MachineTypesMenu';

const Dashboard = () => {
  const {machine_types} = useSelector(
    (state: RootState) => state.machinesReducer,
  );

  return (
    <Container>
      {machine_types.map((machine_type: MachinesType, index: number) => (
        <MachineTypesMenu machine_type={machine_type} key={machine_type.id} />
      ))}
    </Container>
  );
};

export default Dashboard;
