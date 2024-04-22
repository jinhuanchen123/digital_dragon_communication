import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function App() {
  return (
    <>
      <h1 className="text-6xl mb-6">Digital Dragons Business Communications App</h1>
      <Button>This is a Shadcn Button</Button>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>This is a Shadcn Card</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
}
