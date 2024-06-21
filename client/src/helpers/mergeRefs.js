function mergeRefs(...inputRefs) {
    return (ref) => {
        inputRefs.forEach((inputRef) => {
            if (!inputRef) {
                return;
            }

            if (typeof inputRef === 'function') {
                inputRef(ref);
            } else {
                // eslint-disable-next-line no-param-reassign
                inputRef.current = ref;
            }
        });
    };
}

export default mergeRefs;