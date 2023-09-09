import css from './Loader.module.css';
import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => (
  <div className={css.Loader}>
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#3F51B5"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      visible={true}
    />
  </div>
);