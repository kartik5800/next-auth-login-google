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
    <div className="p-6 w-full">
      <div className="flex justify-end p-2">
        <AddEmployee />
      </div>
      <h3 className="text-4xl p-4 text-center font-bold bg-slate-400 w-full">
        Employee
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-slate-600">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-2  border border-slate-600">Name</th>
              <th className="px-4 py-2  border border-slate-600">
                Employee Code
              </th>
              <th className="px-4 py-2  border border-slate-600">Email</th>
              <th className="px-4 py-2  border border-slate-600">
                Designation
              </th>
              <th className="px-4 py-2  border border-slate-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {employeeData?.map((emp, index) => {
              return (
                <tr key={index} className="border border-slate-600">
                  <td className="border border-slate-600 px-4 py-2">
                    {emp.name}
                  </td>
                  <td className="border border-slate-600 px-4 py-2">
                    {emp.empCode}
                  </td>
                  <td className="border border-slate-600 px-4 py-2">
                    {emp.email}
                  </td>
                  <td className="border border-slate-600 px-4 py-2">
                    {emp.designation}
                  </td>
                  <td className="border border-slate-600 px-4 py-2">
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
