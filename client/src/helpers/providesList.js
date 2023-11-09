const providesList = (resultsWithIds, tagType, tagListType = null) => {
    return resultsWithIds
        ? [
              tagListType && { type: tagType, id: tagListType },
              { type: tagType, id: "LIST" },
              ...resultsWithIds.map(({ _id: id }) => ({ type: tagType, id })),
          ]
        : [{ type: tagType, id: tagListType }];
};

export default providesList;
