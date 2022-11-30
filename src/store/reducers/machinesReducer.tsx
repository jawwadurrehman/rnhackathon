import {
  ADD_MACHINE,
  ADD_MACHINE_TYPE,
  ADD_MACHINE_TYPES_FIELD,
  DELETE_MACHINE,
  DELETE_MACHINE_TYPE,
  DELETE_MACHINE_TYPES_FIELD,
  UPDATE_MACHINE_TYPE,
  UPDATE_MACHINE_TYPES_FIELD,
  UPDATE_MACHINE_TYPES_FIELD_VALUE,
} from '../constants';

function uid() {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(
    /\./g,
    '',
  );
}

const initialState: any = {
  machine_types: [
    {
      id: 0,
      name: 'Cranes',
      title_id: 1,
    },
  ],
  machines: [{id: 0, machine_type_id: 0}],
  machine_types_fields: [
    {
      id: 1,
      name: 'Model',
      machine_type_id: 0,
      type: 'TEXT',
    },
    {
      id: 2,
      name: 'Power',
      machine_type_id: 0,
      type: 'NUMBER',
    },
  ],
  machine_types_fields_value: [
    {
      id: 0,
      value: 'Truck Mounted',
      machine_type_field_id: 1,
      machine_id: 0,
    },
  ],
};

const machinesReducer = (
  state = initialState,
  action: {
    type: string;
    payload: any;
  },
) => {
  switch (action.type) {

    case UPDATE_MACHINE_TYPES_FIELD_VALUE: {
      const newArray = [...state.machine_types_fields_value];
      const index = newArray.findIndex(
        (val: any) => val.id === action.payload.id,
      );

      if (index === -1) {
        newArray.push({
          id: uid(),
          value: action.payload.value,
          machine_type_field_id: action.payload.machine_type_field_id,
          machine_id: action.payload.machine_id,
        });
      } else {
        newArray[index][action.payload.property] = action.payload.value;
      }
      return {
        ...state,
        machine_types_fields_value: newArray,
      };
    }
    case DELETE_MACHINE: {
      const newArray = [...state.machines];
      const index = newArray.findIndex(
        (val: any) => val.id === action.payload.id,
      );
     
      
     newArray.splice(index, 1);

      return {
        ...state,
        machines: newArray,
      };
    }
    case ADD_MACHINE: {
      const newArray = [...state.machines];

      newArray.push({
        id: uid(),
        machine_type_id: action.payload.machine_type_id,
      });

      return {
        ...state,
        machines: newArray,
      };
    }
    case UPDATE_MACHINE_TYPES_FIELD: {
      const newArray = [...state.machine_types_fields];
      const index = newArray.findIndex(
        (val:any) => val.id === action.payload.id,
      );

      newArray[index][action.payload.property] = action.payload.value;

      return {
        ...state,
        machine_types_fields: newArray,
      };
    }
    case ADD_MACHINE_TYPES_FIELD: {
      const newArray = [...state.machine_types_fields];

      newArray.push({
        id: uid(),

        name: action.payload.name,
        machine_type_id: action.payload.machine_type_id,
        type: 'TEXT',
      });

      return {
        ...state,
        machine_types_fields: newArray,
      };
    }
    case DELETE_MACHINE_TYPES_FIELD: {
      const newArray = [...state.machine_types_fields];
      const index = newArray.findIndex(
        (val: any) => val.id === action.payload.id,
      );

      newArray.splice(index, 1);

      return {
        ...state,
        machine_types_fields: newArray,
      };
    }
    case DELETE_MACHINE_TYPE: {
      const newArray = [...state.machine_types];
      const index = newArray.findIndex(
        (val: any) => val.id === action.payload.id,
      );

      newArray.splice(index, 1);

      return {
        ...state,
        machine_types: newArray,
      };
    }
    case ADD_MACHINE_TYPE: {
      const newArray = [...state.machine_types];

      const id = uid();
      newArray.push({
        id: id,
        name: 'New Category',
        title_id: -1,
      });

      //ADD EMPTY FIELD

      const newArray1 = [...state.machine_types_fields];

      newArray1.push({
        id: uid(),
        name: '',
        machine_type_id: id,
        type: 'TEXT',
      });

      return {
        ...state,
        machine_types: newArray,
        machine_types_fields: newArray1,
      };
    }

    case UPDATE_MACHINE_TYPE: {
      const newArray = [...state.machine_types];
      const index = newArray.findIndex(
        (val: any) => val.id === action.payload.id,
      );

      newArray[index][action.payload.property] = action.payload.value;

      return {
        ...state,
        machine_types: newArray,
      };
    }
    default: {
      return state;
    }
  }
};
//TODO FILTER DATA AFTER DELETE

export default machinesReducer;
