import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import useDashboardDeleteBaganPertandingan from "./hook";

const DeleteBaganButton = ({ category, onSuccess, disabled }) => {
  const { deleteBagan, loading } = useDashboardDeleteBaganPertandingan();
  const [open, setOpen] = useState(false);

  const handleConfirmDelete = useCallback(async () => {
    await deleteBagan(category);
    setOpen(false);
    if (onSuccess) onSuccess();
  }, [category, deleteBagan, onSuccess]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="cursor-pointer"
          variant="destructive"
          disabled={loading || disabled}
        >
          {loading ? "Menghapus..." : "Hapus Bagan"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Bagan?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dibatalkan. Semua data pertandingan dalam
            kategori ini akan dihapus secara permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer"
            onClick={handleConfirmDelete}
            disabled={loading}
          >
            {loading ? "Menghapus..." : "Ya, Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBaganButton;
