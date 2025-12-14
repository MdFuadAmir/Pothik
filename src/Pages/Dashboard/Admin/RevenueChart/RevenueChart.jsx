import { Chart } from "react-google-charts";

const RevenueChart = ({ dailyRevenue }) => {
  const data = [
    ["Day", "Revenue", { role: "annotation" }],
    ...dailyRevenue.map(([date, value]) => [date, value, value]),
  ];

  const options = {
    chart: {
      title: "Daily Revenue (Current Month)",
      subtitle: "2% of delivered orders",
    },
    legend: { position: "none" },
    bar: { groupWidth: "40%" },
    vAxis: { format: "decimal" },
    annotations: { alwaysOutside: true },
     colors: ["#1b9e77"],
  };

  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="350px"
      data={data}
      options={options}
      className="p-4"
    />
  );
};

export default RevenueChart;
