"use client";

import DataTable from "@/components/common/DataTable";
import DataTableHeader from "@/components/common/DataTableHeader";
import PageContent from "@/components/common/PageContent";
import PageLayout from "@/components/common/PageLayout";
import FeePaymentsColumns from "@/constants/tables/fee.payments.columns";
import React, { useEffect, useState } from "react";

type FeePayment = {
  _id: string;

  userId: string;
  studentId: string;
  classId: string;

  className: string;
  classSection: string;

  firstName: string;
  lastName: string;

  amount: number;

  totalMonthFee: number;
  totalBusFee: number;
  totalYearFee: number;
  remainingYearFee: number;

  transactionId: string;
  paymentDateTime: string;

  feeType: string;
  feeMonths: string[];

  paymentMode: string;
  remarks?: string;

  status: "pending" | "approved" | "rejected";

  approvedAt?: string;
  rejectedAt?: string;
  adminRemarks?: string;

  createdAt: string;
  updatedAt: string;
};

const FeePaymentHistoryList = () => {
  return (
    <PageLayout>
      <PageContent>
        <DataTable>
          <DataTableHeader columns={FeePaymentsColumns} />
        </DataTable>
      </PageContent>
    </PageLayout>
  );
};

export default FeePaymentHistoryList;
