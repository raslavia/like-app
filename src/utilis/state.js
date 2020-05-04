const mapStateToProps = (state) => {
  return {
    imgs: state.requestReducer.imgs,
    isPending: state.requestReducer.isPending,
    error: state.requestReducer.error,
    i: state.requestReducer.img,
  };
};
export default mapStateToProps;
