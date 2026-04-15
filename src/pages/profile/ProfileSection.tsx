import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfileDashboardLayout from "./ProfileDashboardLayout";
import ProfilePage from "./ProfilePage";
import SubscribeForOtherPage from "./SubscribeForOtherPage";

/**
 * راوتات متداخلة تحت /profile/* — لوحة تحكم مع منيو جانبي.
 */
const ProfileSection: React.FC = () => {
  return (
    <Routes>
      <Route element={<ProfileDashboardLayout />}>
        <Route index element={<ProfilePage />} />
        <Route path="subscribe-for-other" element={<SubscribeForOtherPage />} />
      </Route>
    </Routes>
  );
};

export default ProfileSection;
