const providesList = (resultsWithIds, tagType) => {
    return resultsWithIds
        ? [
              { type: tagType, id: "LIST" },
              ...resultsWithIds.map(({ _id }) => ({ type: tagType, _id })),
          ]
        : [{ type: tagType, id: "LIST" }];
};

export default providesList;
