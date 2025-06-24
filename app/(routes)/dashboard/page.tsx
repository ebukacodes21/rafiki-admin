"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
// import NairaSign from "@/components/ui/naira";
import { CreditCard, Package } from "lucide-react";
import { useRequireAuth } from "../hooks/useAuth";
// import Overview from "@/components/ui/overview";

const DashboardPage = () => {
  useRequireAuth();
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your firm" />
        <Separator />

        {/* <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <NairaSign />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                0.00
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Services</CardTitle>
              <CreditCard className="text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">+2</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clients</CardTitle>
              <Package className="text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">4</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={[]} />
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};
export default DashboardPage;
