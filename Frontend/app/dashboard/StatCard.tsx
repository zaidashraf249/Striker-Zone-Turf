import React, { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";

const StatCard = memo(
  ({
    title,
    value,
    color,
  }: {
    title: string;
    value: string;
    color: string;
  }) => (
    <Card className="shadow hover:shadow-lg transition">
      <CardContent className="p-4 text-center">
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
        <div className="text-sm text-gray-600">{title}</div>
      </CardContent>
    </Card>
  )
);

StatCard.displayName = "StatCard";
export default StatCard;
