"use client"
import { Host } from "@/types";
import { Button, Listbox, ListboxItem } from "@nextui-org/react";
import { log } from "console";


export default function HostList({ hosts }: { hosts: Host[] }) {
    return (

        <div className="w-full flex flex-col items-end gap-10">

            <Button color="primary"> Add Host </Button>

            <Listbox
                aria-label="User Menu"
                onAction={console.log}
                className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 w-full overflow-visible shadow-small rounded-medium"
                itemClasses={{
                    base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                }}
            >
                {
                    hosts.map(host => (
                        <ListboxItem
                            key={host.id}
                            endContent={
                                <Button color="primary" size="sm">
                                    Edit
                                </Button>
                            }
                        >
                            {host.hostName}
                        </ListboxItem>
                    ))
                }

            </Listbox>
        </div>
    )
}
