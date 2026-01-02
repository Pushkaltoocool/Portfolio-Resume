const SectionLoader = () => {
  return (
    <div className="flex justify-center items-center flex-col w-full h-full min-h-[200px]">
      <span className="canvas-loader"></span>
      <p
        style={{
          fontSize: 14,
          color: '#F1F1F1',
          fontWeight: 800,
          marginTop: 40,
        }}>
        Loading...
      </p>
    </div>
  );
};

export default SectionLoader;
