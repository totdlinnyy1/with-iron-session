import {FaUserAlt} from 'react-icons/fa'

const Avatar = ({link}) => {
  return (
    <div className='avatar'>
      {link ? (
        <img src={link} alt='Avatar' />
      ) : (
        <FaUserAlt size='3em' color='#fff' />
      )}
    </div>
  )
}

export default Avatar