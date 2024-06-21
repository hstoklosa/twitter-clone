const providesList = (resultsWithIds, tagType, tagListType = null) => {
    return resultsWithIds
        ? [
            ...resultsWithIds.map(({ _id: id }) => ({
                type: tagType,
                id,
            })),
            {
                type: tagType,
                id: "LIST"
            },
            tagListType && {
                type: tagType, id: tagListType
            },
        ].filter(Boolean)
        : [
            {
                type: tagType, id: "LIST"
            },
            tagListType && {
                type: tagType,
                id: tagListType
            }
        ]
            .filter(Boolean);
};

export default providesList;
