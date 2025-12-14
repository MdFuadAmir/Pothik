import { Chart } from "react-google-charts";

const GrothChart = ({ userGrowth }) => {
  if (!userGrowth || !userGrowth.length)
    return <p className="text-gray-500">No data</p>;

  const data = [["Day", "Users"], ...userGrowth];

  const options = {
    chart: {
      title: "User Growth (Current Month)",
      subtitle: "Daily new users",
    },
    legend: { position: "none" },
    bar: { groupWidth: "20%" },
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

export default GrothChart;
