export const Loading = () => {
  return (
    <div
      id="loading_mask"
      style={{
        position: "absolute",
        zIndex: "999",
        marginLeft: "-10%",
        backgroundColor: "#000000",
        width: "110%",
        height: "100%",
      }}
    >
      <div className="load" style={{ marginTop: "-20%" }}>
        <hr />
        <hr />
        <hr />
        <hr />
      </div>
      <span className="loadingText"       style={{
        position: "absolute",
        marginLeft: "20%",
        marginTop:"80%",
      }}
      >Initializing</span>
    </div>
  );
};
