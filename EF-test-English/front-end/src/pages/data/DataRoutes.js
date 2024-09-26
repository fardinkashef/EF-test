import { useEffect, useState } from "react";
import DataList from "./DataList";
import ResultsDetails from "./ResultsDetails";
import axios from "axios";
import { Navigate, useNavigate, Route, Routes } from "react-router-dom";

function DataRoutes() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const navigateToLogin = (message) => {
    navigate("/login", {
      state: message,
    });
  };

  useEffect(function () {
    const storedAdminData = JSON.parse(localStorage.getItem("adminData"));

    if (!storedAdminData)
      return navigateToLogin(
        ":دسترسی به داده ها فقط برای ادمین ها امکان پذیر است. لطفاً از طریق فرم زیر وارد شوید"
      );

    const getData = async () => {
      // setIsLoading(true);
      try {
        const res = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/results",
          { headers: { Authorization: `Bearer ${storedAdminData.token}` } }
        );

        setData(res.data);
      } catch (error) {
        console.log("This error happened:", error);
        if (error.response.status === 403)
          return navigateToLogin(":جواز ورود شما معتبر نیست. لطفاً وارد شوید");
        return navigateToLogin(
          ":دسترسی به داده ها فقط برای ادمین ها امکان پذیر است. لطفاً از طریق فرم زیر وارد شوید"
        );
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <Routes>
      <Route
        path=""
        element={
          <DataList data={data} setData={setData} isLoading={isLoading} />
        }
      />
      <Route path="/:id" element={<ResultsDetails data={data} />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  );
}

export default DataRoutes;
