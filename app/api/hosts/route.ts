import HostService from "@/services/hostService";
import { Host } from "@/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const hosts = await HostService.allHost()
  return NextResponse.json(hosts)
}

export async function POST(request: Request) {
  const host: Host = await request.json()
  const response = await HostService.createHost(host)
  return NextResponse.json(response)
}

export async function PUT(request: Request) {

  const host: Host = await request.json()

  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get('id'))

  if (isNaN(id)) {
    return NextResponse.error()
  }

  const response = await HostService.updateHost(host.id, host)

  if (!response) {
    return NextResponse.error()
  }

  return NextResponse.json(response)
}

export async function DELETE(request: Request) {

  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get('id'))

  if (isNaN(id)) {
    return NextResponse.error()
  }

  const response = await HostService.deleteHost(id)

  if (!response) {
    return NextResponse.error()
  }

  return NextResponse.json(response)
}