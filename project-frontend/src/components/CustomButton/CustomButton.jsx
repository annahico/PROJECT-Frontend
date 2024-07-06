import PropTypes from 'prop-types';
import "./CustomInput.css";

export const CustomInput = ({ className, type, placeholder, name, value, onChangeFunction, onBlurFunction, disabled }) => {
    return (
        <input 
            className={className}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChangeFunction}
            onBlur={onBlurFunction}
            disabled={disabled}
        />
    );
};

CustomInput.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    onChangeFunction: PropTypes.func.isRequired,
    onBlurFunction: PropTypes.func,
    disabled: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
};

CustomInput.defaultProps = {
    className: '',
    placeholder: '',
    onBlurFunction: () => {},
    disabled: false,
};
