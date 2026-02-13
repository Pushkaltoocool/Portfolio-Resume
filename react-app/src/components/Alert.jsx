const Alert = ({ type, text }) => {
  return (
    <div className="fixed top-10 left-0 right-0 flex justify-center items-center z-[1000] px-4">
      <div
        className={`${
          type === 'danger' ? 'bg-red-900/90' : 'bg-yellow-600/90'
        } p-4 text-white leading-none rounded-2xl flex items-center shadow-2xl backdrop-blur-md border border-white/10 animate-bounce-subtle`}
        role="alert"
      >
        <span
          className={`flex rounded-full ${
            type === 'danger' ? 'bg-red-500' : 'bg-yellow-400 text-black'
          } uppercase px-3 py-1 text-[10px] font-bold mr-3 animate-pulse`}
        >
          {type === 'danger' ? 'System Error' : 'Success'}
        </span>
        <p className="font-medium text-sm">{text}</p>
      </div>
    </div>
  );
};

export default Alert;