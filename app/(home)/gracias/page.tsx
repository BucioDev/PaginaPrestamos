import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function GraciasPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <Card className="max-w-xl w-full shadow-lg">
        <CardContent className="flex flex-col items-center py-12 text-center space-y-6">
          <CheckCircle2 className="h-20 w-20 text-green-500" />

          <div>
            <h1 className="text-3xl font-bold">
              ¡Gracias por tu solicitud!
            </h1>

            <p className="mt-4 text-muted-foreground">
              Hemos recibido correctamente tu información.
            </p>

            <p className="mt-2 text-muted-foreground">
              Uno de nuestros asesores revisará tu solicitud y se pondrá en
              contacto contigo muy pronto.
            </p>
          </div>

          <Button asChild size="lg">
            <Link href="/">
              Volver al inicio
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}