export default (props: any) => {
  return (
    <div style={{ padding: 20 }}>
      <h1>this is test layout</h1>
      {props.children}
    </div>
  );
};
