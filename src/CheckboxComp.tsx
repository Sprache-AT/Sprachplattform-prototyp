interface CheckboxCompProps {
  label: string;
  onChange: (val: boolean) => void;
  isChecked: boolean;
}

export default function CheckboxComp({
  label,
  onChange,
  isChecked,
}: CheckboxCompProps) {
  function handleChange(val: boolean) {
    onChange(val);
  }
  return (
    <>
      <input
        id='default-checkbox'
        type='checkbox'
        checked={isChecked}
        onChange={(e) => handleChange(e.target.checked)}
        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
      />
      <label
        htmlFor='default-checkbox'
        className='ms-2 text-sm font-medium text-white dark:text-gray-300'
      >
        {label}
      </label>
    </>
  );
}
