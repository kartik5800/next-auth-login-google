import AddEmployee from "@/components/employee/AddEmployee";
import DeleteEmployee from "@/components/employee/DeleteEmployee";
import EditEmployee from "@/components/employee/EditEmployee";

async function getData() {
  const res = await fetch("http://localhost:3000/api/employee", {
    cache: "no-cache",
  });

  // if (!res.ok) {
  //   // throw new Error("Failed to fetch data");
  //   return res.json({ error: "Failed to fetch data" });
  // }

  return res.json();
}

const EmployeeList = async () => {
  const data = await getData();
  const employeeData = data.result;
  return (
    <div>
      <h2 className="p-2 text-4xl">Employee</h2>
      <div>
        <AddEmployee />
      </div>
      <div>
        <table className="w-full ">
          <thead>
            <tr className="p-3  bg-slate-300">
              <td>Name</td>
              <td>Employee Code</td>
              <td>Email</td>
              <td>Designation</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {employeeData?.map((emp, index) => {
              return (
                <tr key={index}>
                  <td>{emp.name}</td>
                  <td>{emp.empCode}</td>
                  <td>{emp.email}</td>
                  <td>{emp.designation}</td>
                  <td>
                    <div className="flex gap-4">
                      <EditEmployee Employee={emp} />
                      <DeleteEmployee ID={emp?._id} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
