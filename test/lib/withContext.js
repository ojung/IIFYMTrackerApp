const withContext = (getContext, test) => done => {
  const context = getContext();
  test(context, done)
};
export default withContext;
