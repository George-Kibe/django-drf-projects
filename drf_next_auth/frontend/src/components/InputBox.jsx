/* eslint-disable react/prop-types */
const InputBox = ({ type, placeholder, name, onChange }) => {
    return (
      <div className="mb-6">
        <input
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 "
        />
      </div>
    );
  };
  export default InputBox;