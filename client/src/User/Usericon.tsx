import { useValue } from '../context/ContextProvider'
import icon from '../assets/react.svg'

const Usericon = () => {
    const {state:{currentUser}} = useValue();
    const { dispatch } = useValue();
  return (
    <div className='flex flex-row justify-center items-center'>
      <img src={icon}/>
      <div className='pl-2' onClick={() => dispatch({ type: 'UPDATE_USER', payload: null })}>
        {currentUser.name}
      </div>
         
    </div>
  )
}

export default Usericon
