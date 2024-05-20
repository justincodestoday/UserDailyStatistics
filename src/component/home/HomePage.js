import React, { useState, useEffect } from "react";
import {
  fetchUserData,
  fetchAnalysis,
  fetchSleepData,
} from "../../service/userService";

const HomePage = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sleepData, setSleepData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchUserData();
      setUserData(data);
    };

    getUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const sleep = await fetchSleepData(selectedUser);
      const analysis = await fetchAnalysis(selectedUser);

      const selectedSleepData = sleep.find(
        (data) => data.HRVDate === selectedDate
      );
      const selectedAnalysisData = analysis.find(
        (data) => data.HRVDate === selectedDate
      );

      if (!selectedSleepData || !selectedAnalysisData) {
        setSleepData(null);
        setAnalysisData(null);
        setAlert(true);
      } else {
        setSleepData(selectedSleepData);
        setAnalysisData(selectedAnalysisData);
        setAlert(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-950 flex flex-col items-center justify-center p-4">
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <svg
            aria-hidden="true"
            className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}

      {/* Company Name */}
      <h1 className="text-3xl font-bold text-center text-white mb-8">Vitalz</h1>

      {/* Selector Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm text-start font-bold mb-2">
            Select User:
          </label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="block w-full p-2 border rounded"
            required
          >
            <option value="">Select a user</option>
            {userData.map((user) => (
              <option key={user.UserID} value={user.UserID}>
                {user.UserName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm text-start font-bold mb-2">
            Select Date:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="block w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-sky-600 text-white p-2 rounded hover:bg-sky-700 w-full"
        >
          View Details
        </button>
      </form>

      {/* Alert */}
      {alert && !sleepData && !analysisData && (
        <div className="container mx-auto mt-8 flex items-center justify-center">
          <div className="bg-red-500 text-white p-4 rounded shadow-md w-full max-w-md">
            No data available for the selected date.
          </div>
        </div>
      )}

      {sleepData && analysisData && (
        <div className="container mx-auto mt-8">
          <div className="flex flex-wrap -mx-2 justify-center">
            {/* Sleep Data Card */}
            <div className="w-full md:w-1/2 px-2 mb-4">
              <div className="bg-white p-4 border rounded shadow h-full">
                <h2 className="text-xl font-bold mb-2">Sleep Data</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 px-2">
                  <p className="text-start">
                    <strong>Date:</strong> {sleepData.HRVDate}
                  </p>
                  <p className="text-start">
                    <strong>Sleep Onset:</strong>{" "}
                    {new Date(sleepData.SleepOnset).toLocaleTimeString()}
                  </p>
                  <p className="text-start">
                    <strong>Wake Up Time:</strong>{" "}
                    {new Date(sleepData.WakeUpTime).toLocaleTimeString()}
                  </p>
                  <p className="text-start">
                    <strong>Awake:</strong> {sleepData.Awake} minutes
                  </p>
                  <p className="text-start">
                    <strong>Light Sleep:</strong> {sleepData.Light} minutes
                  </p>
                  <p className="text-start">
                    <strong>Deep Sleep:</strong> {sleepData.Deep} minutes
                  </p>
                </div>
              </div>
            </div>

            {/* Analysis Card */}
            <div className="w-full md:w-1/2 px-2 mb-4">
              <div className="bg-white p-4 border rounded shadow h-full">
                <h2 className="text-xl font-bold mb-2">Analysis</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 px-2">
                  <p className="text-start">
                    <strong>Date:</strong> {analysisData.HRVDate}
                  </p>
                  <p className="text-start">
                    <strong>Vitalz Score:</strong>{" "}
                    {parseFloat(analysisData.VitalzScore).toFixed(2)}
                  </p>
                  <p className="text-start">
                    <strong>Score Type:</strong> {analysisData.ScoreType}
                  </p>
                  <p className="text-start">
                    <strong>Stressor Index:</strong>{" "}
                    {analysisData.StressorIndex}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
