import {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import './styles.scss'
interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {

}
const Input = (props: InputProps) => {

  return (
    <input className={"my-input"} {...props} />
  );
};

export default Input;