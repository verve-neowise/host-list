import { prisma } from "@/lib/prisma";

interface HostInput {
    hostName: string;
    baseUrl: string;
    filesUrl: string;
    active: boolean;
    accounts: {
        email: string;
        password: string;
    }[]
}

export default class HostService {
    static allHost() {
        return prisma.host.findMany({
             include: {
                accounts: true
             }
        })
    }

    static createHost(input: HostInput) {
        return prisma.host.create({
            data: {
                hostName: input.hostName,
                baseUrl: input.baseUrl,
                filesUrl: input.filesUrl,
                accounts: {
                    create: input.accounts.map(account => ({
                        email: account.email,
                        password: account.password
                    }))
                }
            },
            include: {
                accounts: true
            }
        })
    }

    static async updateHost(id: number, input: HostInput) {

        await prisma.account.deleteMany({
            where: {
                hostId: id
            }
        })

        return prisma.host.update({
            where: {
                id
            },
            data: {
                hostName: input.hostName,
                baseUrl: input.baseUrl,
                filesUrl: input.filesUrl,
                active: input.active,
                accounts: {
                    create: input.accounts.map(account => ({
                        email: account.email,
                        password: account.password
                    }))
                }
            },
            include: {
                accounts: true
            }
        })
    }

    static deleteHost(id: number) {
        return prisma.host.delete({
            where: {
                id
            }
        })
    }
}