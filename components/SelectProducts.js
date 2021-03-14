import Select from 'react-select'
import {groupedOptions} from '../data/products'

const SelectProducts = ({onChange}) => {

  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  }

  const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  )

  return (
    <Select
      placeholder='Выберете товар'
      isMulti
      options={groupedOptions}
      className="basic-multi-select"
      classNamePrefix="select"
      formatGroupLabel={formatGroupLabel}
      onChange={onChange}
      noOptionsMessage={() => <p>Ничего не найдено</p>}
    />
  )
}

export default SelectProducts