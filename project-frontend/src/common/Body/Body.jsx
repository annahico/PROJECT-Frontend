import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../../pages/Home/Home";

export const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
