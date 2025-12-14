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
      dayMap[dayKey] = { ordersReceived: 0, ordersDelivered: 0 };
    }

    dayMap[dayKey].ordersReceived += 1;
    if (order.status === "delivered") {
    dayMap[dayKey].ordersDelivered += 1;
  }
  });
  const chartData = [["Date", "Orders Received", "Order Delevered"]];

  Object.keys(dayMap)
    .sort((a, b) => new Date(`${a} ${currentYear}`) - new Date(`${b} ${currentYear}`))
    .forEach((day) => {
      chartData.push([
        day,
        dayMap[day].ordersReceived,
        dayMap[day].ordersDelivered,
      ]);
    });

  const options = {
    chart: { title: "Daily Sales & Orders (Current Month)" },
    hAxis: { title: "Date" },
    vAxis: { title: "recived / delevered" },
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
