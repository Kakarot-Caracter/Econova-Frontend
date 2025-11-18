"use client";

import { ColumnDef } from "@tanstack/react-table";
import UserDialog from "./dialog/UserDialog";
import UserDeleteDialog from "./dialog/UserDeleteDialog";
import { useState } from "react";

export type UserTableRow = {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  rol: string;
  fecha: string;
};

interface ActionsCellProps {
  user: UserTableRow;
}

const ActionsCell = ({ user }: ActionsCellProps) => {
  const [isOpenUserDialog, setIsOpenUserDialog] = useState(false);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  return (
    <div className="flex items-center justify-center gap-2">
      <UserDialog
        user={user}
        isOpenDialog={isOpenUserDialog}
        setIsOpenDialog={setIsOpenUserDialog}
      />
      <UserDeleteDialog
        user={user}
        isOpenDeleteDialog={isOpenDeleteDialog}
        setIsOpenDeleteDialog={setIsOpenDeleteDialog}
      />
    </div>
  );
};

export const columnsUserTable: ColumnDef<UserTableRow>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "nombre", header: "Nombre" },
  { accessorKey: "email", header: "Correo" },
  { accessorKey: "telefono", header: "Teléfono" },
  { accessorKey: "rol", header: "Rol" },
  { accessorKey: "fecha", header: "Fecha" },
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => <ActionsCell user={row.original} />,
  },
];
