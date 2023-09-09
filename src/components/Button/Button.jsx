import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => (
  <button type="button" className={css.Button} onClick={onClick}>
    Load More
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};