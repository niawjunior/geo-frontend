const FullScreenLoader = () => {
  return (
    <div className="h-screen">
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
