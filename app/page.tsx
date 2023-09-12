import HostList from "@/components/HostList";
import { Host } from "@/types";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar"
import { Button, Listbox, ListboxItem } from "@nextui-org/react";


async function getHosts(): Promise<Host[]> {
	return [
		{
			id: 1,
			hostName: "Staging",
			baseUrl: "http://api.staging.com/graphql",
			filesUrl: "http://files.staging.com",
			accounts: [
				{
					id: 1,
					email: "rick.s@gmail.com",
					password: "rs1234"
				}
			]
		},
		{
			id: 1,
			hostName: "Staging",
			baseUrl: "http://api.staging.com/graphql",
			filesUrl: "http://files.staging.com",
			accounts: [
				{
					id: 1,
					email: "rick.s@gmail.com",
					password: "rs1234"
				}
			]
		}
	]
}

export default async function Home() {

	const hosts = await getHosts()

	return (
		<div className="h-screen">
			<Navbar>
				<NavbarBrand>
					<p className="font-bold text-2xl text-inherit">Test Hosts</p>
				</NavbarBrand>
				<NavbarContent className="hidden sm:flex gap-4" justify="center" />
			</Navbar>

			<div className="container mx-auto flex justify-center min-w-[300px] w-[600px]">
				<HostList hosts={hosts}/>
			</div>
		</div>
	);
}
