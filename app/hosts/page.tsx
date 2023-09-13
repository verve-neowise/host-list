import HostList from "@/components/HostList";
import HostService from "@/services/hostService";
import JwtService from "@/services/jwtService";
import { Host } from "@/types";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar"
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

async function getHosts(): Promise<Host[]> {
	return HostService.allHost()
}

export default async function Home() {

	const token = cookies().get("Auth-Token")?.value ?? headers().get("Authorization")

	try {
		await JwtService.verify(token ?? "")
	}
	catch(e: any) {
		redirect('/login')
	}

	let hosts: Host[] = []
	try {
		hosts = await getHosts()
	}
	catch(e:any) {
		console.error(e)
	}

	return (
		<div className="h-screen">
			<Navbar>
				<NavbarBrand>
					<p className="font-bold text-2xl text-inherit">Test Hosts</p>
				</NavbarBrand>
				<NavbarContent className="hidden sm:flex gap-4" justify="center" />
			</Navbar>

			<div className="container mx-auto flex justify-center min-w-[300px] w-[600px]">
				<HostList hosts={hosts.sort()}/>
			</div>
		</div>
	);
}
