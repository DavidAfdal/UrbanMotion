import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import HeaderAdmin from "../../componen/Header/headerAdmin";
import StatCard from "../../componen/Statcard/statcard";
import SalesOverviewChart from "../../componen/overview/SalesOverviewChart";
// import CategoryDistributionChart from "../../componen/overview/CategoryDistributionChart";
// import SalesChannelChart from "../../componen/overview/SalesChannelChart";

import "./dashboardAdmin.css";
import useFetchData from "../../../../hook/useFeatchData";
import { getToken } from "../../../../utils/authUtils";
import { formatRupiah } from "../../../../utils/foramtCurrency";

const DashboardAdmin = () => {
  const {data, loading, error} = useFetchData('/dashboard', getToken());

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const grafikData = data.data.grafik_data;
  const statData = {
    totalPengguna: data.data.totalUsers,
    totalPersewaan: data.data.totalRentals,
    totalPendapatan: data.data.totalRevenue,
  }

  return (
    <div className="dashboard-container">
      <HeaderAdmin title="Dashboard" />

      <main className="dashboard-main-content">
        {/* STATS */}
        <motion.div
          className="stats-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          <StatCard name="Total Pengguna" icon={Users} value={statData.totalPengguna} color="#6366F1" />
          <StatCard name="Total Persewaan" icon={Zap} value={statData.totalPersewaan} color="#8B5CF6" />
          <StatCard name="Total Pendapatan Bulanan" icon={ShoppingBag} value={`${ formatRupiah(statData.totalPendapatan)}`} color="#EC4899" />
          <StatCard name="Rating Sewa" icon={BarChart2} value="12.5%" color="#10B981" />
        </motion.div>

        {/* CHARTS */}
        <div className="charts-container">
          <SalesOverviewChart salesData={grafikData} />
        </div>
      </main>
    </div>
  );
};

export default DashboardAdmin;
