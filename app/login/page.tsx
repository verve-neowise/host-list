import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function Login() {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <form method="post" action="/api/auth" className="flex flex-col gap-4">
                <Input label="Password" name="password"/>
                <Button type="submit" color="primary"> Login </Button>
            </form>
        </div>
    )
}