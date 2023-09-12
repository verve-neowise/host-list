import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export type Host = {
	id: number,
	hostName: string,
	baseUrl: string,
	filesUrl: string,
	accounts: {
		id: number,
		email: string,
		password: string
	}[]
}