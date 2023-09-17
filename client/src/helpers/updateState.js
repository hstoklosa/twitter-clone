export const updateFormState = (setter, field, value) => {
    setter((prevState) => ({
        ...prevState,
        [field]: value,
    }));
};
