"use client"
import { Host } from "@/types";
import { Button, Chip, CircularProgress, Listbox, ListboxItem, useDisclosure } from "@nextui-org/react";
import CreateHost from "./CreateHost";
import { useState } from "react";
import axios from "@/lib/axios";

export default function HostList({ hosts }: { hosts: Host[] }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [hostList, setHostList] = useState(hosts)

    const [targetHost, setTargetHost] = useState<Host | undefined>()

    const [isLoading, setLoading] = useState(false)

    function openDialog(host?: Host) {
        console.log("openDialog:" + host);
        setTargetHost(host)
        onOpen()
    }

    async function deleteHost(host: Host) {
        setLoading(true)
        axios.delete("/hosts?id=" + host.id)
            .then(res => {
                const host = res.data
                console.log("deleted:", host);
                setHostList(prev => prev.filter(item => item.id != host.id))
                setLoading(false)
            })
            .catch(e => {
                console.error("Delete Error", e)
                setLoading(false)
            })
    }

    async function createHost(host: Host) {
        setLoading(true)

        axios.post("/hosts", host)
            .then(res => {
                const host = res.data

                console.log("created:", host);

                setHostList(prev => [...prev, host])
                setLoading(false)
            })
            .catch(e => {
                console.error("Create Error", e)
                setLoading(false)
            })
    }

    async function updateHost(host: Host) {
        setLoading(true)

        axios.put("/hosts?id=" + host.id, host)
            .then(res => {
                const host = res.data

                console.log("updated:", host);

                setHostList(prev => prev.map(item => item.id == host.id ? host : item))
                setLoading(false)
            })
            .catch(e => {
                console.error("Update Error", e)
                setLoading(false)
            })
    }

    return (

        <div className="w-full flex relative">
            <div className="w-full flex flex-col items-end gap-10">

                <Button color="primary" onPress={() => openDialog()}> Add Host </Button>

                <Listbox
                    aria-label="User Menu"
                    onAction={(key) => openDialog(hostList.find(value => value.id == key))}
                    className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 w-full overflow-visible shadow-small rounded-medium"
                    itemClasses={{
                        base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                    }}
                >
                    {
                        hostList.map(host => (
                            <ListboxItem
                                key={host.id}
                                endContent={
                                    host.active ? <Chip size="sm" color="primary"> Active </Chip> : <Chip size="sm" color="danger"> Disabled </Chip>
                                }
                            >
                                {host.hostName}
                            </ListboxItem>
                        ))
                    }

                </Listbox>

                {
                    isOpen && (
                        <CreateHost
                            isOpen={isOpen}
                            host={targetHost}
                            onOpenChange={onOpenChange}
                            onSend={
                                (host) => {
                                    if (host.id == 0) {
                                        createHost(host)
                                    }
                                    else {
                                        updateHost(host)
                                    }
                                    onOpenChange()
                                }
                            }
                            onDelete={(host) => {
                                deleteHost(host)
                                onOpenChange()
                            }
                            }
                        />
                    )
                }
            </div>
            {
                isLoading && (
                    <div className="absolute w-full grow top-0 left-0 bg-black/40 flex justify-center items-center h-full">
                        <CircularProgress size="sm" aria-label="Loading..."/>
                    </div>
                )
            }
        </div>
    )
}
