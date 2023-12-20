const providesList = (resultsWithIds, tagType, tagListType = null) => {
    return resultsWithIds
        ? [
            { type: tagType, id: "LIST" },
            tagListType && { type: tagType, id: tagListType },
            ...resultsWithIds.map(({ _id: id }) => ({ type: tagType, id })),
        ]
        : [{ type: tagType, id: "LIST" }, tagListType && { type: tagType, id: tagListType }];
};

export default providesList;
