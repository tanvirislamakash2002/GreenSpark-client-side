"use client";

import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeSeriesData } from "@/types/analytics.type";

interface GrowthChartsProps {
    data: TimeSeriesData;
}

export function GrowthCharts({ data }: GrowthChartsProps) {
    const chartData = data.labels.map((label, index) => ({
        date: label,
        users: data.users[index],
        ideas: data.ideas[index],
        votes: data.votes[index],
        revenue: data.revenue[index],
    }));

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Platform Growth</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="users" className="flex flex-col">
                    <TabsList className="mb-4">
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="ideas">Ideas</TabsTrigger>
                        <TabsTrigger value="votes">Votes</TabsTrigger>
                        <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    </TabsList>

                    <>
                        <TabsContent value="users">
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Area type="monotone" dataKey="users" stroke="#3b82f6" fill="#93c5fd" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </TabsContent>

                        <TabsContent value="ideas">
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Area type="monotone" dataKey="ideas" stroke="#f59e0b" fill="#fcd34d" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </TabsContent>

                        <TabsContent value="votes">
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="votes" stroke="#8b5cf6" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </TabsContent>

                        <TabsContent value="revenue">
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => `$${value}`} />
                                        <Legend />
                                        <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#6ee7b7" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </TabsContent>
                    </>
                </Tabs>
            </CardContent>
        </Card>
    );
}