import "./CustomInput.css";

export const CustomInput = ({ className, type, placeholder, name, value, onChangeFunction, onBlurFunction }) => {
    return (
        <input 
            className={className}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChangeFunction}
            onBlur={onBlurFunction}
        />
    );
}

// CustomInput.propTypes = {
//     className: PropTypes.string,
//     type: PropTypes.string.isRequired,
//     placeholder: PropTypes.string,
//     name: PropTypes.string.isRequired,
//     value: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number
//     ]).isRequired,
//     onChangeFunction: PropTypes.func.isRequired,
//     onBlurFunction: PropTypes.func,
// };

// CustomInput.defaultProps = {
//     className: '',
//     placeholder: '',
//     onBlurFunction: () => {},
// };
