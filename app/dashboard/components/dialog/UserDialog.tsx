"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { UserTableRow } from "../UserColumn";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // ✅ import select de shadcn/ui
import { Role } from "@/app/shared/interfaces/user.interface";
import { useUpdateUser } from "@/app/hooks/user/useUpdateUser";

interface UserDialogProps {
  user: UserTableRow;
  isOpenDialog: boolean;
  setIsOpenDialog: (isOpen: boolean) => void;
}

const UsuarioSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100),
  email: z.email("Correo electrónico inválido"),
  phone: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .max(15),
  role: z.enum(Role),
});

export default function UserDialog({
  user,
  isOpenDialog,
  setIsOpenDialog,
}: UserDialogProps) {
  const { mutate: updateUser } = useUpdateUser();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(UsuarioSchema),
    defaultValues: {
      name: user.nombre,
      email: user.email,
      phone: user.telefono,
      role: user.rol as Role,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log("Datos validados:", data.email);
    updateUser(data);
    const dialog = document.querySelector("dialog");
  });

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <Button variant="ghost" size="icon" onClick={() => setIsOpenDialog(true)}>
        <Pencil className="w-4 h-4" />
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogDescription>Datos del usuario seleccionado</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            {/* Nombre */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Correo */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Teléfono */}
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  {form.formState.errors.phone && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Rol (Select) */}
            <FormField
              name="role"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={Role.USER}>Usuario</SelectItem>
                        <SelectItem value={Role.ADMIN}>
                          Administrador
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {form.formState.errors.role && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.role.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Error global */}
            {form.formState.errors.root && (
              <p className="text-red-500 text-sm mt-2 text-left">
                {form.formState.errors.root.message}
              </p>
            )}

            <Button type="submit" onClick={() => setIsOpenDialog(false)}>
              Guardar Cambios
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
