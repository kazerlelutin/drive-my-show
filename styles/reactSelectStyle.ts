const reactSelectStyle = {
  option: (provided: any, state: any) => {
    return {
      ...provided,
      color: state.isFocused ? "var(--color-txt)" : "var(--color-txt)",
      backgroundColor: state.isFocused ? "var(--color-bg-accent)" : "none",
      cursor: "pointer",
      margin: "3px",
      width: "calc(100% - 6px)",
      padding: 20,
      zIndex: 10
    };
  },
  control: () => ({
    display: "flex",
    padding: "5px",
    borderRadius: "3px",
    border: "2px solid var(--color-bg-light)",
    backgroundColor: 'var(--color-bg-accent)'
  }),
  input: (provided, state) => ({
    ...provided,
    color: "var(--color-txt)",
  }),
  indicatorSeparator: () => ({
    width: "2px",
    height: "60%",
    background: "var(--color-link)",
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    display: state.isFocused ? "none" : "inherit",
    padding: "0 10px",
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    color: `var(${state.hover ? "--color-border" : "--color-link"})`,
    padding: "0 5px",
    cursor: "pointer",
    zIndex: 10
  }),
  singleValue: (provided, state) => {
    const 
      opacity = state.isDisabled ? 0.5 : 1,
      transition = "opacity 300ms",
      color= 'green';
    return { ...provided, opacity, transition ,color};
  },
  menuList: (provided: any) => ({
    ...provided,
    margin: "0",
    padding: "0",
    background: "black",
    zIndex: 10,
    border: "1px solid rgba(255,255,255,.2)",
  }),
  multiValue: (provided: any) => ({
    ...provided,
    background: "var(--color-link)",
    color: "white",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "white",
  }),
};

export default reactSelectStyle;
