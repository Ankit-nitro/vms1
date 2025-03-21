import { NextResponse } from "next/server";
import pool from "../../../database/config";

export async function GET() {
  try {
    const data = await pool.query(
      `SELECT   sum(sr."SumTotal") as sale_amount, to_char(sr."DateTime", 'YYYY-MM') as Date FROM "VendingMachines"."VendingSalesReports" as  sr where 
        date_part('year', sr."DateTime") = date_part('year', CURRENT_DATE)
        group by Date order by Date asc`
    );
    const current_year_revenue = await pool.query(
      `SELECT   sum(sr."SumTotal") as sale_amount, to_char(sr."DateTime", 'YYYY') as current_year FROM "VendingMachines"."VendingSalesReports" as  sr where 
        date_part('year', sr."DateTime") = date_part('year', CURRENT_DATE)
        group by current_year order by current_year asc`
    );
    const Last_month_sale_amount = await pool.query(
      `SELECT   sum(sr."SumTotal") as sale_amount  FROM "VendingMachines"."VendingSalesReports" as  sr where date_trunc('month', sr."DateTime")=
          date_trunc('month', current_date - interval '1 month')`
    );
    const this_month_total_sales = await pool.query(
      `SELECT   count(sr."SaleId") as total_sales  FROM "VendingMachines"."VendingSalesReports" as  sr where 
        date_part('month', sr."DateTime") = date_part('month', CURRENT_DATE)`
    );
    const latest_five_sales = await pool.query(
      `SELECT distinct(sr."SaleId"),sr."DateTime", sr."Location", sr."SumTotal" FROM "VendingMachines"."VendingSalesReports" as sr 
        left join "VendingMachines"."MdbRelationship" as mdb on sr."PosReference" = mdb."MdbCode"  
        left join "VendingMachines"."vending_machine_stock" as s on  s.slot = mdb."SelectionId" 
        left join "VendingMachines".vending_machine_product as p on s.product_id=p.id 
        order by sr."SaleId" desc limit 5`
    );
    const Total_Active_Vending_Machines = await pool.query(
      `SELECT count(id) as total_machines FROM "VendingMachines".vending_machine
        `
    );

    // client.release();
    return NextResponse.json({  data, current_year_revenue, Last_month_sale_amount, this_month_total_sales, latest_five_sales, Total_Active_Vending_Machines });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
