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
  FormMessage, // Importado
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/app/stores/useAuth";
import { useRouter } from "next/navigation";

const UsuarioSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100),
  email: z.string().email("Correo electrónico inválido"),
  phone: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .max(15),
  address: z
    .string()
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .max(200),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(100),
});

export default function RegistroForm() {
  const router = useRouter();
  const { register } = useAuthStore();

  const form = useForm({
    resolver: zodResolver(UsuarioSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    let result = await register(data);

    if (result.success) {
      router.push("/productos");
    } else {
      form.setError("root", { message: result.message });
    }
  });

  return (
    <Card className="w-75 md:w-100 p-2 m-4">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl md:text-4xl ">
          Unete a <br />
          <span className="font-bold">Comprar Inteligente</span>
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Crea tu cuenta y comienza a ahorrar
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Completo</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="address"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.root.message}
            </p>
          )}

          <Button type="submit">Registrarse</Button>
        </form>
      </Form>
    </Card>
  );
}
