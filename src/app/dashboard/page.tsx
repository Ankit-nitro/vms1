'use client'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDateRangePicker } from "../../components/dashboard/date-range-picker";
import { Overview } from "../../components/dashboard/overview";
import { RecentSales } from "../../components/dashboard/recent-sales";

// import pool from "@/database/config";

import { useEffect, useState } from "react";



const  DashboardPage = ()=> {




  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/dashboard");
        const result = await response.json();
        setData(result?.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    // fetchData();
  }, []);
console.log(data)
  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data available</p>;
//   const data = await pool.query(
//     `SELECT   sum(sr."SumTotal") as sale_amount, to_char(sr."DateTime", 'YYYY-MM') as Date FROM "VendingMachines"."VendingSalesReports" as  sr where 
// date_part('year', sr."DateTime") = date_part('year', CURRENT_DATE)
// group by Date order by Date asc`
//   );
//   const current_year_revenue = await pool.query(
//     `SELECT   sum(sr."SumTotal") as sale_amount, to_char(sr."DateTime", 'YYYY') as current_year FROM "VendingMachines"."VendingSalesReports" as  sr where 
// date_part('year', sr."DateTime") = date_part('year', CURRENT_DATE)
// group by current_year order by current_year asc`
//   );
//   const Last_month_sale_amount = await pool.query(
//     `SELECT   sum(sr."SumTotal") as sale_amount  FROM "VendingMachines"."VendingSalesReports" as  sr where date_trunc('month', sr."DateTime")=
//   date_trunc('month', current_date - interval '1 month')`
//   );
//   const this_month_total_sales = await pool.query(
//     `SELECT   count(sr."SaleId") as total_sales  FROM "VendingMachines"."VendingSalesReports" as  sr where 
// date_part('month', sr."DateTime") = date_part('month', CURRENT_DATE)`
//   );
//   const latest_five_sales = await pool.query(
//     `SELECT distinct(sr."SaleId"),sr."DateTime", sr."Location", sr."SumTotal" FROM "VendingMachines"."VendingSalesReports" as sr 
// left join "VendingMachines"."MdbRelationship" as mdb on sr."PosReference" = mdb."MdbCode"  
// left join "VendingMachines"."vending_machine_stock" as s on  s.slot = mdb."SelectionId" 
// left join "VendingMachines".vending_machine_product as p on s.product_id=p.id 
// order by sr."SaleId" desc limit 5`
//   );
//   const Total_Active_Vending_Machines = await pool.query(
//     `SELECT count(id) as total_machines FROM "VendingMachines".vending_machine
// `
//   );
// const {  current_year_revenue, Last_month_sale_amount, this_month_total_sales, latest_five_sales, Total_Active_Vending_Machines } = data

  return (
    <>
      {/* <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  £{current_year_revenue?.rows[0]?.sale_amount || "N/A"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total revenue of{" "}
                  {current_year_revenue?.rows[0]?.current_year || "N/A"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscriptions
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  £{Last_month_sale_amount?.rows[0]?.sale_amount || "N/A"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Last month revenue
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Vending Machines
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Total_Active_Vending_Machines?.rows[0]?.total_machines ||
                    "N/A"}
                </div>
                <p className="text-xs text-muted-foreground">
                  total active vending
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview data={data.rows} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made{" "}
                  {this_month_total_sales?.rows[0]?.total_sales || "N/A"} sales
                  this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales
                  latest_five_sales={latest_five_sales?.rows || []}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div> */}
      Ankit Dashboard
      <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
    </>
  );
}

export default DashboardPage