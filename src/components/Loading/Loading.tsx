import './Loading.css'

// Functional component that displays a loading spinner and message
export default () => {
  return (
    <div className="loadingDiv">
      <div className="flex flex-col items-center gap-4">
        <div className="spinnerDiv" />
        <p className="text-gray-700 text-lg font-medium">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};
