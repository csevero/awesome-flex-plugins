import { TeamsView } from '@twilio/flex-ui';
import React from 'react';

const Input = ({ handleChange, currentValue = '', fieldName }) => {
  const _handleChange = e => {
    e.preventDefault();
    handleChange(e.target.value);
  };

  return (
    <input
      style={{
        marginLeft: '16px',
        border: '2px solid #A0A8BD',
        padding: '5px',
        borderRadius: '5px',
      }}
      className="CustomInput"
      type="text"
      onChange={_handleChange}
      value={currentValue}
      name={fieldName}
    />
  );
};

// Define the label that supervisors will see when using our custom filter
const CustomLabel = ({ currentValue }) => (
  <>
    {currentValue && currentValue.length
      ? `Containing "${currentValue}"`
      : 'Any'}
  </>
);

//creating a filter by worker name
const nameFilter = {
  id: 'data.attributes.full_name',
  fieldName: 'full_name',
  title: 'Names',
  customStructure: {
    field: <Input />,
    label: <CustomLabel />,
  },
  condition: 'CONTAINS',
};

//creating a filter by worker routing skills
const queuesFilter = queuesToFilter => {
  return {
    id: 'data.attributes.routing.skills',
    fieldName: 'time',
    title: 'Time',
    options: queuesToFilter,
    type: 'multiValue',
  };
};

export const extendFilter = (manager, queuesToFilter) => {
  //adding our two new filters on Teams View Filters
  manager.updateConfig({
    componentProps: {
      TeamsView: {
        filters: [
          TeamsView.activitiesFilter,
          nameFilter,
          queuesToFilter.length > 0 && queuesFilter(queuesToFilter),
        ],
      },
    },
  });
};
