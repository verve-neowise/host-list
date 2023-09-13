import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export type Host = {
	id: number,
	hostName: string,
	baseUrl: string,
	filesUrl: string,
	active: boolean,
	accounts: {
		id: number,
		email: string,
		password: string
	}[]
}