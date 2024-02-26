"use client"
import React from "react";
import $ from "jquery";
import "datatables.net";
import "./datatable.css";
import Image from "next/image";
export default function CustomDataTable({ title, columns, rows, actionComponent }: { title?: string, columns?: any[], rows?: any[], actionComponent?: React.ReactNode }) {
    React.useEffect(() => {

        const table = ($("#example") as any).DataTable({
            // You can pass any options you want here
        });

        return () => {
            table.destroy();
        };

    }, []);
    // function to check if the provided string if a file path
    function isFilePath(str: string): boolean {
        // Use a regular expression to match common file path patterns
        const filePattern = /^(\/|\w:\\)?\/?([^\/\\]+[\/\\])*[^\/\\]+\.[^\/\\]+$/;
        let result = filePattern.test(str);
        return result;
    }
    // function to handle navigation
    function handleNavigation(url: string) {
        window.location.href = url;
    }
    return (
        <div className="container bg-white rounded-lg mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-row justify-between items-center ">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                {actionComponent && (
                    <React.Fragment>
                        {(actionComponent)}
                    </React.Fragment>
                )}
            </div>
            <table id="example" className="table-auto w-full">
                <thead>
                    <tr>
                        {
                            columns?.map((column, index) => (
                                <th key={index} className="px-4 py-2">{column.headerName}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        rows?.map((row, index) => (
                            <tr key={index} onClick={() => handleNavigation("/patients/add_patient")}>
                                {
                                    // (console.log())
                                    row.map((cell: any, index: number) => (
                                        <td key={index} className="border object-center px-4 py-2">{(isFilePath(cell.label) == true) ? (<Image src={cell.label} alt={cell.label} width={30} height={30} />) : (cell.label)}</td>
                                    ),)
                                }
                            </tr>
                        ))
                    }
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
    );
}