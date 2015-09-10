const withContext = (getContext, test) => done => {
  const context = getContext();
  test(done, context)
};
export default withContext;
