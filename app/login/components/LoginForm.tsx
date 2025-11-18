"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, // Importa FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/stores/useAuth";

const UsuarioSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(100),
});

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuthStore();

  const form = useForm({
    resolver: zodResolver(UsuarioSchema),
    defaultValues: {
      email: "itachimartinez0@gmail.com",
      password: "password123",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    let result = await login(data);
    if (result.success) {
      router.push("/productos");
    } else {
      form.setError("root", { message: result.message });
    }
  });

  return (
    <Card className="w-75 md:w-100 p-2 m-4">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl md:text-4xl ">Inicia Sesión</CardTitle>
        <CardDescription className="text-muted-foreground">
          Vuelve a iniciar sesión para continuar.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage /> {/* Muestra error específico del campo */}
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage /> {/* Muestra error específico del campo */}
              </FormItem>
            )}
          />

          {/* Muestra el error del servidor (root) */}
          {form.formState.errors.root && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.root.message}
            </p>
          )}

          <Button type="submit">Iniciar Sesión</Button>
        </form>
      </Form>
    </Card>
  );
}
