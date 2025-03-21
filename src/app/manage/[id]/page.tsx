import Machine from "@/components/machine/Machine";
import pool from "@/database/config";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const stocks = await pool.query(
    `SELECT r.*, vms."current_stock", vms."product_id", vpm."name" , vpm."price" , vm."rows", vm."columns"
FROM "VendingMachines"."MdbRelationship" r
INNER JOIN "VendingMachines"."vending_machine_stock" vms 
    ON r."SelectionId" = vms."slot"
Inner JOIN "VendingMachines"."vending_machine_product" vpm 
    ON vms."product_id" = vpm."id"
Inner join "VendingMachines".vending_machine vm 
	on vms."terminal_id" =  vm."terminal_id"
	WHERE vms."terminal_id" = ${id}
ORDER BY r."MId" ASC;`
  );

  const rows = stocks.rows[0].rows;
  const columns = stocks.rows[0].columns;
  const data = stocks.rows

  return (
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-center  mb-15 mt-10">
          <h2 className="text-3xl font-bold tracking-tight text-center">
            Edit products in machine
          </h2>
        </div>

        <div className="flex flex-col">
          <Machine id={id} rows={rows} columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
