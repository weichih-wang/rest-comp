import useStore from '../../store/DataLoader.jsx';

function AverageInfo() {
  const currState = useStore(state => state);
  const data = currState[currState.currRestaurant];

  function calculateSalary(includeBonus = false) {
    if (!data) {
      return;
    }

    let totalSalary = 0;

    data.forEach((ee) => {
      totalSalary += parseInt(ee['salary']);
      if (includeBonus) {
        totalSalary += parseInt(ee['bonus']);
      }
    });

    console.log(totalSalary);

    return totalSalary / data.length;
  }

  return (
    <>
      <p>Average Salary w/out Bonus: {calculateSalary()}</p>
      <p>Average Salary w/ Bonus: {calculateSalary(true)}</p>
    </>
  );
}

export default AverageInfo;
