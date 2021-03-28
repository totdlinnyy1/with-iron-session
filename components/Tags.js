

const Tags = ({data, register, disabled}) => {
  return (
    <div className='tags'>
      {data && data.map((value, key) => (
        <div key={key} className='tag'>
          <p>{value.label}</p>
          <input
            type='text'
            name={value.value}
            id={value.value}
            ref={register}
            placeholder={value.amount}
            required
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  )
}

export default Tags