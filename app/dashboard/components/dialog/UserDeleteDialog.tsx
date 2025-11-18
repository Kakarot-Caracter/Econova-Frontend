import { useDeleteUser } from "@/app/hooks/user/useDeleteUser";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { UserTableRow } from "../UserColumn";

interface UserDeleteDialogProps {
  user: UserTableRow;
  isOpenDeleteDialog: boolean;
  setIsOpenDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserDeleteDialog({
  user,
  isOpenDeleteDialog,
  setIsOpenDeleteDialog,
}: UserDeleteDialogProps) {
  const { mutate: deleteUser, isPending, isError, error } = useDeleteUser();

  const handleDelete = () => {
    deleteUser(user.id);
    setIsOpenDeleteDialog(false);
  };

  return (
    <div>
      <Dialog open={isOpenDeleteDialog} onOpenChange={setIsOpenDeleteDialog}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpenDeleteDialog(true)}
        >
          <Trash2 className="w-4 h-4 hover:text-red-600" />
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Estás seguro?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede revertir. Tu cuenta y datos serán
              eliminados permanentemente.
            </DialogDescription>
          </DialogHeader>
          <Button type="submit" variant={"destructive"} onClick={handleDelete}>
            {isPending ? "Eliminando..." : "Eliminar Usuario"}
          </Button>
          {isError && (
            <p className="text-red-500 text-sm mt-1">
              {error?.message || "Error desconocido"}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
