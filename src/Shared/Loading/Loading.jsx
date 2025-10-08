

const Loading = () => {
    return (
          <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-950 text-white">
      <div className="flex space-x-3">
        <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-5 h-5 bg-green-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-5 h-5 bg-yellow-500 rounded-full animate-bounce delay-300"></div>
      </div>
      <p className="mt-6 text-gray-300 text-lg">Please wait...</p>
    </div>
    );
};

export default Loading;