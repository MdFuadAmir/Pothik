import { Chart } from "react-google-charts";

const BarChart = ({ data }) => {
  const { recentOrders = [] } = data || {};

  const now = new Date();
  const currentMonth = now.getMonth(); 
  const currentYear = now.getFullYear();

  const currentMonthOrders = recentOrders.filter((order) => {
    const orderDate = new Date(order.date);
    return (
      orderDate.getMonth() === currentMonth &&
      orderDate.getFullYear() === currentYear
    );
  });

  const dayMap = {};

  currentMonthOrders.forEach((order) => {
    const date = new Date(order.date);
    const dayKey = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    if (!dayMap[dayKey]) {
      dayMap[dayKey] = { ordersReceived: 0 };
    }

    dayMap[dayKey].ordersReceived += 1;
    if (order.status === "delivered") {
      dayMap[dayKey].totalEarnings +=
        Number(order.price || 0) * Number(order.quantity || 0);
    }
  });
  const chartData = [["Date", "Orders Received", ]];
  Object.keys(dayMap)
    .sort((a, b) => new Date(a) - new Date(b))
    .forEach((day) => {
      chartData.push([
        day,
        dayMap[day].ordersReceived,
      ]);
    });

  const options = {
    chart: { title: "Daily Sales & Orders (Current Month)" },
    hAxis: { title: "Date" },
    vAxis: { title: "Count / Earnings" },
    seriesType: "bars",
    series: {},
    legend: { position: "bottom" },
    bar: { groupWidth: "20%" },
  };

  return (
    <Chart
      chartType="ComboChart"
      width="100%"
      height="300px"
      data={chartData}
      options={options}
    />
  );
};

export default BarChart;
